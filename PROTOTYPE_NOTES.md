# Sol Hair Studio — Frontend UI/UX Prototype Documentation

> **Notice for Codex Review & Handoff:**  
> This frontend prototype contains no production backend or database. It includes a local-only Vite development middleware for the experimental NewsData.io editorial section; this is not a production API integration.

---

## 1. Stack Used

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with custom design tokens, fonts, and radii
- **Routing**: [React Router DOM v6](https://reactrouter.com/) (Browser router, scroll-to-top handler, deep route linking)
- **Icons**: [lucide-react](https://lucide.dev/) (lightweight, refined stroke icons)
- **Typography**: Google Fonts:
  - *Cormorant Garamond* (Editorial display serif)
  - *Playfair Display* (Editorial italic accents)
  - *Plus Jakarta Sans* (Clean, readable modern UI sans-serif)

---

## 2. Route List & Behavior

| Route | Screen Name | Key Purpose & Interactions |
| :--- | :--- | :--- |
| `/` | **Editorial Homepage** | Salon-first entry point with hero, a 3-service preview, brand experience, hair inspiration articles, and booking CTA. |
| `/services` | **Service Discovery (Primary Target)** | Replicates `services-reference.png`: hero banner, category filter pills (`Tất cả`, `Cắt tóc`, `Nhuộm`, `Uốn / Duỗi`, `Chăm sóc`), 6-service editorial grid, right-hand featured panel (`Nhuộm nâu trà sữa` with benefits and signature). |
| `/services/:serviceId` | **Service Detail** | Editorial composition with high-resolution imagery, expected duration, pricing, *Bao gồm* breakdown, and CTA *Chọn stylist* → `/booking/stylist`. |
| `/booking/stylist` | **Choose Stylist** | Editorial stylist profile cards for Minh Anh, Gia Hân, and Khánh Linh; includes *Sol chọn giúp* option for automated stylist assignment. |
| `/booking/time` | **Choose Date & Time** | Current booking context bar, interactive calendar picker (October 2026 default), time-slot selector (morning & afternoon), and navigation buttons. |
| `/booking/summary` | **Review Booking** | Complete appointment breakdown, pricing, *Thanh toán tại salon* confirmation, customer details, optional notes, and CTA *Xác nhận đặt lịch*. |
| `/booking/success` | **Booking Completed** | Serene, quiet luxury confirmation screen (*Hẹn bạn tại Sol*), appointment recap, and links to `/appointments` and `/services`. |
| `/appointments` | **My Appointments** | Tabbed appointments view (*Sắp tới* & *Đã hoàn tất*), reschedule action, rebook action, and detail modal with cancellation option. |
| `/account` | **Customer Profile** | Customer overview for *Nhân* (Gold Member), personal info (name, phone, email), and Sol preferences (favorite stylist, recent service, reminder channel). |

---

## 3. Main Components

```
src/
├── components/
│   ├── editorial/
│   │   ├── HairNewsSection.tsx     # Live/news fallback editorial section
│   │   ├── HairArticleCard.tsx     # Normalized internal or external article link
│   │   └── HairNewsSkeleton.tsx    # Editorial loading placeholders
│   ├── layout/
│   │   ├── AppHeader.tsx         # Sticky desktop header with active indicator & mobile drawer
│   │   ├── MobileNavigation.tsx  # Bottom navigation bar for mobile viewports (<768px)
│   │   └── Footer.tsx            # Quiet luxury salon footer with address, hours & hotline
│   ├── service/
│   │   ├── CategoryFilter.tsx    # Category pills with active/inactive state styling
│   │   ├── ServiceCard.tsx       # Reusable service card with price, duration & quick actions
│   │   └── FeaturedServicePanel.tsx # Editorial featured panel ("Gợi ý hôm nay" & 3 benefits)
│   ├── booking/
│   │   ├── BookingProgress.tsx   # 4-step wizard indicator
│   │   ├── StylistCard.tsx       # Editorial stylist profile with selection badge
│   │   ├── CalendarPicker.tsx    # Custom monthly calendar with day selection
│   │   └── TimeSlotPicker.tsx    # Morning/afternoon time-slot selector
│   └── common/
├── pages/
│   ├── HomePage.tsx                # Editorial salon homepage
│   ├── ServicesPage.tsx          # Primary target screen
│   ├── ServiceDetailPage.tsx     # Editorial service detail
│   ├── StylistSelectionPage.tsx  # Stylist choice & "Sol chọn giúp"
│   ├── DateTimeSelectionPage.tsx # Date & time selection
│   ├── BookingSummaryPage.tsx    # Review & final booking confirmation
│   ├── BookingSuccessPage.tsx    # Calm success confirmation
│   ├── AppointmentsPage.tsx      # Appointments list (upcoming/past) & detail modal
│   └── AccountPage.tsx           # Customer profile & preferences
```

---

## 4. Mock Data Locations

All mock data is cleanly separated from UI components in:
- `src/types/index.ts`: TypeScript contracts for `Service`, `Stylist`, `Appointment`, `UserProfile`, `CategoryFilterItem`.
- `src/data/mockData.ts`:
  - `CATEGORIES`: 5 service categories.
  - `SERVICES`: 7 services (6 grid services + 1 featured milk tea brown).
  - `STYLISTS`: 3 professional profiles (Minh Anh, Gia Hân, Khánh Linh).
  - `INITIAL_APPOINTMENTS`: Seed appointments (Upcoming on Oct 17, 2026, and Completed on Sep 03, 2026).
  - `INITIAL_USER`: Customer profile data for "Nhân".
  - `TIME_SLOTS`: 6 appointment slots (09:00, 10:30, 13:00, 14:30, 16:00, 17:30).

---

## 5. Booking State Implementation

The state is managed in `src/state/BookingContext.tsx` via standard React Context with automatic `localStorage` synchronization:
- State fields:
  - `selectedService`: Currently chosen service (persisted).
  - `selectedStylist`: Chosen stylist object or `'any'` (persisted).
  - `selectedDate`: Selected date string `YYYY-MM-DD` (defaults to `2026-10-17`).
  - `selectedTime`: Selected time string `HH:MM` (defaults to `14:30`).
  - `appointments`: Array of appointments (persisted to `localStorage` under `sol_hair_appointments`).
- Key actions:
  - `confirmBooking()`: Gathers context data, appends a new appointment to the top of the list, saves to `localStorage`, and returns the appointment.
  - `cancelAppointment(id)`: Flags appointment status as cancelled.
  - `resetBooking()`: Resets wizard fields back to defaults.

---

## 6. Current Image Strategy

1. **Logo Identity**:
   - `public/sol-logo.png`: Extracted from `references/sol-logo.png`. Used in header, avatar, and footer with crisp aspect ratio.
2. **Reference Service Imagery**:
   - High-fidelity crops extracted directly from `references/services-reference.png` and stored in `public/images/`:
     - `hero-model.png`: Hero editorial visual.
     - `service-1.png` to `service-6.png`: Exact photography for the 6 primary services.
     - `service-1.png`: Clean editorial photo reused for the featured brown milk tea service (the old featured composite baked in duplicate headings and actions).
3. **Editorial Detail & Stylist Imagery**:
   - `public/images/services/detail-*.jpg`: High-resolution editorial photography for service detail pages.
   - `public/images/stylists/minh-anh.jpg`, `service-2.png`, and `services/detail-spa.jpg`: Distinct salon/editorial portraits for Minh Anh, Gia Hân, and Khánh Linh.
   - All image paths are declared in `src/data/mockData.ts` and can be swapped or wired to remote CDN endpoints later.

---

## 7. Design Tokens

Configured in `tailwind.config.js`:
- **Canvas / Background**: `#F7F2EA` (Warm cream / ivory)
- **Surface**: `#FFFFFF` (Crisp card white)
- **Soft surface**: `#F3ECE3` (Editorial warm tinted container)
- **Subtle surface**: `#EFE7DC`
- **Primary Text**: `#24211F` (Deep espresso charcoal)
- **Secondary Text**: `#756E69` (Warm medium gray)
- **Muted Text**: `#9E968F`
- **Terracotta (Brand Accent)**: `#9B4936`
- **Dark Terracotta**: `#813B2C`
- **Light Terracotta**: `#F8EFEA`
- **Border**: `#DDD3C8` / `#EFE8DE`
- **Success**: `#328A63` (`#EAF5F0` background)

---

## 8. Areas that Still Need Refinement for Future Production

1. **Live Calendar / Real Stylist Availability**:
   - Currently, slots are mock data with all slots available. In production, this will query real stylist calendar availability and working shift APIs.
2. **Payment Gateway Integration**:
   - Currently defaults to "Thanh toán tại salon". In production, VNPay / MoMo / Stripe can be added if upfront deposit is required.
3. **SMS / Zalo OTP Authentication**:
   - Customer profile is currently mocked with local storage state for user "Nhân". In production, a phone-number OTP login will be connected.
4. **Dynamic Image Upload**:
   - S3 / Cloudinary upload integration for salon staff to upload hair catalog photos.

---

## 9. Things Intentionally NOT Implemented

As instructed in the project boundaries:
- ❌ No backend server / Express / NestJS.
- ❌ No database (PostgreSQL / MongoDB / Prisma).
- ❌ No real authentication infrastructure (OAuth / JWT / Supabase).
- ❌ No Docker configurations.
- ❌ No connection to the real Sol Hair Studio production API.
- NewsData.io is only called through a local Vite development middleware; this is not a production backend.
- ❌ No heavy component libraries (MUI, Ant Design, default shadcn cliches).

---

## 10. Commands to Run & Build the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build & Verification
```bash
npm run build
```
Builds TypeScript and outputs production assets to `dist/`.

### Preview Production Build
```bash
npm run preview
```

---

## 11. Refinement Review (September 2026)

- Rebuilt the featured service panel from separate image, heading, actions, and benefit rows to avoid text baked into the photo being repeated by the UI. Removed the duplicate hero caption for the same reason.
- Standardized service-card actions and button/focus states, increased touch targets, and added reduced-motion handling.
- Widened the booking summary, appointments, account, and stylist layouts for desktop. Reworked the booking summary into appointment details beside a compact salon-payment summary.
- Replaced the travel and outdoor stylist photos with distinct hair/salon-related images. Kept the service catalog’s warm editorial photography.
- Fixed the booking progress line alignment and made completed steps navigable while keeping current/future steps non-links.
- Adjusted navigation breakpoints so the desktop menu does not wrap at 768px. Mobile navigation remains visible below 1024px.

### Responsive Status

- Visually reviewed the services page at 1440px, 1024px, 768px, and 390px.
- Checked all eight main routes for horizontal overflow at 390px and 1024px; none was found. Reviewed the date/time screen at desktop and mobile widths and the summary, appointments, success, stylist, and account screens at desktop or mobile widths.
- The service category chips use horizontal scrolling on narrow screens. This is intentional; every category remains reachable by touch or keyboard.

### Known Visual Limitations

- Stylist and service photos are prototype assets. The three stylist images vary in crop and context, and should be replaced with approved staff portraits before production.
- Several editorial photos include no Sol-branded salon interiors; they are hair-focused placeholders from the local asset set.
- Calendar dates, time-slot availability, service prices, and stylist assignment remain static mock values. The calendar defaults to October 2026.
- Google Fonts load from the network; the existing serif/system fallbacks remain available when they cannot load.

### Intentionally Mocked

- Booking and appointment records persist in browser `localStorage`; the profile and seeded appointments are mock data.
- Appointment confirmation records locally and uses payment at the salon. There is no live availability, customer authentication, reminder delivery, or payment processing.
- No production backend, database, or Sol production API is connected.

### Validation

- `npm run build` passes (TypeScript check and Vite production build).
- No lint script is configured in `package.json`.
- The prototype journey was reviewed from service detail through stylist, time, summary, success, and appointments. `/account` was also reviewed.

## Hair News Prototype Integration

- NewsData.io is an experimental source for the homepage's “Xu hướng & cảm hứng” editorial section.
- The local browser requests `GET /__prototype-api/hair-news`. A Vite dev-server middleware reads `NEWSDATA_API_KEY`, calls NewsData.io's `latest` endpoint, applies a hair relevance filter, and returns normalized articles. NewsData.io describes this endpoint as covering recent articles from the past 48 hours.
- The NewsData request uses the `q` query parameter with targeted Vietnamese and English hair terms. The response mapper validates article links, drops unrelated items, and maps the remaining fields to the provider-independent `HairArticle` type in `src/services/hairNews/hairNews.types.ts`.
- `src/services/hairNews/hairNews.client.ts` shares one in-flight request and caches successful results in `sessionStorage` for 45 minutes.
- If the key is missing, NewsData.io is unavailable, the query returns no relevant articles, or a request fails, the section displays clearly labeled mock editorial entries from `hairNews.mock.ts`. Missing article images fall back to a local Sol image.
- Put a local key in `.env.local` as `NEWSDATA_API_KEY=your_key_here`, then restart `npm run dev` so Vite reloads the environment. `.env.local` is ignored by Git. `.env.example` contains only an empty variable name and must never contain a real key.
- Start the prototype with `npm run dev`. The NewsData proxy is available only in Vite's development server; it is not included in the production build. A NewsData key is not currently configured in this workspace, so the local keyless fallback is the verified content path.

For production, hair-news retrieval must move behind the Sol Hair Studio backend. The current Vite middleware exists only for the frontend prototype.
