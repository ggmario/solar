
import { IconComponent, Select, SelectItem, TitleComponent, ButtonComponent, StatusContComponent, TabList, Tabs, Tab, TabPanels, TabPanel, TopBoxComponent, InfoGroupComponent, InfoBoxComponent, InfoBoxGroup, Meter, TextBoxGroup, TextBoxComponent, LineChartComponent } from "@components";
// // 데이터와 타입 가져오기
import { PLANT_DATA_LIST, PlantData } from "./dashboard.data";
import KakaoMap from "src/components/kakaoMap/KakaoMap";

// 상수 분리
const PLANTS = [
    { id: "plant-1", name: "와이어블 1호기" },
    { id: "plant-2", name: "와이어블 2호기" },
    { id: "plant-3", name: "와이어블 3호기" },
];

const STATUS_DATA = [
    { title: "전체 시설", count: 312, unit: "군데" },
    { title: "총 설비용량", count: 650.2, unit: "kW" },
    { title: "현재 출력", count: 150.2, unit: "kW" },
    { title: "평균 가용률", count: 150.2, unit: "%" },
    { title: "금일 발전량", count: 150.2, unit: "MWh" },
    { title: "전일 발전량", count: 150.2, unit: "MWh" },
];

const WEATHER_DATA = [
    { icon: "temp", title: "온도", count: 23.3, unit: "℃" },
    { icon: "humidity", title: "습도", count: 23.3, unit: "%" },
    { icon: "wind", title: "풍속", count: 23.3, unit: "m/s" },
    { icon: "solar", title: "일사량", count: 23.3, unit: "W/m²" },
    { icon: "dust", title: "PM10", count: 23.3, unit: "μg/m³" },
    { icon: "dust", title: "PM2.5", count: 23.3, unit: "μg/m³" },
];

const PLANT_DETAIL_DATA = [
    { icon: "battery", title: "설비용량", count: 23.3, unit: "kW" },
    { icon: "energy", title: "현재출력", count: 23.3, unit: "kW" },
    { icon: "factory", title: "금일 발전량", count: 23.3, unit: "MWh" },
];

const PLANT_INFO_DATA = [
    { title: "지역", content: "서울" },
    { title: "LMP 존", content: "LZ01" },
    { title: "위치", content: "37.292,126.2932" },
    { title: "최종 업데이트", content: "2025.11.22 12:32 54" },
];

// 스타일 상수
const BADGE_STYLES = {
    observatory: {
        background: "#FFDBE9",
        color: "#9C003A",
    },
    plant: {
        background: "#FFE6D3",
        color: "#A34600",
    },
};

const badgeStyle = {
    display: "inline-block",
    height: 20,
    padding: "2px 4px",
    borderRadius: 4,
    fontFamily: "Pretendard",
    fontSize: "0.8667rem",
    margin: "-2px 0 0 6px",
};

// 컴포넌트 분리
function Badge({ children, variant = "observatory" }: { children: React.ReactNode; variant?: "observatory" | "plant" }) {
    return <span style={{ ...badgeStyle, ...BADGE_STYLES[variant] }}>{children}</span>;
}

function PlantSelector() {
    return (
        <form style={{ display: "flex", gap: 8 }}>
            <Select label="" selectionMode="multiple" placeholder="발전소 선택" style={{ flex: 1, width: 200 }}>
                {PLANTS.map((plant) => (
                    <SelectItem key={plant.id}>{plant.name}</SelectItem>
                ))}
            </Select>
            <ButtonComponent variant="third" icon={<IconComponent name="plus" size={20} cursor="pointer" />}>
                시설 추가
            </ButtonComponent>
            <ButtonComponent variant="primary" icon={<IconComponent name="link" size={20} cursor="pointer" />}>
                대시보드
            </ButtonComponent>
        </form>
    );
}

function TodayPowerGeneration() {
    return (
        <Tabs className="s-tabs flex-1">
            <InfoGroupComponent
                flex={1}
                minHeight={247}
                title="금일 발전량"
                extra={
                    <TabList aria-label="Today's power generation">
                        <Tab id="time">시간별</Tab>
                        <Tab id="day">일별</Tab>
                    </TabList>
                }
            >
                <TabPanels>
                    <TabPanel id="time">
                        <LineChartComponent />
                    </TabPanel>
                    <TabPanel id="day">
                        <LineChartComponent />
                    </TabPanel>
                </TabPanels>
            </InfoGroupComponent>
        </Tabs>
    );
}

function WeatherInfoSection() {
    return (
        <InfoGroupComponent
            title={
                <>
                    기상정보
                    <Badge variant="observatory">서울관측소</Badge>
                </>
            }
            extra={<IconComponent name="arrow_down02" size={16} cursor="pointer" />}
        >
            <InfoBoxGroup>
                {WEATHER_DATA.map((item, index) => (
                    <InfoBoxComponent key={`weather-${index}`} icon={item.icon} title={item.title} count={item.count} unit={item.unit} />
                ))}
            </InfoBoxGroup>
        </InfoGroupComponent>
    );
}

function PlantDetailSection() {
    return (
        <InfoGroupComponent
            title={
                <>
                    발전소 상세정보
                    <Badge variant="plant">서울관측소</Badge>
                </>
            }
            extra={<IconComponent name="arrow_down02" size={16} cursor="pointer" />}
        >
            <InfoBoxGroup>
                {PLANT_DETAIL_DATA.map((item, index) => (
                    <InfoBoxComponent key={`plant-detail-${index}`} icon={item.icon} title={item.title} count={item.count} unit={item.unit} />
                ))}
                <InfoBoxComponent icon="battery02" title="가동률" count={23.3} unit="%" rightSide>
                    <Meter value={25} />
                </InfoBoxComponent>
            </InfoBoxGroup>

            <TextBoxGroup>
                {PLANT_INFO_DATA.map((item, index) => (
                    <TextBoxComponent key={`plant-info-${index}`} title={item.title} content={item.content} />
                ))}
            </TextBoxGroup>

            <ButtonComponent variant="primary" icon={<IconComponent name="link" color="white" />}>
                발전소 모니터링
            </ButtonComponent>
        </InfoGroupComponent>
    );
}

// 메인 컴포넌트
export function DashboardPage() {
    return (
        <>
            <div className="title-group">
                <TitleComponent title="발전소 현황" desc="실시간 전국 발전소별 모니터링 대시보드 화면 입니다" />
                <PlantSelector />
            </div>

            <TopBoxComponent>
                <StatusContComponent items={STATUS_DATA} />
            </TopBoxComponent>

            <div className="group flex-1">
                <div style={{ flex: 1, background: "#eee" }}>
                    <KakaoMap plants={PLANT_DATA_LIST} onSelect={setSelectedPlant} />
                </div>

                <div className="row-group" style={{ width: 440 }}>
                    <TodayPowerGeneration />
                    <WeatherInfoSection />
                    <PlantDetailSection />
                </div>
            </div>
        </>
    );
}
