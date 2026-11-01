export interface WeatherItem {
    time: string;
    temperature: number;
}


export interface WeatherResponse {
    hourly?: {
        time?: unknown;
        temperature_2m?: unknown;
    }
}

const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m' + '&timezone=Asia/Jakarta';

export async function getWeather(): Promise < WeatherItem[] > {
    const response = await fetch(API_URL);

    if (!response.ok){
        throw new Error( "Failed to fetch weather data");
    }

    const data: WeatherResponse = await response.json();

    if(typeof data !== 'object' || data === null || !data.hourly || !('hourly' in data)) {
        throw new Error("Invalid weather data format");
    } 

    const hourly = (data as WeatherResponse).hourly;
    const times = hourly?.time;
    const temperatures = hourly?.temperature_2m;

    if (!Array.isArray(times) || !Array.isArray(temperatures) || times.length !== temperatures.length || !times.every((time) => typeof time === 'string' || !temperatures.every((temp) => typeof temp === 'number' && Number.isFinite(temp)))) {
        throw new Error("Invalid weather data format");
    }
    return times.map((time:string, index:number) => ({
        time,
        temperature: temperatures[index] as number
    }))
}