# 🌍 Wayora — Travel Beyond Maps, Explore Beyond Limits

**Wayora** is an AI-powered, all-in-one travel platform designed to solve fragmented trip planning and poor budget management. It provides a personalized, gamified ecosystem that balances traveler needs with local economic support.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Itinerary Planner** | Generates personalized day-wise itineraries based on budget, interests, group type, and duration |
| 💰 **Smart Budget Tracker** | Real-time expense tracking with OCR bill scanning and visual category breakdowns |
| 🛡️ **Safety & Logistics** | Nearby emergency finder (hospitals, ATMs, pharmacies), weather forecasts, and live alerts |
| 🏆 **Wandrix & Puthir** | Gamified exploration — earn digital collectibles and badges for visiting sites |
| 🗺️ **Explore Destinations** | Browse and filter 12+ handpicked destinations by category |
| 🔐 **Authentication** | Email/password and Google sign-in with Firebase |
| 🎨 **Artisan Support** | Platform for local artisans to showcase products to travelers |
| 📊 **Crowd Intelligence** | ML-powered crowd density prediction for popular attractions |

## 🎨 Design

Wayora uses a premium, modern design system:

- **Brand Accent:** Coral (#E8637A) → Orange (#F28C38) gradient
- **Active States:** Orange for bottom nav active icons
- **Emergency:** Soft Red for high-visibility emergency actions
- **Status:** Green for active trip indicators
- **Cards:** White backgrounds with subtle shadows and glassmorphism
- **Typography:** Inter (body) + Outfit (headings) from Google Fonts

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/charulekha-06/WAYORA-.git
cd WAYORA-

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
wayora/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (Header + Footer)
│   │   ├── page.tsx            # Landing page (Hero, Features, Destinations)
│   │   ├── explore/page.tsx    # Destination explorer with filters
│   │   ├── planner/page.tsx    # AI Itinerary Planner
│   │   ├── budget/page.tsx     # Smart Budget Tracker
│   │   ├── safety/page.tsx     # Safety & Logistics
│   │   ├── profile/page.tsx    # User Profile & Wandrix Badges
│   │   ├── auth/page.tsx       # Login / Sign Up
│   │   └── globals.css         # Design system & Wayora palette
│   └── components/
│       └── layout/
│           ├── Header.tsx      # Responsive header + mobile tab bar
│           └── Footer.tsx      # Footer with links & socials
├── public/                     # Static assets
├── package.json
└── tsconfig.json
```

## 🛣️ Roadmap

### Phase 1: Core Platform (Current)
- [x] AI Itinerary Planner UI
- [x] Smart Budget Tracker
- [x] Safety & Emergency Finder
- [x] Explore Destinations
- [x] Authentication UI
- [x] Wandrix Badge System UI
- [ ] Firebase Auth integration
- [ ] OpenAI GPT API integration
- [ ] Google Places API integration

### Phase 2: Ecosystem Expansion
- [ ] Artisan marketplace
- [ ] Booking integration (hotels, transport)
- [ ] Crowd density analysis (ML)
- [ ] OCR bill scanning
- [ ] 24/7 AI safety chatbot

### Phase 3: Global Expansion
- [ ] Multi-currency support
- [ ] Offline AI modes
- [ ] Tourism analytics dashboard (B2G)
- [ ] React Native mobile app
- [ ] Government partnership integrations

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | TailwindCSS 4, CSS Variables |
| **Icons** | Lucide React |
| **Animations** | Framer Motion, CSS Keyframes |
| **Charts** | Recharts |
| **Auth** | Firebase (planned) |
| **AI** | OpenAI GPT API (planned) |
| **Maps** | Google Places API (planned) |

## 📝 License

This project is licensed under the MIT License.

---

<p align="center">
  Made with ❤️ for travelers worldwide<br/>
  <strong>Wayora</strong> — Travel, Reimagined.
</p>
