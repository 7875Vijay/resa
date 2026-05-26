# 🏠 Resa - Property Rental Discovery App

<div align="center">

![Resa Logo](./assets/images/resalogo.png)

**A modern React Native property rental app with interactive maps, advanced search, and seamless authentication**

[![Expo](https://img.shields.io/badge/Expo-000?style=for-the-badge&logo=expo&logoColor=fff)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![NativeWind](https://img.shields.io/badge/NativeWind-061E24?style=for-the-badge&logo=tailwindcss&logoColor=fff)](https://www.nativewind.dev)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Setup](#environment-setup)
- [Development](#development)
- [Building](#building)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 📱 Overview

**Resa** is a feature-rich property rental discovery mobile application built with React Native and Expo. It enables users to browse, search, and save property listings with an intuitive interface powered by interactive maps, real-time filtering, and secure authentication.

Perfect for property hunters looking for apartments, houses, villas, and studios in a seamless mobile experience.

---

## ✨ Features

### 🔍 **Smart Property Discovery**
- Browse featured and recommended properties
- Advanced search with multiple filters
- Filter by property type (apartment, house, villa, studio)
- Real-time property listing updates

### 🗺️ **Interactive Maps**
- Full-screen map view for property locations
- Tap to view property details directly on map
- Location-based property discovery

### 💾 **Save & Manage**
- Save favorite properties for later
- Quick access to saved listings
- One-tap property management

### 🔐 **Secure Authentication**
- Clerk authentication integration
- Secure user session management
- Profile management

### 🎯 **User Experience**
- Responsive design with NativeWind (Tailwind CSS)
- Smooth navigation with Expo Router
- Bottom tab navigation for easy access
- Dark mode support

### 📸 **Rich Content**
- High-quality property images
- Image preview and gallery functionality
- Fast image loading with Expo Image

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React Native** | Mobile app framework |
| **Expo** | Development platform and build service |
| **TypeScript** | Type-safe development |
| **React Navigation** | App navigation and routing |
| **Expo Router** | File-based routing system |
| **NativeWind** | Tailwind CSS for React Native |
| **Supabase** | Backend & database |
| **Clerk** | Authentication service |
| **React Native Maps** | Map integration |
| **Zustand** | State management |
| **Async Storage** | Local data persistence |

---

## 📁 Project Structure

```
resa/
├── app/                          # Expo Router pages and navigation
│   ├── (auth)/                   # Authentication screens
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── (root)/                   # Main app screens
│   │   ├── (tabs)/               # Tab-based navigation
│   │   │   ├── create.tsx        # Create listing
│   │   │   ├── index.tsx         # Home/Browse
│   │   │   ├── profile.tsx       # User profile
│   │   │   ├── saved.tsx         # Saved properties
│   │   │   └── search.tsx        # Search screen
│   │   └── property/             # Property details
│   │       ├── [id].tsx          # Dynamic property view
│   │       └── fullScreenMap.tsx # Map view
│   └── _layout.tsx               # Root layout
│
├── components/                   # Reusable UI components
│   ├── amenityCard.tsx          # Amenity display
│   ├── chatButton.tsx           # Chat interface
│   ├── featuredCard.tsx         # Featured property card
│   ├── mapViewCard.tsx          # Map card component
│   ├── propertyCard.tsx         # Property card
│   └── searchModel.tsx          # Search modal
│
├── hooks/                        # Custom React hooks
│   ├── useSaveProperty.ts       # Save property logic
│   ├── useSupabase.ts           # Supabase queries
│   └── useUserSync.ts           # User synchronization
│
├── lib/                          # Utilities and services
│   └── supabase.ts              # Supabase client config
│
├── store/                        # Zustand state management
│   ├── propertySearchStore.ts   # Search state
│   └── userStore.ts             # User state
│
├── types/                        # TypeScript type definitions
│   ├── propertyTypes.ts         # Property types
│   └── types.ts                 # Global types
│
├── assets/                       # Static assets
│   └── images/                   # App icons & images
│
├── app.json                      # Expo configuration
├── tailwind.config.js            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
├── babel.config.js               # Babel configuration
├── metro.config.js               # Metro bundler config
└── package.json                  # Dependencies & scripts

```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Expo CLI** installed globally
- **iOS Simulator** (Mac) or **Android Emulator**
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resa.git
   cd resa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   # Create .env file in root directory
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Environment Setup](#environment-setup))

5. **Start the development server**
   ```bash
   npm start
   ```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the Expo development server |
| `npm run ios` | Start and open in iOS Simulator |
| `npm run android` | Start and open in Android Emulator |
| `npm run web` | Start web version |
| `npm run lint` | Run ESLint to check code quality |
| `npm run reset-project` | Reset project to blank state |

### Development

```bash
# Terminal 1: Start Expo server
npm start

# Terminal 2 (when prompted in Terminal 1):
# Press 'i' for iOS Simulator
# Press 'a' for Android Emulator
# Press 'w' for Web
# Scan QR code with Expo Go app (physical device)
```

---

## 🔧 Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory:

```bash
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Clerk Authentication
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key

# Maps API (if using Google Maps)
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
```

### Setup Checklist

- [ ] Create Supabase project and get credentials
- [ ] Setup Clerk authentication project
- [ ] Configure database tables in Supabase
- [ ] Add environment variables to `.env`
- [ ] Install iOS/Android build tools
- [ ] Configure Google Maps (optional)

---

## 💻 Development

### Code Style & Linting

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### File-based Routing

This project uses Expo Router with file-based routing:

- Files in `app/` directory become routes
- `_layout.tsx` defines navigation structure
- `[id].tsx` creates dynamic routes
- `(group)` creates route groups without URL segments

**Example:**
```
app/
├── index.tsx        → /
├── about.tsx        → /about
└── user/[id].tsx    → /user/:id
```

### Adding New Features

1. Create components in `/components`
2. Create hooks in `/hooks` for logic
3. Add types in `/types`
4. Use Zustand for global state in `/store`
5. Create routes in `/app` directory

---

## 🏗️ Building

### Development Build (Recommended for development)

```bash
# iOS
eas build --platform ios --profile preview

# Android
eas build --platform android --profile preview
```

### Production Build

```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production
```

### Submit to App Stores

```bash
# iOS App Store
eas submit --platform ios

# Google Play Store
eas submit --platform android
```

---

## 🐛 Troubleshooting

### Common Issues

#### **Expo Go Not Loading**
```bash
# Clear Expo cache
expo start --clear

# Or use localhost tunnel
expo start --localhost
```

#### **Metro Server Issues**
```bash
# Clear metro cache
npm start -- --clear
```

#### **Dependency Issues**
```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

#### **Supabase Connection Error**
- Verify `.env` file has correct credentials
- Check Supabase project is active
- Ensure API key is valid

#### **Map Not Displaying**
- Verify Google Maps API key in `.env`
- Check location permissions in app settings
- Ensure device location services are enabled

### Debug Mode

```bash
# Start with debug mode
expo start --dev-client
```

---

## 📚 Learning Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Guide](https://reactnative.dev/docs/getting-started)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction)
- [React Navigation](https://reactnavigation.org)
- [Supabase Docs](https://supabase.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [NativeWind Docs](https://www.nativewind.dev/getting-started/expo)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Guidelines

- Use TypeScript for type safety
- Follow existing code style and patterns
- Add meaningful commit messages
- Test changes before submitting PR
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Support

Have questions or need help?

- 📧 Email: support@resa.app
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/resa/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/resa/discussions)

---

## 🙏 Acknowledgments

- [Expo Team](https://expo.dev) for the amazing development platform
- [Supabase](https://supabase.com) for backend infrastructure
- [Clerk](https://clerk.com) for authentication
- React Native community

---

<div align="center">

**Built with ❤️ by the Resa Team**

⭐ If you find this helpful, please consider giving it a star!

</div>
