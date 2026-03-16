# 🌍 Wayora — Travel Reimagined

**Wayora** is a premium, AI-driven all-in-one travel companion designed to bridge the gap between planning and exploring. Built with **React Native (Expo)** and powered by **Supabase**, Wayora provides real-time safety, personalized itineraries, and smart task management for the modern traveler.

![React Native](https://img.shields.io/badge/React_Native-Expo_55-61DAFB?logo=react&style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-Database_&_Auth-3ECF8E?logo=supabase&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=for-the-badge)

---

## ✨ Core Features

### 🏠 Intelligent Dashboard
- **Location Awareness**: Automatically detects your current city and country via `expo-location`.
- **Budget Pulse**: Instant visual feedback on your trip spend and readiness.
- **Quick Discovery**: One-tap access to emergency services and trending destinations.

### 🛡️ Emergency Finder (25km Radius)
- **Real-Time POIs**: Fetches live data for **Hospitals**, **Pharmacies**, and **Restrooms** using the **Overpass API (OpenStreetMap)**.
- **Mirror Fallback System**: High availability with multiple Overpass server mirrors to ensure data even when primary servers go down.
- **Smart Directions**: Deep-link integration with **Google Maps** for precise navigation to coordinates.

### ✅ Hybrid To-Do List
- **Dual Mode**: Seamlessly switches between **Cloud Sync** (when logged in) and **Local-Only Mode** (for guests).
- **Advanced Classification**: Organize tasks by Priority (High/Med/Low) and Trip Phase (Pre/On/After).
- **Visual Progress**: Real-time "Trip Readiness" bar that reacts to your task completion.

### 🤖 AI Itinerary Planner & Budgeting
- **Personalized Logic**: Generate itineraries tailored to your budget, interests, and traveler group.
- **Expense Breakdown**: Categorized spending tracking with visual analytics.

### 🗺️ Explore & Wandrix Badges
- **Curated Destinations**: Browse global landmarks with interactive tags and search.
- **Gamified Achievements**: Earn **Wandrix Badges** as you reach new milestones and explore the world.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Core** | **React Native (Expo 55)** | Cross-platform performance & DX |
| **Backend** | **Supabase** | Real-time Database and Authentication |
| **Navigation** | **Expo Router** | Type-safe, file-based routing |
| **Location** | **Expo Location** | GPS tracking and Reverse Geocoding |
| **Data** | **Overpass API (OSM)** | Real-world Point of Interest data |
| **Maps** | **Google Maps** | Navigation and Routing |
| **UI/UX** | **Linear Gradient** | Premium brand aesthetics |
| **Types** | **TypeScript** | Robust, error-free development |

---

## 🚀 Installation & Setup

1. **Clone the Repo**
   ```bash
   git clone https://github.com/charulekha-06/WAYORA-.git
   cd WAYORA-
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file with your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

4. **Launch Application**
   ```bash
   npx expo start
   ```

---

## 🎨 Design Language
Wayora uses a high-contrast, premium design system:
- **Primary Gradient**: `Coral (#E8637A)` to `Orange (#F28C38)` 
- **Typography**: Heavyweights (800+) for visibility in the sun.
- **Safety Colors**: Red Pulse (`#EF4444`) for emergency actions.

---

<p align="center">
  Made with ❤️ for travelers worldwide <br/>
  <strong>Wayora — Travel Beyond Limits.</strong>
</p>
