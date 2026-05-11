export interface WeatherResponseData{
    weather:[
        {
            main:string;
        }
    ]
    main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
  },
   visibility: number,
    wind: {
        speed: 6.69,
    },
    name:string,
}

export type WeatherCondition =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "haze"
  |"Thunderstorm"
  |"snow";

export type WeatherIconProps = {
  condition: WeatherCondition;
};
