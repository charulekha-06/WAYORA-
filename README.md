# 🌍 Wayora: The Ultimate Real-Time Travel Companion

**Wayora** is a high-performance, safety-first travel management application developed with **React Native (Expo)** and **Supabase**. Unlike static planners, Wayora focuses on **real-time resilience**—providing travelers with critical information and task persistence even in unpredictable environments.

---

## 🚀 The Core Idea
Wayora was born from the need for a travel app that doesn't just plan, but **protects and adapts**. Whether you are looking for a hospital in an unfamiliar city or managing trip tasks without a stable internet connection, Wayora is built to be your reliable "Digital Travel Partner."

---

## ✨ Key Technical Features

### 📡 Emergency Finder (Live POI Integration)
The crown jewel of Wayora's safety suite. It doesn't rely on static databases or expensive proprietary APIs.
*   **Overpass API (OpenStreetMap)**: Utilizes live OSM data to find Hospitals, Pharmacies, and Restrooms within a **25km radius**.
*   **Multi-Mirror Fallback**: Implements a robust "Mirror Logic" that automatically cycles through multiple global Overpass servers (kumiho, harmonia, etc.) to ensure zero downtime.
*   **Smart Directions**: Seamlessly hands over coordinates to **Google Maps** via deep-linking for precise, multi-modal navigation.

### ✅ Hybrid Task Management (Cloud + Local)
A smart persistence layer designed for the fluid nature of travel.
*   **Supabase Real-Time**: Instant cloud synchronization for logged-in users.
*   **Local-First Architecture**: When offline or as a guest, the app maintains your data in local state, ensuring you never lose your "Trip Readiness" status.
*   **Priority & Phase Logic**: Categorizes tasks into **Pre-Trip**, **On-Trip**, and **After-Trip** to keep your focus on what matters now.

### 🏠 Contextual Dashboard
*   **Reverse Geocoding**: Uses `expo-location` to translate GPS coordinates into readable City/Country data.
*   **Progressive UI**: Dynamic progress bars and budget trackers that update in real-time as you cross off tasks or add expenses.

---

## 🛠️ Tech Stack & APIs

| Layer | Technology | Usage |
|-------|-----------|-------|
| **Frontend** | **React Native / Expo 55** | Cross-platform UI with native performance. |
| **Backend** | **Supabase** | Cloud Database (PostgreSQL) & Authentication. |
| **PGRS Error Handling** | **SQL Schema** | Optimized `todos` table with RLS (Row Level Security). |
| **Location** | **Expo Location** | GPS & Geocoding services. |
| **Data API** | **Overpass API (OSM)** | Real-time Point of Interest (POI) discovery. |
| **Navigation** | **Google Maps API** | Deep-link routing for emergency directions. |
| **Styling** | **Linear Gradient** | Premium visual branding and 800-weight typography. |

---

## 🎨 Design System
*   **Branding**: `Coral #E8637A` ↔ `Orange #F28C38` (Optimized for outdoor legibility).
*   **UX Pattern**: Minimalist, card-based grid systems for rapid one-handed use during travel.

---

## 🛠️ Setup Instructions

1.  **Clone & Install**
    ```bash
    git clone https://github.com/charulekha-06/WAYORA-.git
    cd WAYORA-
    npm install
    ```
2.  **Environment Variables**
    Add `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` to your `.env`.
3.  **Database Migration**
    Run the `schema.sql` found in the root directory in your Supabase SQL editor.
4.  **Launch**
    `npx expo start`

---

<p align="center">
  **Wayora — Travel Beyond Limits.** <br/>
  Powered by Open Data. Protected by Real-Time Tech.
</p>
