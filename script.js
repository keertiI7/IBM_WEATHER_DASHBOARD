// Weather Dashboard JavaScript - Enhanced for Indian Cities
class WeatherDashboard {
    constructor() {
        this.API_KEY = 'YOUR_API_KEY';
        this.BASE_URL = 'https://api.openweathermap.org/data/2.5';
        
        // City name mappings for better results
        this.cityMappings = {
            'hyderabad': ['Hyderabad,IN', 'Hyderabad,Telangana,IN', 'Hyderabad,India', 'Hyderabad,TS,IN'],
            'mumbai': ['Mumbai,IN', 'Mumbai,Maharashtra,IN', 'Mumbai,India'],
            'delhi': ['Delhi,IN', 'New Delhi,IN', 'Delhi,India'],
            'bangalore': ['Bengaluru,IN', 'Bangalore,IN', 'Bengaluru,Karnataka,IN'],
            'chennai': ['Chennai,IN', 'Chennai,Tamil Nadu,IN', 'Chennai,India'],
            'kolkata': ['Kolkata,IN', 'Kolkata,West Bengal,IN', 'Kolkata,India'],
            'pune': ['Pune,IN', 'Pune,Maharashtra,IN', 'Pune,India']
        };
        
        console.log('🚀 Weather Dashboard Starting...');
        this.initializeEventListeners();
        this.testAndLoad();
    }

