Weather World - Dynamic Weather Dashboard
A beautiful, interactive weather dashboard that provides real-time weather information with stunning visual effects and animations.
Features
🌟 Interactive Homepage

Animated sky with moving clouds and sun
Dynamic weather controls (Sunny, Cloudy, Rainy, Stormy)
Real-time rain and lightning effects
Mouse parallax interactions
Smooth transitions between weather states

🌤️ Weather Dashboard

Current Weather: Real-time temperature, conditions, and location
5-Day Forecast: Extended weather predictions
24-Hour Forecast: Hourly temperature and condition updates
Detailed Stats: Visibility, humidity, wind speed, pressure, UV index, cloudiness
Dynamic Backgrounds: Automatically changes based on weather conditions
Visual Effects: Animated rain, snow, and atmospheric effects
Geolocation Support: Get weather for your current location

🎨 Visual Design

Glassmorphism UI with backdrop blur effects
Smooth animations and transitions
Responsive design for all devices
Beautiful gradients and color schemes
Font Awesome icons

File Structure
weather-dashboard/
├── homepage.html       # Interactive landing page
├── index.html         # Main weather dashboard
├── api.html           # API key debugger tool
├── script.js          # Dashboard JavaScript logic
└── styles.css         # Dashboard styling


Setup Instructions
1. API Key Configuration
The project uses the OpenWeatherMap API. An API key is already included in the code:
javascriptAPI_KEY = 'YOUR API KEY'
To use your own API key:

Visit OpenWeatherMap
Sign up for a free account
Generate an API key
Replace the API key in:

index.html (line with const API_KEY)
script.js (line with this.API_KEY)
api.html (input field default value)



2. Running the Project
Simply open any of the HTML files in a web browser:

Homepage: homepage.html - Start here for the full experience
Dashboard: index.html - Direct access to weather data
API Debugger: api.html - Test your API key

No server required! All files run directly in the browser.
Usage Guide
Homepage (homepage.html)

Experience the animated weather effects
Click weather buttons to change the atmosphere
Click "Go to Weather Dashboard" to access the main app

Weather Dashboard (index.html)
Search by City:

Enter a city name in the search box
Click the search button or press Enter
View detailed weather information

Use Current Location:

Click the location button (📍)
Allow location access when prompted
Weather data for your location will load automatically

Optimized for Indian Cities:

Hyderabad, Mumbai, Delhi, Bangalore, Chennai, Kolkata, Pune
Automatically tries multiple search variations for better results

API Debugger (api.html)
Use this tool if weather data isn't loading:

Enter your API key
Click "Test API Key" to verify it works
Try different key variations if needed
Use the manual test URL for browser-based testing

Features Breakdown
Dynamic Backgrounds
The dashboard automatically changes its appearance based on weather:

Sunny: Bright blue gradient
Cloudy: Gray gradient
Rainy: Dark gradient with rain animation
Snowy: Cool gray with falling snowflakes
Thunderstorm: Dark dramatic gradient with rain
Clear Night: Deep blue night gradient
Mist/Fog: Soft gray atmospheric gradient

Weather Statistics

Visibility: How far you can see
Humidity: Moisture level in the air
Wind Speed: Current wind velocity
Pressure: Atmospheric pressure
UV Index: Sun exposure level
Cloudiness: Cloud coverage percentage

Forecast Features

5-Day Forecast: Daily weather predictions with high/low temps
Hourly Forecast: 24-hour breakdown with scrollable carousel
Interpolated Data: Smooth hourly transitions between 3-hour data points

Browser Compatibility

✅ Chrome (recommended)
✅ Firefox
✅ Safari
✅ Edge
✅ Mobile browsers

Technologies Used

HTML5: Semantic structure
CSS3: Modern styling with animations
JavaScript (ES6+): Interactive functionality
Font Awesome 6.0: Weather icons
Google Fonts: Poppins font family
OpenWeatherMap API: Weather data source

Responsive Design
The dashboard is fully responsive:

Desktop: Full layout with all features
Tablet: Optimized grid layouts
Mobile: Stacked layout with touch-friendly controls

Troubleshooting
Weather Not Loading

Check your internet connection
Verify API key is active (may take 1-2 hours after creation)
Use the API debugger tool (api.html)
Check browser console for errors (F12)

City Not Found

Try adding country code: "London, UK"
Try alternate spelling: "Bangalore" vs "Bengaluru"
Use the location button instead
Common cities work best: Mumbai, Delhi, Chennai, etc.

Visual Effects Not Showing

Ensure JavaScript is enabled
Try refreshing the page
Clear browser cache
Update to latest browser version

Performance Tips

The app fetches data only when searching or using location
Weather animations are CSS-based for smooth performance
Forecast data is cached during the session
Optimized for mobile data usage

Credits

Weather data: OpenWeatherMap
Icons: Font Awesome
Font: Google Fonts - Poppins

License
This project is open source and available for personal and educational use.
Future Enhancements
Potential features for future versions:

 Weather alerts and warnings
 Multiple city comparison
 Weather history graphs
 Air quality index
 Sunrise/sunset times
 Weather radar maps
 Custom themes
 Save favorite locations

Support
For issues or questions:

Check the API debugger tool
Verify your API key is active
Ensure you have internet connectivity
Try the manual URL test in api.html


Enjoy your weather dashboard! 🌤️
