import { firstKey, getLastWeekDate } from "./utils.mjs";

const baseNasaURL = import.meta.env.VITE_NASA_URL;
const nasaKey = import.meta.env.VITE_NASA_KEY;
const baseOpenWeatherURL = import.meta.env.VITE_OPENWEATHER_URL;
const openWeatherKey = import.meta.env.VITE_OPENWEATHER_KEY;

async function convertToJson(data) {
  const response = await data.json();
  if (data.ok) {
    return response;
  } else {
    throw { name: "Service Error", message: data };
  }
}

async function serializeData(data, responseType) {
  const response = responseType(data);
  return response;
}

export default class ExternalServices {
  constructor() {}

  async getWeather(planet) {
    let url = `${baseNasaURL}/insight_weather/?api_key=${nasaKey}&feedtype=json&ver=1.0`;
    let myFunction = (e) => ({
      temp: e[firstKey(e)].AT.av,
      min: e[firstKey(e)].AT.mn,
      max: e[firstKey(e)].AT.mx,
    });
    if (planet == "earth") {
      url = `${baseOpenWeatherURL}/data/2.5/weather?appid=${openWeatherKey}&q=guatemala`;
      myFunction = (e) => ({
        temp: e.main.temp,
        min: e.main.temp_min,
        max: e.main.temp_max,
      });
    }
    const response = await fetch(url);
    const data = await convertToJson(response);

    const serializeResponse = serializeData(data, myFunction);
    return serializeResponse;
  }

  async getPhotos(planet) {
    const { year, month, day } = getLastWeekDate();

    const configs = {
      mars: {
        url: `${baseNasaURL}/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${year}-${month}-${day}&api_key=${nasaKey}`,
        transform: (data) => data.photos,
      },
      earth: {
        url: `${baseNasaURL}/EPIC/api/natural/date/${year}-${month}-${day}?api_key=${nasaKey}`,
        transform: (data) => ({
          id: data.identifier,
          img_src: `${baseNasaURL}/EPIC/archive/natural/${year}/${month}/${day}/png/${data.image}.png?api_key=${nasaKey}`,
          earth_date: data.date,
          camera: {
            name: data.caption,
          },
        }),
      },
    };

    const config = configs[planet];
    if (!config) {
      throw new Error(`Invalid planet`);
    }

    try {
      const response = await fetch(config.url);
      const data = await convertToJson(response);

      if (planet === "earth") {
        const promises = data.map((element) =>
          serializeData(element, config.transform),
        );
        return Promise.all(promises);
      }

      return serializeData(data, config.transform);
    } catch (error) {
      throw new Error(error);
    }
  }
}
