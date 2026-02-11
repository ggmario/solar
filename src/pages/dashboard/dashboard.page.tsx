import { useState, useEffect } from "react"; // 👈 useState 추가
import {
  IconComponent,
  Select,
  SelectItem,
  TitleComponent,
  ButtonComponent,
  StatusContComponent,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TopBoxComponent,
  InfoGroupComponent,
  InfoBoxComponent,
  InfoBoxGroup,
  Meter,
  TextBoxGroup,
  TextBoxComponent,
  LineChartComponent,
} from "@components";
import KakaoMap from "@components/kakaoMap/KakaoMap";
import { useNavigate } from "react-router-dom";

// 데이터와 타입 가져오기
import { PLANT_DATA_LIST, PlantData } from "./dashboard.data";

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

// const WEATHER_DATA = [
//   { icon: "temp", title: "온도", count: 24.5, unit: "℃" },
//   { icon: "humidity", title: "습도", count: 45, unit: "%" },
//   { icon: "wind", title: "풍속", count: 3.2, unit: "m/s" },
//   { icon: "solar", title: "일사량", count: 500, unit: "W/m²" },
//   { icon: "dust", title: "PM10", count: 30, unit: "μg/m³" },
//   { icon: "dust", title: "PM2.5", count: 15, unit: "μg/m³" },
// ];

// const PLANT_DETAIL_DATA = [
//   { icon: "battery", title: "설비용량", count: 500, unit: "kW" },
//   { icon: "energy", title: "현재출력", count: 450, unit: "kW" },
//   { icon: "factory", title: "금일 발전량", count: 348, unit: "MWh" },
// ];

// const PLANT_INFO_DATA = [
//   { title: "지역", content: "서울" },
//   { title: "LMP 존", content: "LZ01" },
//   { title: "위치", content: "37.292,126.2932" },
//   { title: "최종 업데이트", content: "2025.11.22 12:32 54" },
// ];

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
function Badge({
  children,
  variant = "observatory",
}: {
  children: React.ReactNode;
  variant?: "observatory" | "plant";
}) {
  return (
    <span style={{ ...badgeStyle, ...BADGE_STYLES[variant] }}>{children}</span>
  );
}

function PlantSelector() {
  return (
    <form style={{ display: "flex", gap: 8 }}>
      <Select
        label=""
        selectionMode="multiple"
        placeholder="발전소 선택"
        style={{ flex: 1, width: 200 }}
      >
        {PLANTS.map((plant) => (
          <SelectItem key={plant.id}>{plant.name}</SelectItem>
        ))}
      </Select>
      <ButtonComponent
        variant="third"
        icon={<IconComponent name="plus" size={20} cursor="pointer" />}
      >
        시설 추가
      </ButtonComponent>
      <ButtonComponent
        variant="contained"
        icon={<IconComponent name="link" size={20} cursor="pointer" />}
      >
        대시보드
      </ButtonComponent>
    </form>
  );
}

