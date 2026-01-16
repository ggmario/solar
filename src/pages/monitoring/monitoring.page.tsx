import { InfoBoxComponent, InfoBoxGroup, InfoGroupComponent, PieChartComponent, Select, SelectItem, TitleComponent, TopInfoBoxComponent } from "@components";

// 상수 분리
const PLANTS = [
    { id: "plant-1", name: "와이어블 1호기" },
    { id: "plant-2", name: "와이어블 2호기" },
    { id: "plant-3", name: "와이어블 3호기" },
] as const;

const WEATHER_DATA = [
    { icon: "temp", title: "온도", count: 23.3, unit: "℃" },
    { icon: "humidity", title: "습도", count: 23.3, unit: "%" },
    { icon: "wind", title: "풍속", count: 23.3, unit: "m/s" },
    { icon: "solar", title: "일사량", count: 23.3, unit: "W/m²" },
    { icon: "dust", title: "PM10", count: 23.3, unit: "μg/m³" },
    { icon: "dust", title: "PM2.5", count: 23.3, unit: "μg/m³" },
];

const PLANT_SUMMARY_DATA = [
    { icon: "energy", title: "현재출력", count: 1245.2, totalCount: 15000, unit: "kW" },
    { icon: "battery02", title: "가동률", count: 84.5, unit: "%" },
    { icon: "feedback", title: "정상 장비", count: 12, totalCount: 30, unit: "대" },
    { icon: "feedback", title: "평균 효율", count: 98.4, unit: "%" },
];

// 컴포넌트 분리
function PlantSelector() {
    return (
        <form style={{ display: "flex", gap: 8 }}>
            <Select label="" selectionMode="multiple" placeholder="발전소 선택" style={{ flex: 1, width: 200 }}>
                {PLANTS.map((plant) => (
                    <SelectItem key={plant.id}>{plant.name}</SelectItem>
                ))}
            </Select>
        </form>
    );
}

function WeatherInfoSection() {
    return (
        <TopInfoBoxComponent title="금일 기상정보">
            <InfoBoxGroup>
                {WEATHER_DATA.map((item, index) => (
                    <InfoBoxComponent key={`weather-${index}`} bg="white" icon={item.icon} title={item.title} count={item.count} unit={item.unit} />
                ))}
            </InfoBoxGroup>
        </TopInfoBoxComponent>
    );
}

function PlantSummarySection() {
    return (
        <TopInfoBoxComponent title="발전소 요약정보" bg="#FFE6D3" color="#A34600" className="flex-1">
            <InfoBoxGroup>
                {PLANT_SUMMARY_DATA.map((item, index) => (
                    <InfoBoxComponent key={`summary-${index}`} bg="white" icon={item.icon} title={item.title} count={item.count} {...(item.totalCount && { totalCount: item.totalCount })} unit={item.unit} />
                ))}
            </InfoBoxGroup>
        </TopInfoBoxComponent>
    );
}

// 메인 컴포넌트
export function MonitoringPage() {
    return (
        <>
            <div className="title-group">
                <TitleComponent title="발전소 모니터링" subTitle="운영 모니터링" desc="Real-time Plant Operations Dashboard" />
                <PlantSelector />
            </div>

            <div className="group">
                <WeatherInfoSection />
                <PlantSummarySection />
            </div>

            <div className="group">
                <div className="row-group" style={{ width: 400 }}>
                    <InfoGroupComponent title="현재 장비 상태">
                        <PieChartComponent />
                    </InfoGroupComponent>
                    <InfoGroupComponent title="발전소별 성능">
                    </InfoGroupComponent>
                </div>
                <div className="row-group flex-1">
                    <InfoGroupComponent title="발전소 발전량">
                    </InfoGroupComponent>
                    <InfoGroupComponent title="발전 현황 표">
                    </InfoGroupComponent>
                </div>
            </div>
        </>
    );
}