    async testAndLoad() {
        console.log('🧪 Testing API key with London...');
        
        try {
            const testUrl = `${this.BASE_URL}/weather?q=London&appid=${this.API_KEY}&units=metric`;
            const response = await fetch(testUrl);
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ API Working! London temp:', data.main.temp + '°C');
                
                this.updateCurrentWeather(data);
                await this.loadForecast(data.coord.lat, data.coord.lon);
                this.showWeatherContent();
            } else {
                console.error('❌ API Test Failed:', response.status);
                this.showError(`API Error: ${response.status}`);
            }
        } catch (error) {
            console.error('❌ Network Error:', error);
            this.showError('Network error. Please check your connection.');
        }
    }

    initializeEventListeners() {
        const searchBtn = document.getElementById('searchBtn');
        const locationBtn = document.getElementById('locationBtn');
        const cityInput = document.getElementById('cityInput');

        if (searchBtn) searchBtn.addEventListener('click', () => this.searchByCity());
        if (locationBtn) locationBtn.addEventListener('click', () => this.getCurrentLocation());
        if (cityInput) {
            cityInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.searchByCity();
            });
        }
    }

    showLoading() {
        this.setDisplay('loading', 'block');
        this.setDisplay('weatherContent', 'none');
        this.setDisplay('errorMessage', 'none');
    }

    hideLoading() {
        this.setDisplay('loading', 'none');
    }

    showError(message) {
        console.error('🚨', message);
        this.setDisplay('errorMessage', 'block');
        this.setDisplay('weatherContent', 'none');
        this.hideLoading();
        
        const errorText = document.querySelector('#errorMessage p');
        if (errorText) errorText.textContent = message;
    }

    showWeatherContent() {
        this.setDisplay('weatherContent', 'block');
        this.setDisplay('errorMessage', 'none');
        this.hideLoading();
    }

    setDisplay(elementId, displayValue) {
        const element = document.getElementById(elementId);
        if (element) element.style.display = displayValue;
    }

    getSearchVariations(cityName) {
        const city = cityName.toLowerCase().trim();
        
        // Check if we have specific mappings for this city
        if (this.cityMappings[city]) {
            console.log(`📍 Found mappings for ${city}`);
            return this.cityMappings[city];
        }
        
        // Generic variations
        return [
            cityName,
            `${cityName},India`,
            `${cityName},IN`
        ];
    }

    async searchByCity() {
        const cityInput = document.getElementById('cityInput');
        if (!cityInput) return;
        
        const cityName = cityInput.value.trim();
        if (!cityName) {
            alert('Please enter a city name');
            return;
        }
        
        console.log('🔍 Searching for:', cityName);
        this.showLoading();
        
        const variations = this.getSearchVariations(cityName);
        console.log('🌍 Will try these variations:', variations);
        
        for (let i = 0; i < variations.length; i++) {
            const searchTerm = variations[i];
            console.log(`🔄 Attempt ${i + 1}: ${searchTerm}`);
            
            try {
                const url = `${this.BASE_URL}/weather?q=${encodeURIComponent(searchTerm)}&appid=${this.API_KEY}&units=metric`;
                const response = await fetch(url);
                
                console.log(`📡 Response: ${response.status} for "${searchTerm}"`);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log(`✅ SUCCESS: Found ${data.name}, ${data.sys.country}`);
                    
                    this.updateCurrentWeather(data);
                    await this.loadForecast(data.coord.lat, data.coord.lon);
                    this.showWeatherContent();
                    return; // Success! Exit the loop
                } else if (response.status === 404) {
                    console.log(`❌ Not found: ${searchTerm}`);
                    continue; // Try next variation
                } else {
                    console.error(`❌ API Error ${response.status} for ${searchTerm}`);
                    // For non-404 errors, show error immediately
                    this.showError(`API Error: ${response.status}`);
                    return;
                }
            } catch (error) {
                console.error(`❌ Network error for ${searchTerm}:`, error);
                continue; // Try next variation
            }
        }
        
        // If we get here, none of the variations worked
        this.showError(`City "${cityName}" not found. Try: Mumbai, Delhi, Chennai, Bangalore, Kolkata, or Pune`);
    }

    getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation not supported');
            return;
        }

        this.showLoading();
        console.log('📱 Getting location...');
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                console.log('📍 Location:', latitude, longitude);
                
                try {
                    const url = `${this.BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${this.API_KEY}&units=metric`;
                    const response = await fetch(url);
                    
                    if (response.ok) {
                        const data = await response.json();
                        console.log('✅ Location weather:', data.name);
                        this.updateCurrentWeather(data);
                        await this.loadForecast(latitude, longitude);
                        this.showWeatherContent();
                    } else {
                        this.showError('Unable to get weather for your location');
                    }
                } catch (error) {
                    this.showError('Error getting location weather');
                }
            },
            () => {
                this.showError('Unable to access your location');
            }
        );
    }

    async loadForecast(lat, lon) {
        try {
            const url = `${this.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`;
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Forecast loaded');
                this.updateForecast(data);
                this.updateHourlyForecast(data);
            }
        } catch (error) {
            console.warn('⚠️ Forecast error:', error);
        }
    }

    updateCurrentWeather(data) {
        console.log('🔄 Updating display for:', data.name);
        
        const {
            name, sys: { country }, weather,
            main: { temp, feels_like, humidity, pressure },
            wind: { speed }, visibility, clouds: { all: cloudiness }
        } = data;

        this.setText('cityName', `${name}, ${country}`);
        this.setText('currentDate', this.formatDate(new Date()));
        this.setText('temperature', `${Math.round(temp)}°`);
        this.setText('feelsLike', `${Math.round(feels_like)}°`);
        this.setText('weatherDescription', weather[0].description);

        this.updateWeatherIcon(weather[0].main);

        this.setText('visibility', `${Math.round(visibility / 1000)} km`);
        this.setText('humidity', `${humidity}%`);
        this.setText('windSpeed', `${Math.round(speed * 3.6)} km/h`);
        this.setText('pressure', `${pressure} hPa`);
        this.setText('uvIndex', 'N/A');
        this.setText('cloudiness', `${cloudiness}%`);
    }

    setText(id, text) {
        const element = document.getElementById(id);
        if (element) element.textContent = text;
    }

    updateWeatherIcon(weatherMain) {
        const iconElement = document.getElementById('weatherIcon');
        if (!iconElement) return;
        
        const iconMap = {
            'Clear': 'fas fa-sun',
            'Clouds': 'fas fa-cloud',
            'Rain': 'fas fa-cloud-rain',
            'Drizzle': 'fas fa-cloud-drizzle',
            'Thunderstorm': 'fas fa-bolt',
            'Snow': 'fas fa-snowflake',
            'Mist': 'fas fa-smog',
            'Fog': 'fas fa-smog',
            'Haze': 'fas fa-smog'
        };

        iconElement.className = iconMap[weatherMain] || 'fas fa-sun';
    }

    updateForecast(data) {
        const container = document.getElementById('forecastContainer');
        if (!container) return;
        
        container.innerHTML = '';
        const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 5);

        dailyForecasts.forEach(forecast => {
            container.appendChild(this.createForecastCard(forecast));
        });
    }

    createForecastCard(forecast) {
        const card = document.createElement('div');
        card.className = 'forecast-card';

        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        card.innerHTML = `
            <div class="forecast-date">${dayName}, ${monthDay}</div>
            <div class="forecast-icon">
                <i class="${this.getWeatherIconClass(forecast.weather[0].main)}"></i>
            </div>
            <div class="forecast-temps">
                <span class="forecast-high">${Math.round(forecast.main.temp_max)}°</span>
                <span class="forecast-low">${Math.round(forecast.main.temp_min)}°</span>
            </div>
            <div class="forecast-desc">${forecast.weather[0].description}</div>
        `;

        return card;
    }

    updateHourlyForecast(data) {
        const container = document.getElementById('hourlyContainer');
        if (!container) return;
        
        container.innerHTML = '';
        const hourlyForecasts = data.list.slice(0, 8);

        hourlyForecasts.forEach(forecast => {
            container.appendChild(this.createHourlyCard(forecast));
        });
    }

    createHourlyCard(forecast) {
        const card = document.createElement('div');
        card.className = 'hourly-card';

        const time = new Date(forecast.dt * 1000);
        const timeString = time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });

        card.innerHTML = `
            <div class="hourly-time">${timeString}</div>
            <div class="hourly-icon">
                <i class="${this.getWeatherIconClass(forecast.weather[0].main)}"></i>
            </div>
            <div class="hourly-temp">${Math.round(forecast.main.temp)}°</div>
        `;

        return card;
    }

    getWeatherIconClass(weatherMain) {
        const iconMap = {
            'Clear': 'fas fa-sun', 'Clouds': 'fas fa-cloud', 'Rain': 'fas fa-cloud-rain',
            'Drizzle': 'fas fa-cloud-drizzle', 'Thunderstorm': 'fas fa-bolt',
            'Snow': 'fas fa-snowflake', 'Mist': 'fas fa-smog', 'Fog': 'fas fa-smog', 'Haze': 'fas fa-smog'
        };
        return iconMap[weatherMain] || 'fas fa-sun';
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Starting Weather Dashboard');
    new WeatherDashboard();
});

// Interactive effects
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        document.body.style.background = `
            linear-gradient(${135 + mouseX * 10}deg, 
            hsl(${240 + mouseX * 20}, 70%, ${60 + mouseY * 10}%) 0%, 
            hsl(${280 + mouseY * 20}, 70%, ${50 + mouseX * 10}%) 100%)`;
    });

    const hourlyContainer = document.getElementById('hourlyContainer');
    if (hourlyContainer) {
        hourlyContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            hourlyContainer.scrollLeft += e.deltaY;
        });
    }
});
