import React, { createContext, useContext, useState } from 'react';
import { Service, Stylist, Appointment, UserProfile, BookingContextType } from '../types';
import { SERVICES, STYLISTS, INITIAL_APPOINTMENTS, INITIAL_USER } from '../data/mockData';

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STORAGE_KEYS = {
  APPOINTMENTS: 'sol_hair_appointments',
  SERVICE: 'sol_hair_selected_service',
  STYLIST: 'sol_hair_selected_stylist',
  DATE: 'sol_hair_selected_date',
  TIME: 'sol_hair_selected_time',
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage or defaults
  const [selectedService, setSelectedServiceState] = useState<Service | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    // Default to first service for instant preview
    return SERVICES[0];
  });

  const [selectedStylist, setSelectedStylistState] = useState<Stylist | 'any' | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STYLIST);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return STYLISTS[0];
  });

  const [selectedDate, setSelectedDateState] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.DATE) || '2026-10-17';
  });

  const [selectedTime, setSelectedTimeState] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.TIME) || '14:30';
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_APPOINTMENTS;
  });

  const [userProfile] = useState<UserProfile>(INITIAL_USER);

  // Sync to localStorage
  const setSelectedService = (service: Service | null) => {
    setSelectedServiceState(service);
    if (service) {
      localStorage.setItem(STORAGE_KEYS.SERVICE, JSON.stringify(service));
    } else {
      localStorage.removeItem(STORAGE_KEYS.SERVICE);
    }
  };

  const setSelectedStylist = (stylist: Stylist | 'any' | null) => {
    setSelectedStylistState(stylist);
    if (stylist) {
      localStorage.setItem(STORAGE_KEYS.STYLIST, JSON.stringify(stylist));
    } else {
      localStorage.removeItem(STORAGE_KEYS.STYLIST);
    }
  };

  const setSelectedDate = (date: string | null) => {
    setSelectedDateState(date);
    if (date) {
      localStorage.setItem(STORAGE_KEYS.DATE, date);
    } else {
      localStorage.removeItem(STORAGE_KEYS.DATE);
    }
  };

  const setSelectedTime = (time: string | null) => {
    setSelectedTimeState(time);
    if (time) {
      localStorage.setItem(STORAGE_KEYS.TIME, time);
    } else {
      localStorage.removeItem(STORAGE_KEYS.TIME);
    }
  };

  const confirmBooking = (): Appointment => {
    const currentService = selectedService || SERVICES[0];
    const isAnyStylist = selectedStylist === 'any' || !selectedStylist;
    const stylistName = isAnyStylist ? 'Sol Hair Salon (Sol chọn giúp)' : (selectedStylist as Stylist).name;
    const stylistTitle = isAnyStylist ? 'Stylist chỉ định phù hợp nhất' : (selectedStylist as Stylist).title;
    const stylistId = isAnyStylist ? 'any' : (selectedStylist as Stylist).id;

    // Date formatting helper
    const chosenDateStr = selectedDate || '2026-10-17';
    const dateObj = new Date(chosenDateStr + 'T00:00:00');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = daysOfWeek[dateObj.getDay()];

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      serviceId: currentService.id,
      serviceName: currentService.name,
      stylistId,
      stylistName,
      stylistTitle,
      date: chosenDateStr,
      formattedDate: `${dayName}, ${day}/${month}/${year}`,
      dayOfMonth: day,
      monthLabel: `THÁNG ${dateObj.getMonth() + 1}`,
      time: selectedTime || '14:30',
      duration: currentService.duration,
      price: currentService.price,
      formattedPrice: currentService.formattedPrice,
      status: 'upcoming',
      serviceImage: currentService.image,
      createdAt: new Date().toISOString(),
    };

    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));

    return newAppointment;
  };

  const resetBooking = () => {
    setSelectedServiceState(SERVICES[0]);
    setSelectedStylistState(STYLISTS[0]);
    setSelectedDateState('2026-10-17');
    setSelectedTimeState('14:30');
    localStorage.removeItem(STORAGE_KEYS.SERVICE);
    localStorage.removeItem(STORAGE_KEYS.STYLIST);
    localStorage.removeItem(STORAGE_KEYS.DATE);
    localStorage.removeItem(STORAGE_KEYS.TIME);
  };

  const cancelAppointment = (id: string) => {
    const updated = appointments.map((apt) =>
      apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
    );
    setAppointments(updated);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
  };

  return (
    <BookingContext.Provider
      value={{
        selectedService,
        selectedStylist,
        selectedDate,
        selectedTime,
        appointments,
        userProfile,
        setSelectedService,
        setSelectedStylist,
        setSelectedDate,
        setSelectedTime,
        confirmBooking,
        resetBooking,
        cancelAppointment,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
