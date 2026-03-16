# Wayora - Your Smart Travel Companion

**Wayora** is an all-in-one travel app that combines itinerary planning, budgeting, assistance, and trip management in one platform, simplifying travel and eliminating the need for multiple apps.

---

## 🚩 PROBLEM STATEMENT

*   **Poor Budget Control**: Difficulty estimating, tracking, and visualizing trip expenses.
*   **Low Personalization**: Recommendations aren’t tailored to budget, interests, or travel context.
*   **Missing Tourism Intelligence**: Lack of unified data limits smart government planning and sustainability.
*   **Fragmented Planning**: Travellers rely on multiple disconnected apps, causing confusion and poor experience.
*   **Weak Cultural Engagement**: Inadequate digital storytelling reduces connection to heritage sites.
*   **Disjointed Wellness Travel**: No single platform for medical and wellness tourism planning.
*   **Unsustainable Eco-Tourism**: Poor eco insights and artisan visibility harm nature and local economies.

---

## ✨ Key Features

*   **Personalized Itinerary**: AI-generated day-wise travel plans tailored to budget, interests, group type, and trip duration.
*   **Expense Tracker**: Real-time expense tracking with OCR bill scanning and visual spending summaries.
*   **Booking**: Seamless in-app booking for hotels, transport tickets, and travel activities.
*   **Stay & Food Picks**: Smart recommendations filtered by price, ratings, and availability.
*   **AI Chatbot**: 24/7 travel assistant providing local tips, safety alerts, and recommendations.
*   **To-Do List**: Personalized travel checklist to organize tasks before and during the trip (with Local & Cloud persistence).
*   **Digital Souvenir Album & AI Post Generator**: Stores travel memories and auto-generates shareable travel recaps.
*   **Nearby Emergency Finder**: Quick access to restrooms, pharmacies, ATMs, and hospitals using live **Overpass API** data.
*   **Live Weather & Festival Alerts**: Real-time weather updates and notifications about local festivals and events.
*   **Currency Converter**: Real-time currency conversion for international travellers.
*   **Artisan Support**: Digital platform enabling local artisans to showcase and sell products directly to tourists.
*   **Eco Intelligence**: Encourages sustainable travel, crowd control, and protection of eco-sensitive areas.
*   **Cultural Engagement**: Interactive stories and guides for heritage and cultural destinations.
*   **Wandrix (Gamified Travel)**: Virtual exploration with budget challenges, badges, and digital collectibles.

---

## 🛠️ Tech Stack & APIs

| Layer | Technology | Usage |
|-------|-----------|-------|
| **Frontend** | React Native / Expo 55 | Cross-platform UI with native performance. |
| **Backend** | Supabase | Cloud Database (PostgreSQL) & Authentication. |
| **Logic** | TypeScript | Type-safe, robust development. |
| **Database** | SQL Schema | Optimized `todos` table with RLS (Row Level Security). |
| **Location** | Expo Location | GPS & Geocoding services. |
| **Data API** | Overpass API (OSM) | Real-time Point of Interest (POI) discovery. |
| **Navigation** | Google Maps API | Deep-link routing for emergency directions. |
| **Styling** | Linear Gradient | Premium visual branding and 800-weight typography. |

---

## 📁 Project Structure

```
wayora/
├── app/                # Main application screens (Expo Router)
│   ├── (tabs)/         # Tab-based navigation
│   │   ├── index.tsx   # Dashboard
│   │   ├── explore.tsx # Travel Destinations
│   │   ├── planner.tsx # AI Itinerary
│   │   ├── budget.tsx  # Expense Tracking
│   │   └── profile.tsx # User Stats & Badges
│   ├── emergency.tsx   # Emergency Finder Logic
│   ├── todo.tsx        # Smart To-Do List
│   └── auth.tsx        # Supabase Auth Screen
├── lib/                # Utility & API logic
│   ├── places.ts       # Overpass API implementation
│   └── supabase.ts     # Supabase client setup
├── assets/             # Icons, images, and fonts
├── schema.sql          # Database initialization SQL
└── package.json        # Dependencies & Scripts
```

---

## 🚀 What's Next for Wayora

*   **Local guide marketplace**: Connects tourists with verified local guides.
*   **Local transport integration**: Bus, metro, cab (Uber/Ola APIs).
*   **Community & social sharing**: User forums, tips, shared itineraries.
*   **Offline mode**: Essential travel features accessible without internet connectivity.
*   **Toll & fuel cost integration**: Real-time toll and fuel estimates with route comparison.
*   **AI-based predictive suggestions**: Real-time weather forecasts and notifications for upcoming festivals.
*   **AI language translator**: Real-time translation for travel communication.
*   **Global expansion**: Scaling the platform for international tourism markets.
*   **Crowd density & best timing**: Live crowd levels at popular spots and ML-predicted queue estimates.

---

## 🛠️ Setup Instructions

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/charulekha-06/WAYORA-.git
    cd WAYORA-
    ```
2.  **Install Dependencies**
    ```bash
    npm install
    ```
3.  **Supabase Setup**
    - Create a project on [Supabase](https://supabase.com).
    - Run the provided `schema.sql` in the SQL Editor to set up the `todos` table.
    - Add your credentials to a `.env` file:
      ```env
      EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
      EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
      ```
4.  **Run Locally**
    ```bash
    npx expo start
    ```

---

<p align="center">
  **Wayora — Travel Beyond Maps, Explore Beyond Limits.**
</p>
