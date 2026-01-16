export interface PlantData {
    id: number;
    title: string;
    lat: number;
    lng: number;
    // 기상 정보
    weather: { temp: number; humidity: number; wind: number; solar: number; pm10: number; pm25: number; };
    // 발전소 상세 정보
    detail: { capacity: number; output: number; todayGen: number; rate: number; region: string; lmp: string; updateTime: string; };
}

export const PLANT_DATA_LIST: PlantData[] = [
    {
        id: 1, title: '와이어블 1호기', lat: 35.731178, lng: 128.470532,
        weather: { temp: 24.5, humidity: 45, wind: 3.2, solar: 650, pm10: 30, pm25: 15 },
        detail: { capacity: 1000, output: 850, todayGen: 4.2, rate: 85, region: "경북", lmp: "LZ01", updateTime: "2026.01.16 14:00:00" }
    },
    {
        id: 2, title: '와이어블 2호기', lat: 36.908964, lng: 127.436623,
        weather: { temp: 22.1, humidity: 60, wind: 2.1, solar: 580, pm10: 45, pm25: 22 },
        detail: { capacity: 800, output: 400, todayGen: 2.1, rate: 50, region: "충북", lmp: "LZ02", updateTime: "2026.01.16 14:05:00" }
    },
    {
        id: 3, title: '와이어블 3호기', lat: 36.792009, lng: 126.880162,
        weather: { temp: 26.0, humidity: 30, wind: 5.5, solar: 800, pm10: 10, pm25: 5 },
        detail: { capacity: 1200, output: 1100, todayGen: 6.5, rate: 92, region: "충남", lmp: "LZ03", updateTime: "2026.01.16 14:10:00" }
    }
];
