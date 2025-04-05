const baseNasaURL = import.meta.env.VITE_NASA_URL;
const  nasaKey = import.meta.env.VITE_NASA_KEY;
const baseOpenWeatherURL = import.meta.env.VITE_OPENWEATHER_URL;
const  openWeatherKey = import.meta.env.VITE_OPENWEATHER_KEY;

async function convertToJson(data) {
  const response = await data.json();
  if (data.ok) {
    return response;
  } else {
    throw { name: "Service Error", message: data }
  }
}

export default class ExternalServices {
  constructor () {}
  
  async getMarsWeather() {
    const response = await fetch(`${baseNasaURL}/insight_weather/?api_key=${nasaKey}&feedtype=json&ver=1.0`);
    const data = await convertToJson(response);
    return data.Restult;
  }

  async getRoverMarsPhotos() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.setDate(currentDate.getDate - 1);

    const response = await fetch(`${baseNasaURL}/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${year}-${month}-${day}&api_key=${nasaKey}`);
    const data = await convertToJson(response);
    return data.Restult;
  }
}