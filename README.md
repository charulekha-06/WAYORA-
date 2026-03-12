# 🌍 Wayora — Travel Beyond Maps, Explore Beyond Limits

**Wayora** is an AI-powered, all-in-one travel platform built with **React Native (Expo)**. It provides personalized trip planning, smart budgeting, safety tools, and gamified exploration.

![React Native](https://img.shields.io/badge/React_Native-Expo_55-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏠 **Home Dashboard** | Upcoming trips with budget progress, quick actions, trending destinations |
| 🤖 **AI Itinerary Planner** | Personalized day-wise itineraries by budget, interests, group type |
| 💰 **Smart Budget Tracker** | Real-time expense tracking with category breakdowns and OCR scan |
| 🗺️ **Explore Destinations** | Browse 10+ destinations with search & category filters |
| 🏆 **Wandrix Badges** | Gamified badges earned by visiting sites and completing goals |
| 👤 **User Profile** | Stats, trip history, settings, and badge showcase |

## 🎨 Design

- **Brand:** Coral `#E8637A` → Orange `#F28C38` gradient
- **Active Nav:** Orange for tab bar active icons
- **Emergency:** Soft Red `#E85D6F` for critical UI
- **Status:** Green `#3CB371` for active indicators
- **Typography:** System fonts with 800-weight headings

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/charulekha-06/WAYORA-.git
cd WAYORA-

# Install
npm install

# Run
npx expo start
```

Then scan the QR code with **Expo Go** (iOS/Android), or press:
- `i` for iOS Simulator
- `a` for Android Emulator  
- `w` for Web

## 📁 Project Structure

```
wayora/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx     # Tab navigation (5 tabs)
│   │   ├── index.tsx       # Home screen
│   │   ├── explore.tsx     # Explore destinations
│   │   ├── planner.tsx     # AI Itinerary Planner
│   │   ├── budget.tsx      # Smart Budget Tracker
│   │   └── profile.tsx     # User Profile & Badges
│   ├── _layout.tsx         # Root layout
│   └── +not-found.tsx      # 404 screen
├── constants/
│   └── Colors.ts           # Wayora brand color palette
├── components/             # Shared components
├── assets/                 # Images, fonts
├── app.json                # Expo config
└── package.json
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React Native (Expo SDK 55) |
| **Navigation** | Expo Router (file-based) |
| **UI** | React Native StyleSheet, LinearGradient |
| **Icons** | @expo/vector-icons (Ionicons) |
| **Language** | TypeScript |

## 🛣️ Roadmap

- [x] Home Dashboard
- [x] Explore Destinations
- [x] AI Itinerary Planner
- [x] Smart Budget Tracker
- [x] User Profile & Wandrix Badges
- [ ] Firebase Authentication
- [ ] OpenAI GPT Itinerary API
- [ ] Google Places Emergency Finder
- [ ] OCR Bill Scanning
- [ ] Artisan Marketplace
- [ ] Crowd Density Analysis

## 📝 License

MIT License

---

<p align="center">Made with ❤️ for travelers worldwide<br/><strong>Wayora</strong> — Travel, Reimagined.</p>
