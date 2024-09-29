fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())  // Convert the response to JSON format
    .then(data => {
        console.log(data);  // Log the response to check if it's correct
        
        // Set the background image using the retrieved image URL
        document.body.style.backgroundImage = `url(${data.urls.full})`;
        
        // Display the author of the image
        document.getElementById("author").textContent = `By: (${data.user.name})`;
    })
    .catch(err => {
        // Fallback background image if the API request fails
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`;
        
        // Display a fallback author name
        document.getElementById("author").textContent = `By: Dodi Achmad`;
    });

// Fetch Dogecoin data from the CoinGecko API
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
.then(res => {
    if (!res.ok) {
        // Throw an error if the response is not OK
        throw Error("Something went wrong");
    }
    console.log(res.status);  // Logging the response status
    return res.json();  // Convertion of response to JSON format
})
.then(data => {
    // Displaying the Dogecoin image and name
    document.getElementById("crypto-top").innerHTML = `
    <img src=${data.image.small} />
    <span>${data.name}</span>
`;
    
    // Displaying current, highest, and lowest Dogecoin prices in ZAR
    document.getElementById("crypto").innerHTML += `
    <p>🎯: R${data.market_data.current_price.zar}</p>
    <p>👆: R${data.market_data.high_24h.zar}</p>
    <p>👇: R${data.market_data.low_24h.zar}</p>
`;
})
.catch(err => console.error(err));  // Logging an error if the request fails

// Function to get and display the current time
function getCurrentTime() {
    const date = new Date();
    
    // Displaying the time in short format (hh:mm AM/PM)
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}

// Updates the time every second
setInterval(getCurrentTime, 1000);

// Get the user's current location using geolocation
navigator.geolocation.getCurrentPosition(
    position => {
        // Fetch weather data using the user's coordinates
        fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                // Throw an error if weather data is unavailable
                throw Error("Weather data not available");
            }
            return res.json();  // Convert the response to JSON format
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;  // Construct the weather icon URL
            
            // Displaying the weather icon, temperature, and city name
            document.getElementById("weather").innerHTML = `
                <img src="${iconUrl}" />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `;
        })
        .catch(err => console.error(err));  // Log an error if the request fails
    },
    error => {
        // Log geolocation error if it fails
        console.error(`Geolocation Error: ${error.message}`);
    }
);