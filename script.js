
// script.js

const apiKey = '1ad79901b9e849f3927210440250704'; // Tu clave API

// Función para obtener la hora en formato 24 horas
function obtenerHora(ciudad) {
    const fecha = new Date();
    let hora = fecha.toLocaleString('en-US', { 
        timeZone: ciudad,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false  // Usamos formato de 24 horas
    });
    return hora;
}

// Función para obtener el tiempo de una ciudad usando la API
async function obtenerTiempo(ciudad) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad}&days=2`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Verificamos si la respuesta contiene los datos correctamente
        return data;
    } catch (error) {
        console.error("Error al obtener los datos del tiempo:", error);
    }
}

// Actualizar la hora y el tiempo en las ciudades
async function actualizarDatos() {
    // Mapeo de las ciudades con sus respectivas zonas horarias
    const ciudades = {
        madrid: 'Europe/Madrid',
        newyork: 'America/New_York',
        vegas: 'America/Los_Angeles',
        cancun: 'America/Cancun'
    };

    // Recorremos cada ciudad
    for (let ciudad in ciudades) {
        const tiempo = await obtenerTiempo(ciudades[ciudad]);

        // Verificamos si se han recibido datos correctamente
        if (tiempo) {
            // Actualizamos la hora
            document.getElementById(`${ciudad}-time`).innerText = obtenerHora(ciudades[ciudad]);

            // Actualizamos las temperaturas
            document.getElementById(`${ciudad}-today`).innerText = `Hoy: ${tiempo.current.temp_c}°C`;
            document.getElementById(`${ciudad}-next`).innerText = `Mañana: ${tiempo.forecast.forecastday[1].day.avgtemp_c}°C`;
        }
    }
}

// Llamamos a la función para actualizar los datos
actualizarDatos();
