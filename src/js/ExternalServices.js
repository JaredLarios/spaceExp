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
      season: {
        season: e[firstKey(e)].Season,
        south_season: e[firstKey(e)].Southern_season,
        north_season: e[firstKey(e)].Northern_season,
      },
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

  async getPlanetPhotos(planet) {
    const { year, month, day } = getLastWeekDate();

    const configs = {
      mars: {
        url: `${baseNasaURL}/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${year}-${month}-${day}&api_key=${nasaKey}`,
        transform: (data) => data.photos,
      },
      earth: {
        url: `${baseNasaURL}/EPIC/api/natural/date/${year}-${month}-${day}?api_key=${nasaKey}`,
        transform: (data) => ({
          id: Number(data.identifier),
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
        console.log(await Promise.all(promises))
        return Promise.all(promises);
      }

      console.log(await serializeData(data, config.transform))
      return serializeData(data, config.transform);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDailyPhoto() {
    try {
      const response = await fetch(`${baseNasaURL}/planetary/apod?api_key=${nasaKey}`);
      const data = await convertToJson(response);
      const dateId = new Date(data.date);

      return serializeData(data, (element) => ({
        id: Number(dateId),
        img_src: element.url,
        earth_date: element.date,
        camera: {
          name: element.explanation
        }
      }))
    } catch (error) {
      console.log(error)
    }
  }
}
