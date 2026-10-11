import { Sun, CloudSun, CloudRain, CloudLightning } from 'lucide-react';
export const WEATHER = [{ label: 'Good', c: '#22d3a0', I: Sun }, { label: 'Okay', c: '#fbbf24', I: CloudSun }, { label: 'Rain', c: '#fb923c', I: CloudRain }, { label: 'Storm', c: '#f43f5e', I: CloudLightning }];
export const weatherFor = (d, day, sim) => d < day ? 0 : sim.weather[d - day] ?? 0;
export const LEGEND = [['Sunny = Healthy', 0], ['Cloudy = Tight', 1], ['Rain = Risky', 2], ['Storm = Critical', 3]];