function TodayPowerGeneration() {
  const [tab, setTab] = useState<"time" | "day">("time");

  useEffect(() => {
    const id = setInterval(() => {
      setTab((prev) => (prev === "time" ? "day" : "time"));
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <Tabs
      className="s-tabs flex-1"
      selectedKey={tab}
      onSelectionChange={(key) => setTab(key as "time" | "day")}
    >
      <InfoGroupComponent
        className="h-full"
        flex={1}
        minHeight={247}
        height="100%" 
        title="금일 발전량"
        extra={
        <TabList aria-label="Today's power generation" style={{
          display: "flex",
          gap: "var(--spacing-2)",
          height: "36px",
          padding: "var(--spacing-2)",
          border: 0,
          borderRadius: "var(--radius)",
          background: "#E9E8EB"
        }}>
          {/* <Tab id="time">시간별</Tab>
          <Tab id="day">일별</Tab> */}

          <Tab id="time" style={{ padding: '6px 12px', display: "flex", alignItems: "center", justifyContent: "center", borderRadius:"6px"}}>시간별</Tab>
          <Tab id="day" style={{ padding: '6px 12px', display: "flex", alignItems: "center", justifyContent: "center", borderRadius:"6px"}}>일별</Tab>

        </TabList>
        }
      >
        <TabPanels>
          <TabPanel id="time">
            <LineChartComponent type="time" />
          </TabPanel>
          <TabPanel id="day">
            <LineChartComponent type="day" />
          </TabPanel>
        </TabPanels>
      </InfoGroupComponent>
    </Tabs>
  );
}

function WeatherInfoSection({ data }: { data: PlantData }) {
  return (
    <InfoGroupComponent
      title={
        <>
          기상정보
          <Badge variant="observatory">{data.title}관측소</Badge>
        </>
      }
      extra={<IconComponent name="arrow_down02" size={16} cursor="pointer" />}
    >
      <InfoBoxGroup>
        {/*{WEATHER_DATA.map((item, index) => (*/}
        {/*    <InfoBoxComponent key={`weather-${index}`} icon={item.icon} title={item.title} count={item.count} unit={item.unit} />*/}
        {/*))}*/}
        <InfoBoxComponent
          icon="temp"
          title="온도"
          count={data.weather.temp}
          unit="℃"
        />
        <InfoBoxComponent
          icon="humidity"
          title="습도"
          count={data.weather.humidity}
          unit="%"
        />
        <InfoBoxComponent
          icon="wind"
          title="풍속"
          count={data.weather.wind}
          unit="m/s"
        />
        <InfoBoxComponent
          icon="solar"
          title="일사량"
          count={data.weather.solar}
          unit="W/m²"
        />
        <InfoBoxComponent
          icon="dust"
          title="PM10"
          count={data.weather.pm10}
          unit="μg/m³"
        />
        <InfoBoxComponent
          icon="dust"
          title="PM2.5"
          count={data.weather.pm25}
          unit="μg/m³"
        />
      </InfoBoxGroup>
    </InfoGroupComponent>
  );
}

function PlantDetailSection({ data }: { data: PlantData }) {
  // 👇 1. 훅 선언 (함수 최상단에 작성)
  const navigate = useNavigate();
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
        {/*{PLANT_DETAIL_DATA.map((item, index) => (*/}
        {/*    <InfoBoxComponent key={`plant-detail-${index}`} icon={item.icon} title={item.title} count={item.count} unit={item.unit} />*/}
        {/*))}*/}
        <InfoBoxComponent
          icon="battery"
          title="설비용량"
          count={data.detail.capacity}
          unit="kW"
        />
        <InfoBoxComponent
          icon="energy"
          title="현재출력"
          count={data.detail.output}
          unit="kW"
        />
        <InfoBoxComponent
          icon="factory"
          title="금일 발전량"
          count={data.detail.todayGen}
          unit="MWh"
        />
        <InfoBoxComponent
          icon="battery02"
          title="가동률"
          count={data.detail.rate}
          unit="%"
          rightSide
        >
          <Meter value={data.detail.rate} />
        </InfoBoxComponent>
      </InfoBoxGroup>

      <TextBoxGroup>
        {/*{PLANT_INFO_DATA.map((item, index) => (*/}
        {/*    <TextBoxComponent key={`plant-info-${index}`} title={item.title} content={item.content} />*/}
        {/*))}*/}
        <TextBoxComponent title="지역" content={data.detail.region} />
        <TextBoxComponent title="LMP 존" content={data.detail.lmp} />

        {/* 좌표 소수점 예쁘게 자르기 */}
        <TextBoxComponent
          title="위치"
          content={`${data.lat.toFixed(3)}, ${data.lng.toFixed(3)}`}
        />
        <TextBoxComponent
          title="최종 업데이트"
          content={data.detail.updateTime}
        />
      </TextBoxGroup>

      {/*  <ButtonComponent variant="primary" icon={<IconComponent name="link" color="white" />}>*/}
      <ButtonComponent
        variant="contained"
        icon={<IconComponent name="link" color="white" />}
        onClick={() => navigate("/monitoring")}
      >
        발전소 모니터링
      </ButtonComponent>
    </InfoGroupComponent>
  );
} //

// 메인 컴포넌트
export function DashboardPage() {
  // 🌟 상태 관리: 현재 선택된 발전소 (초기값은 첫 번째 발전소)
  const [selectedPlant, setSelectedPlant] = useState<PlantData>(
    PLANT_DATA_LIST[0],
  );
  return (
    <>
      <div className="title-group">
        <TitleComponent
          title="발전소 현황"
          desc="실시간 전국 발전소별 모니터링 대시보드 화면 입니다"
        />
        <PlantSelector />
      </div>

      <TopBoxComponent>
        <StatusContComponent items={STATUS_DATA} />
      </TopBoxComponent>

      <div className="group flex-1">


        <div className="map-group">
          <Tabs>
            <TabList aria-label="맵 유형">
              <Tab id="basic">기본</Tab>
              <Tab id="cluster">클러스터</Tab>
            </TabList>
            <TabPanels>
              <TabPanel id="basic">
                <KakaoMap plants={PLANT_DATA_LIST} onSelect={setSelectedPlant} />
                <div className="map-legend">
                  <span>시설상태</span>
                  <div className="group">
                    <span className="dot normal">정상</span>
                    <span className="dot checking">경고</span>
                    <span className="dot error">오류</span>
                    <span className="dot off">오프라인</span>
                  </div>
                </div>
              </TabPanel>
              <TabPanel id="cluster">
                <KakaoMap plants={PLANT_DATA_LIST} onSelect={setSelectedPlant} />
              </TabPanel>
            </TabPanels>
          </Tabs> 
        </div>

        <div className="row-group" style={{ width: 440 }}>
          <TodayPowerGeneration />
          {/* 🌟 [핵심] 수정된 부분: selectedPlant 데이터를 하위 컴포넌트로 전달 */}
          <WeatherInfoSection data={selectedPlant} />
          <PlantDetailSection data={selectedPlant} />
        </div>
      </div>
    </>
  );
}
