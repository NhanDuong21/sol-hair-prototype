export type ServiceCategoryId = 'all' | 'cut' | 'color' | 'perm-straight' | 'care';

export interface CategoryFilterItem {
  id: ServiceCategoryId;
  label: string;
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategoryId;
  duration: string;
  price: number;
  formattedPrice: string;
  shortDescription: string;
  fullDescription: string;
  includes: string[];
  image: string;
  detailImage: string;
  isFeatured?: boolean;
  highlightNote?: string;
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  experience: string;
  focus: string;
  bio: string;
  avatar: string;
  rating?: number;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  stylistId: string;
  stylistName: string;
  stylistTitle: string;
  date: string; // YYYY-MM-DD
  formattedDate: string; // e.g. "Thứ Bảy, 17/10/2026"
  dayOfMonth: string; // e.g. "17"
  monthLabel: string; // e.g. "THÁNG 10"
  time: string; // e.g. "14:30"
  duration: string;
  price: number;
  formattedPrice: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  serviceImage: string;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  preferredStylist: string;
  recentService: string;
  reminderChannel: string;
  membershipTier: string;
  visitCount: number;
}

export interface BookingContextType {
  selectedService: Service | null;
  selectedStylist: Stylist | 'any' | null;
  selectedDate: string | null;
  selectedTime: string | null;
  appointments: Appointment[];
  userProfile: UserProfile;
  setSelectedService: (service: Service | null) => void;
  setSelectedStylist: (stylist: Stylist | 'any' | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  confirmBooking: () => Appointment;
  resetBooking: () => void;
  cancelAppointment: (id: string) => void;
}
