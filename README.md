# Classy Weather App ☀️🌧

A React weather application that fetches and displays 7-day weather forecasts for any location worldwide using the Open-Meteo API.

## Features

- 🌍 Search weather by city name
- 📅 7-day weather forecast with min/max temperatures
- 🎨 Weather icons based on conditions (sun, clouds, rain, snow, etc.)
- 💾 LocalStorage integration to remember last searched location
- ⚡ Debounced search with 500ms delay
- 🚫 Request cancellation with AbortController
- 📱 Responsive design

## Project Structure

```
src/
├── components/
│   ├── Input.js       # Search input component
│   └── Weather.js     # Weather display component with Day list
├── hooks/
│   └── useWeather.js  # Custom hook for weather data fetching
├── App.js             # Main application component
├── index.js           # Application entry point
└── index.css          # Global styles
```

## Technologies Used

- React 19.2.3
- Open-Meteo Geocoding API
- Open-Meteo Weather Forecast API
- LocalStorage for data persistence
- React Hooks (useState, useEffect)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

## How It Works

1. Enter a city name in the search input (minimum 3 characters)
2. The app fetches geocoding data to get coordinates
3. Weather forecast is retrieved using the coordinates
4. 7-day forecast displays with emoji icons and temperature ranges
5. Last searched location is saved to localStorage

## API Integration

- **Geocoding API**: Converts city names to coordinates
- **Weather API**: Fetches temperature and weather codes for 7 days
- **Debouncing**: 500ms delay before API calls to reduce unnecessary requests
- **Abort Signal**: Cancels pending requests when user types new location

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
