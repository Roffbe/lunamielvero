// script.js

const apiKey = '1ad79901b9e849f3927210440250704'; // Tu API Key de WeatherAPI

// Función para obtener las temperaturas de una ciudad
function obtenerTemperaturas(ciudad, idCiudad) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad}&days=2&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => {
            // Obtener la información de las temperaturas de hoy
            const tempHoyMax = data.forecast.forecastday[0].day.maxtemp_c;
            const tempHoyMin = data.forecast.forecastday[0].day.mintemp_c;

            // Obtener la información de las temperaturas de mañana
            const tempMananaMax = data.forecast.forecastday[1].day.maxtemp_c;
            const tempMananaMin = data.forecast.forecastday[1].day.mintemp_c;

            // Actualizar el HTML con las temperaturas
            document.getElementById(`${idCiudad}-today-max`).textContent = `${tempHoyMax}°C | ${tempHoyMin}°C`;
            document.getElementById(`${idCiudad}-next-max`).textContent = `${tempMananaMax}°C | ${tempMananaMin}°C`;
        })
        .catch(error => console.error('Error al obtener los datos del clima:', error));
}

// Función para actualizar la hora
function actualizarHora() {
    const opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

    // Usamos zonas horarias específicas para cada ciudad
    const horaMadrid = new Date().toLocaleString("es-ES", { ...opciones, timeZone: 'Europe/Madrid' });  // Hora de Madrid
    const horaNewYork = new Date().toLocaleString("en-US", { ...opciones, timeZone: 'America/New_York' });  // Hora de Nueva York
    const horaVegas = new Date().toLocaleString("en-US", { ...opciones, timeZone: 'America/Los_Angeles' });  // Hora de Las Vegas
    const horaCancun = new Date().toLocaleString("es-MX", { ...opciones, timeZone: 'America/Cancun' });  // Hora de Cancún

    document.getElementById('madrid-time').textContent = horaMadrid;
    document.getElementById('newyork-time').textContent = horaNewYork;
    document.getElementById('vegas-time').textContent = horaVegas;
    document.getElementById('cancun-time').textContent = horaCancun;
}

// Llamada para actualizar la hora y las temperaturas
setInterval(() => {
    actualizarHora();
    obtenerTemperaturas('Madrid', 'madrid');
    obtenerTemperaturas('New York', 'newyork');
    obtenerTemperaturas('Las Vegas', 'vegas');
    obtenerTemperaturas('Cancun', 'cancun');
}, 60000);

// Ejecutar la función una vez al cargar la página
actualizarHora();
obtenerTemperaturas('Madrid', 'madrid');
obtenerTemperaturas('New York', 'newyork');
obtenerTemperaturas('Las Vegas', 'vegas');
obtenerTemperaturas('Cancun', 'cancun');
