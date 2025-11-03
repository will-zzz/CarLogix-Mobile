# CarLogix Mobile

An Ionic + Angular + Capacitor mobile application for iOS.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
  - Mac (via Homebrew): `brew install node`
  - Or [download directly](https://nodejs.org/)
- **Xcode** (latest version) - [Download from App Store](https://apps.apple.com/us/app/xcode/id497799835)
- **CocoaPods**
  - Mac (via Homebrew): `brew install cocoapods`
  - Or via gem: `sudo gem install cocoapods`
  - Verify installation: `pod --version`
- **iOS Simulator** - If you haven't set up a simulator yet:
  1. Open Xcode
  2. Go to `Xcode > Settings > Platforms` (or `Xcode > Preferences > Components` in older versions)
  3. Download an iOS Simulator runtime (e.g., iOS 17.0 or latest)

## Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd CarLogix-Mobile
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Development

### Run in Browser (Web Development)

For faster web development:
```bash
npm start
```
Opens at `http://localhost:4200` with live reload.

### Run on iOS Simulator (with Live Reload)

> **Note:** Make sure you have an iOS Simulator set up in Xcode before running this command (see Prerequisites above).

To run the app on iOS simulator with live reload:
```bash
ionic cap run ios -l --external
```

This command will:
- Build the Angular app
- Sync changes to iOS
- Launch the iOS simulator
- Enable live reload (changes reflect automatically)

### Build for Production

```bash
npm run build
npx cap sync ios
```

Then open in Xcode:
```bash
npx cap open ios
```

## Documentation

- [Ionic Framework Documentation](https://ionicframework.com/docs)
- [Angular Documentation](https://angular.io/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)

