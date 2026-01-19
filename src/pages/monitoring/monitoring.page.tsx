import { 
  BarChartComponent, Cell, Column, GaugeChartComponent, 
  InfoBoxComponent, InfoBoxGroup, InfoGroupComponent, 
  PieChartComponent, Row, Select, SelectItem, Table, 
  TableBody, TableHeader, TextBoxComponent, TextBoxGroup, 
  TitleComponent, TopInfoBoxComponent 
} from "@components";


const PLANTS = [
  { id: "plant-1", name: "와이어블 1호기" },
  { id: "plant-2", name: "와이어블 2호기" },
  { id: "plant-3", name: "와이어블 3호기" },
] as const;

const WEATHER_DATA = [
    { icon: "temp", title: "온도", count: 24.5, unit: "℃" },
    { icon: "humidity", title: "습도", count: 45, unit: "%" },
    { icon: "wind", title: "풍속", count: 3.2, unit: "m/s" },
    { icon: "solar", title: "일사량", count: 500, unit: "W/m²" },
    { icon: "dust", title: "PM10", count: 30, unit: "μg/m³" },
    { icon: "dust", title: "PM2.5", count: 15, unit: "μg/m³" },
];

const PLANT_SUMMARY_DATA = [
  { icon: "energy", title: "현재출력", count: 1245.2, totalCount: 15000, unit: "kW" },
  { icon: "battery02", title: "가동률", count: 84.5, unit: "%" },
  { icon: "feedback", title: "정상 장비", count: 12, totalCount: 30, unit: "대" },
  { icon: "feedback", title: "평균 효율", count: 98.4, unit: "%" },
];

const TABLE_ROWS = [
  { id: "row-1", label: "어제", time: "7.5 h", gen: "0.2 MWh", trans: "0.8 MWh", rate: "89.5 %", co2: "3.00 tCO₂" },
  { id: "row-2", label: "오늘", time: "0.0 h", gen: "0.0 MWh", trans: "0 MWh", rate: "0 %", co2: "0.00 tCO₂" },
  { id: "row-3", label: "지난달", time: "7.5 h", gen: "0.2 MWh", trans: "0.8 MWh", rate: "89.5 %", co2: "90.00 tCO₂" },
  { id: "row-4", label: "이번달", time: "7.5 h", gen: "0.2 MWh", trans: "0.8 MWh", rate: "89.5 %", co2: "756.00 tCO₂" },
  { id: "row-5", label: "금년", time: "7.5 h", gen: "0.2 MWh", trans: "0.8 MWh", rate: "89.5 %", co2: "1,095.00 tCO₂" },
  { id: "row-6", label: "작년", time: "7.5 h", gen: "0.2 MWh", trans: "0.8 MWh", rate: "89.5 %", co2: "4,500.00 tCO₂" },
  { id: "row-total", label: "누계", time: "7.5 h", gen: "0.2 MWh", trans: "0.8 MWh", rate: "89.5 %", co2: "4,500.00 tCO₂", isTotal: true },
];

/** 발전소 선택 셀렉트 박스 */
const PlantSelector = () => (
  <form style={{ display: "flex", gap: 8 }}>
    <Select aria-label="발전소 선택" selectionMode="multiple" placeholder="발전소 선택" style={{ flex: 1, width: 200 }}>
      {PLANTS.map((plant) => (
        <SelectItem key={plant.id}>{plant.name}</SelectItem>
      ))}
    </Select>
  </form>
);

/** 기상 정보 및 발전소 요약 섹션 */
const TopDashboardSection = () => (
  <div className="group">
    <TopInfoBoxComponent title="금일 기상정보">
      <InfoBoxGroup>
        {WEATHER_DATA.map((item, idx) => (
          <InfoBoxComponent key={`weather-${idx}`} bg="white" {...item} />
        ))}
      </InfoBoxGroup>
    </TopInfoBoxComponent>

    <TopInfoBoxComponent title="발전소 요약정보" bg="#FFE6D3" color="#A34600" className="flex-1">
      <InfoBoxGroup>
        {PLANT_SUMMARY_DATA.map((item, idx) => (
          <InfoBoxComponent key={`summary-${idx}`} bg="white" {...item} />
        ))}
      </InfoBoxGroup>
    </TopInfoBoxComponent>
  </div>
);

/** 발전 현황 표 */
const PowerGenerationTable = () => (
  <>
    <h3 id="caption" className="sr-only">발전 현황 표</h3>
    <p id="summary" className="sr-only">구분, 발전시간, 발전량, 인버터송전량, AC/DC 변환율, CO₂ 감소량을 표시한 표입니다.</p>
    <Table aria-labelledby="caption" aria-describedby="summary" style={{ height: '100%' }}>
      <TableHeader style={{ height: 70 }}>
        <Column isRowHeader>구분</Column>
        <Column>발전 시간<br />(시간)</Column>
        <Column>발전량<br />(MWh)</Column>
        <Column>인버터송전량<br />(MWh)</Column>
        <Column>AC/DC 변환율<br />(%)</Column>
        <Column>CO₂ 감소량<br />(tCO₂)</Column>
      </TableHeader>
      <TableBody>
        {TABLE_ROWS.map((row) => (
          <Row key={row.id} className={row.isTotal ? "react-aria-Row tfoot" : "react-aria-Row"}>
            <Cell data-scope="row">{row.label}</Cell>
            <Cell>{row.time}</Cell>
            <Cell>{row.gen}</Cell>
            <Cell>{row.trans}</Cell>
            <Cell>{row.rate}</Cell>
            <Cell>{row.co2}</Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  </>
);

export function MonitoringPage() {
  return (
    <>
      <div className="title-group">
        <TitleComponent 
          title="발전소 모니터링" 
          subTitle="운영 모니터링" 
          desc="Real-time Plant Operations Dashboard" 
        />
        <PlantSelector />
      </div>

      <TopDashboardSection />

      <div className="group flex-1">
        <div className="row-group" style={{ width: 400 }}>
          <InfoGroupComponent title="현재 장비 상태">
            <PieChartComponent />
            <TextBoxGroup gap={2}>
              <TextBoxComponent width="100%" title={<span className="dot normal">정상</span>} content="10건" />
              <TextBoxComponent width="100%" title={<span className="dot checking">점검중</span>} content="10건" />
              <TextBoxComponent width="100%" title={<span className="dot error">오류</span>} content="10건" />
            </TextBoxGroup>
          </InfoGroupComponent>
          
          <InfoGroupComponent flex={1} title="발전소별 성능">
            <BarChartComponent />
          </InfoGroupComponent>
        </div>

        <div className="row-group flex-1">
          <InfoGroupComponent title="발전소 발전량">
            <div style={{ display: "flex", padding: "16px 0 20px", justifyContent: "space-around" }}>
              <GaugeChartComponent title="지난달 발전량" value={650.2} />
              <GaugeChartComponent title="이번달 발전량" value={446.1} />
              <GaugeChartComponent title="전일 발전량" value={12.6} />
              <GaugeChartComponent title="현재 발전량" value={3.2} />
            </div>
          </InfoGroupComponent>

          <InfoGroupComponent flex={1} title="발전 현황 표">
            <PowerGenerationTable />
          </InfoGroupComponent>
        </div>
      </div>
    </>
  );
}