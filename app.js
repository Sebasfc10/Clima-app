
//conseguimos una KEY en la pagina de la api
const APP_KEY = 'a74a7fcd3b42367d643f942eac1daac6';

//llamamos a la api y la seteamos en los datos obtenidos en la funcion onLoad
const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
    
    console.log(position)
}
const setWeatherData = data => {
    console.log(data);
// se crean objetos y se les asignan la data de la api para luego setearlos en los DIV del HTML
    const weatherData ={
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }
// se crea un ciclo para setear los datos de la API en los encajes del HTML
    Object.keys(weatherData).forEach (key => {
        document.getElementById(key).textContent = weatherData[key];
    })

    cleanUp();
}

const cleanUp = () =>{
    let container = document.getElementById('container');
    let loader = document.getElementById('loader')

    loader.style.display = 'none'
    container.style.display = 'flex'
}

const getDate = () =>{
    let date = new Date()
    return `${date.getDate()}-${('0' + (date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`;

}

//funcion onLoa, recurso que da el navegador para conocer tu ubicacion
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}

