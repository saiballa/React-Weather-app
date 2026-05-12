import React,{useState,useEffect} from "react";
import type { WeatherResponseData} from "../../types/types";
import { axiosInstance } from "../../api/axiosInstance";
import { endpoints } from "../../api/endpoints";
import type { WeatherIconProps,WeatherCondition } from "../../types/types";
import { WiDaySunny,WiCloud,
   WiRain,
  WiDayHaze,WiThunderstorm,WiSnow} from "react-icons/wi";

const Weather:React.FC=()=>{

    const [cityData,setCityData] = useState<WeatherResponseData | null>(null);
    const [query,setQuery] = useState<string>("kolkata");
    const [input,setInput] = useState<string>("");
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<string | null>(null);
    const apiKey = import.meta.env.VITE_API_KEY;

    const fetchData = async ()=>{
        setLoading(true);
        setError("");
        try {
            const response = await axiosInstance.get(`${endpoints.query}?q=${query}&appid=${apiKey}`);
            setCityData(response?.data)
        } catch (error) {
            console.error(error)
            setCityData(null);
            setError("City not found!");
        }
        finally{
            setLoading(false);
            setInput("");
        }
    }

    const handleSubmit = (e:React.SyntheticEvent)=>{
        e.preventDefault();
        if(!input){
            alert("Enter city name to view details");
            return;
        }
        setQuery(input);
        console.log(query);
    }

    useEffect(()=>{
        fetchData();
    },[query])


function WeatherIcon({ condition }:WeatherIconProps) {
  switch (condition) {

    case "haze":
      return <WiDayHaze color="gray" size={100} />
    case "Clear":
      return <WiDaySunny color="yellow" size={100} />;

    case "Clouds":
      return <WiCloud color="gray" size={100} />;

    case "Rain":
      return <WiRain color="gray"  size={100} />;

    case "Thunderstorm":
      return <WiThunderstorm color="blue" size={100} />;

    case "snow":
      return <WiSnow color="white" size={100} />;

    default:
      return <WiCloud size={100} />;
  }
}

    return(
        <>
            <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center p-4">

  <div className="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-6 text-white">

    {/* Search Bar */}
    <form className="flex gap-3 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search city..."
        className="flex-1 px-4 py-3 rounded-2xl bg-white/20 placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-white"
      />

      <button
        onClick={handleSubmit}
        className="px-5 py-3 rounded-2xl bg-white text-blue-600 font-semibold hover:scale-105 transition duration-300 shadow-lg"
      >
        Search
      </button>
    </form>

    {/* Weather Content */}
    <div className="min-h-[350px] flex items-center justify-center">

      {loading ? (
        <div className="flex flex-col items-center gap-4">

          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>

          <p className="text-white/80 text-sm tracking-wide">
            Fetching weather...
          </p>

        </div>
      ) : error ? (

        <div className="bg-red-500/20 border border-red-300 text-red-100 px-5 py-4 rounded-2xl">
          <p>{error}</p>
        </div>

      ) : cityData ? (

        <div className="w-full">

          {/* City */}
          <div className="text-center mb-6">

            <h2 className="text-4xl font-bold tracking-wide">
              {cityData?.name}
            </h2>

          </div>

          {/* Main Weather */}
          <div className="flex flex-col items-center justify-center gap-3 mb-8">

            <div className="text-8xl">
              <WeatherIcon
                condition={
                  cityData?.weather?.[0]?.main as WeatherCondition
                }
              />
            </div>

            <h1 className="text-6xl font-bold">
              {`${(cityData?.main?.temp - 273.15).toFixed(1)}°`}
            </h1>

          </div>

          {/* Weather Cards */}
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <p className="text-sm text-white/70">
                Feels Like
              </p>

              <h3 className="text-2xl font-semibold mt-1">
                {`${(cityData?.main?.feels_like - 273.15).toFixed(1)}°C`}
              </h3>
            </div>

            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <p className="text-sm text-white/70">
                Humidity
              </p>

              <h3 className="text-2xl font-semibold mt-1">
                {`${cityData?.main?.humidity}%`}
              </h3>
            </div>

            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <p className="text-sm text-white/70">
                Temp Max
              </p>

              <h3 className="text-2xl font-semibold mt-1">
                {`${(cityData?.main?.temp_max - 273.15).toFixed(1)}°C`}
              </h3>
            </div>

            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <p className="text-sm text-white/70">
                Temp Min
              </p>

              <h3 className="text-2xl font-semibold mt-1">
                {`${(cityData?.main?.temp_min - 273.15).toFixed(1)}°C`}
              </h3>
            </div>

          </div>

        </div>

      ) : (

        <div className="text-center text-white/70">
          <p className="text-lg">
            Search a city to see weather 🌤️
          </p>
        </div>

      )}

    </div>

  </div>

</div>
        </>
    )
}

export default Weather;