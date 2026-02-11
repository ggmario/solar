import React, { useMemo, useState } from "react";

import { 
  BarChartComponent, Cell, Column, GaugeChartComponent, 
  InfoBoxComponent, InfoBoxGroup, InfoGroupComponent, 
  PieChartComponent, Row, Select, SelectItem, Table, 
  TableBody, TableHeader, TextBoxComponent, TextBoxGroup, 
  TitleComponent, TopInfoBoxComponent 
} from "@components";

// type WeatherItem = { icon: string; title: string; count: number; unit: string };
type WeatherItem = { icon: any; title: string; count: number; unit: string };
type SummaryItem = {
  icon: any;
  title: string;
  count: number;
  unit: string;
  totalCount?: number;
};
type TableRowItem = {
  id: string;
  label: string;
  time: string;
  gen: string;
  trans: string;
  rate: string;
  co2: string;
  isTotal?: boolean;
};

type PlantDataItem = {
  weather: WeatherItem[];
  summary: SummaryItem[];
  gauges: {
    lastMonth: number;
    thisMonth: number;
    yesterday: number;
    current: number;
  };
  tableRows: TableRowItem[];
};

type EquipmentStatus = { normal: number; checking: number; error: number };
type PerfPoint = { x: number; y: number };
type BarChartData = { category: string; value: number };

const PLANTS = [
  { id: "plant-1", name: "와이어블 1호기" },
  { id: "plant-2", name: "와이어블 2호기" },
  { id: "plant-3", name: "와이어블 3호기" },
] as const;

const WEATHER_DATA: WeatherItem[] = [
  { icon: "temp", title: "온도", count: 24.5, unit: "℃" },
  { icon: "humidity", title: "습도", count: 45, unit: "%" },
  { icon: "wind", title: "풍속", count: 3.2, unit: "m/s" },
  { icon: "solar", title: "일사량", count: 500, unit: "W/m²" },
  { icon: "dust", title: "PM10", count: 30, unit: "μg/m³" },
  { icon: "dust", title: "PM2.5", count: 15, unit: "μg/m³" },
];

const PLANT_SUMMARY_DATA: SummaryItem[] = [
  {icon: "energy",title: "현재출력",count: 1245.2,totalCount: 15000,unit: "kW",},
  {icon: "battery02", title: "가동률", count: 84.5, unit: "%" },
  {icon: "feedback",title: "정상 장비",count: 29,totalCount: 30,unit: "대",},
  {icon: "feedback", title: "평균 효율", count: 98.4, unit: "%"},
];

const TABLE_ROWS: TableRowItem[] = [
  {id: "row-1",label: "어제",time: "3.5 h",gen: "0.2 MWh",trans: "0.8 MWh",rate: "89.5 %",co2: "3.00 tCO₂",},
  {id: "row-2",label: "오늘",time: "2.0 h",gen: "0.1 MWh",trans: "0 MWh",rate: "0 %",co2: "0.00 tCO₂",},
  {id: "row-3",label: "지난달",time: "120.5 h",gen: "0.2 MWh",trans: "0.8 MWh",rate: "89.5 %",co2: "90.00 tCO₂",},
  {id: "row-4",label: "이번달",time: "76.5 h",gen: "0.2 MWh",trans: "0.8 MWh",rate: "89.5 %",co2: "756.00 tCO₂",},
  {id: "row-5",label: "금년",time: "76.5 h",gen: "0.2 MWh",trans: "0.8 MWh",rate: "89.5 %",co2: "1,095.00 tCO₂",},
  {id: "row-6",label: "작년",time: "1,400.5 h",gen: "4.2 MWh",trans: "4.1 MWh",rate: "94.5 %",co2: "4,500.00 tCO₂",},
  {id: "row-total",label: "누계",time: "1,679.5 h",gen: "0.2 MWh",trans: "0.8 MWh",rate: "89.5 %",co2: "4,500.00 tCO₂",isTotal: true,},
];

const PLANT_DATA: Record<string, PlantDataItem> = {
  "plant-1": {
    weather: [
      {icon: "temp", title: "온도", count: 24.5, unit: "℃" },
      {icon: "humidity", title: "습도", count: 45, unit: "%" },
      {icon: "wind", title: "풍속", count: 3.2, unit: "m/s" },
      {icon: "solar", title: "일사량", count: 500, unit: "W/m²" },
      {icon: "dust", title: "PM10", count: 30, unit: "μg/m³" },
      {icon: "dust", title: "PM2.5", count: 15, unit: "μg/m³" },
    ],
    summary: [
      {icon: "energy",title: "현재출력",count: 1245.2,totalCount: 15000,unit: "kW",},
      {icon: "battery02", title: "가동률", count: 84.5, unit: "%" },
      {icon: "feedback",title: "정상 장비",count: 29,totalCount: 30,unit: "대",},
      {icon: "feedback", title: "평균 효율", count: 98.4, unit: "%" },
    ],
    gauges: {lastMonth: 650.2,thisMonth: 446.1,yesterday: 12.6,current: 3.2,},
    tableRows: [
      {id: "row-1",label: "어제",time: "3.5 h",gen: "0.2 MWh",trans: "0.8 MWh",rate: "89.5 %",co2: "3.00 tCO₂",},
      {id: "row-2",label: "오늘",time: "2.0 h",gen: "0.1 MWh",trans: "0 MWh",rate: "0 %",co2: "0.00 tCO₂",},
      {id: "row-3",label: "지난달",time: "120.5 h",gen: "0.2 MWh",trans: "0.8 MWh",rate: "89.5 %",co2: "90.00 tCO₂",},
      {id: "row-4",label: "이번달",time: "76.5 h",gen: "0.2 MWh",trans: "0.8 MWh",rate: "89.5 %",co2: "756.00 tCO₂",},
      {id: "row-5",label: "금년",time: "76.5 h",gen: "0.2 MWh",trans: "0.8 MWh",rate: "89.5 %",co2: "1,095.00 tCO₂",},
      {id: "row-6",label: "작년",time: "1,400.5 h",gen: "4.2 MWh",trans: "4.1 MWh",rate: "94.5 %",co2: "4,500.00 tCO₂",},
      {id: "row-total",label: "누계",time: "1,679.5 h",gen: "0.2 MWh",trans: "0.8 MWh",rate: "89.5 %",co2: "4,500.00 tCO₂",isTotal: true,},
    ],
  },

  "plant-2": {
    weather: [
      { icon: "temp", title: "온도", count: 23.1, unit: "℃" },
      { icon: "humidity", title: "습도", count: 52, unit: "%" },
      { icon: "wind", title: "풍속", count: 2.6, unit: "m/s" },
      { icon: "solar", title: "일사량", count: 420, unit: "W/m²" },
      { icon: "dust", title: "PM10", count: 28, unit: "μg/m³" },
      { icon: "dust", title: "PM2.5", count: 14, unit: "μg/m³" },
    ],
    summary: [
      {icon: "energy",title: "현재출력",count: 980.4,totalCount: 12000,unit: "kW",},
      {icon: "battery02", title: "가동률", count: 78.2, unit: "%" },
      {icon: "feedback",title: "정상 장비",count: 18,totalCount: 20,unit: "대",},
      {icon: "feedback", title: "평균 효율", count: 96.9, unit: "%" },
    ],
    gauges: {lastMonth: 520.1,thisMonth: 388.7,yesterday: 9.4,current: 2.4,    },
    tableRows: [
      {id: "row-1",label: "어제",time: "3.0 h",gen: "0.15 MWh",trans: "0.62 MWh",rate: "87.2 %",co2: "2.10 tCO₂",},
      {id: "row-2",label: "오늘",time: "1.5 h",gen: "0.08 MWh",trans: "0 MWh",rate: "0 %",co2: "0.00 tCO₂",},
      {id: "row-3",label: "지난달",time: "98.0 h",gen: "0.18 MWh",trans: "0.72 MWh",rate: "88.1 %",co2: "70.00 tCO₂",},
      {id: "row-4",label: "이번달",time: "60.0 h",gen: "0.14 MWh",trans: "0.58 MWh",rate: "86.9 %",co2: "520.00 tCO₂",},
      {id: "row-5",label: "금년",time: "60.0 h",gen: "0.14 MWh",trans: "0.58 MWh",rate: "86.9 %",co2: "820.00 tCO₂",},
      {id: "row-6",label: "작년",time: "1,120.0 h",gen: "3.1 MWh",trans: "3.0 MWh",rate: "93.1 %",co2: "3,200.00 tCO₂",},
      {id: "row-total",label: "누계",time: "1,278.5 h",gen: "3.3 MWh",trans: "3.62 MWh",rate: "90.2 %",co2: "3,200.00 tCO₂",isTotal: true,},
    ],
  },

  "plant-3": {
    weather: [
      { icon: "temp", title: "온도", count: 25.8, unit: "℃" },
      { icon: "humidity", title: "습도", count: 41, unit: "%" },
      { icon: "wind", title: "풍속", count: 4.1, unit: "m/s" },
      { icon: "solar", title: "일사량", count: 610, unit: "W/m²" },
      { icon: "dust", title: "PM10", count: 34, unit: "μg/m³" },
      { icon: "dust", title: "PM2.5", count: 18, unit: "μg/m³" },
    ],
    summary: [
      {icon: "energy",title: "현재출력",count: 1422.6,totalCount: 16000,unit: "kW",},
      {icon: "battery02", title: "가동률", count: 88.1, unit: "%" },
      {icon: "feedback",title: "정상 장비",count: 24,totalCount: 25,unit: "대",},
      {icon: "feedback", title: "평균 효율", count: 99.1, unit: "%" },
    ],
    gauges: {
      lastMonth: 710.8,
      thisMonth: 502.3,
      yesterday: 14.1,
      current: 3.8,
    },
    tableRows: [
      {id: "row-1",label: "어제",time: "4.2 h",gen: "0.23 MWh",trans: "0.85 MWh",rate: "90.3 %",co2: "3.40 tCO₂",},
      {id: "row-2",label: "오늘",time: "2.3 h",gen: "0.12 MWh",trans: "0 MWh",rate: "0 %",co2: "0.00 tCO₂",},
      {id: "row-3",label: "지난달",time: "132.0 h",gen: "0.24 MWh",trans: "0.92 MWh",rate: "90.0 %",co2: "98.00 tCO₂",},
      {id: "row-4",label: "이번달",time: "90.0 h",gen: "0.22 MWh",trans: "0.84 MWh",rate: "89.1 %",co2: "820.00 tCO₂",},
      {id: "row-5",label: "금년",time: "90.0 h",gen: "0.22 MWh",trans: "0.84 MWh",rate: "89.1 %",co2: "1,250.00 tCO₂",},
      {id: "row-6",label: "작년",time: "1,560.0 h",gen: "4.8 MWh",trans: "4.7 MWh",rate: "95.2 %",co2: "5,100.00 tCO₂",},
      {id: "row-total",label: "누계",time: "1,788.5 h",gen: "5.1 MWh",trans: "5.62 MWh",rate: "91.6 %",co2: "5,100.00 tCO₂",isTotal: true,},
    ],
  },
};

const EQUIPMENT_STATUS_BY_PLANT: Record<string, EquipmentStatus> = {
  "plant-1": { normal: 110, checking: 12, error: 8 },
  "plant-2": { normal: 180, checking: 32, error: 20 },
  "plant-3": { normal: 128, checking: 28, error: 10 },
};

const PERFORMANCE_SERIES_BY_PLANT: Record<string, PerfPoint[]> = {
  "plant-1": [
    { x: 1, y: 20 }, { x: 2, y: 12 }, { x: 3, y: 17 }, { x: 4, y: 15 }, { x: 5, y: 20 },
    { x: 6, y: 19 }, { x: 7, y: 23 }, { x: 8, y: 22 }, { x: 9, y: 25 }, { x: 10, y: 27 },
  ], // sum = 200
  "plant-2": [
    { x: 1, y: 17 }, { x: 2, y: 7 }, { x: 3, y: 16 }, { x: 4, y: 15 }, { x: 5, y: 21 },
    { x: 6, y: 19 }, { x: 7, y: 25 }, { x: 8, y: 24 }, { x: 9, y: 27 }, { x: 10, y: 29 },
  ], // sum = 200
  "plant-3": [
    { x: 1, y: 10 }, { x: 2, y: 13 }, { x: 3, y: 17 }, { x: 4, y: 16 }, { x: 5, y: 21 },
    { x: 6, y: 20 }, { x: 7, y: 25 }, { x: 8, y: 23 }, { x: 9, y: 27 }, { x: 10, y: 28 },
  ], // sum = 200
};

const toNum = (v: string) =>
  Number(
    String(v)
      .replace(/,/g, "")
      .match(/-?\d+(\.\d+)?/)?.[0] ?? 0,
  );

const fmt = (n: number, suffix: string) => {
  const fixed = Number.isInteger(n) ? String(n) : n.toFixed(1);
  return `${fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${suffix}`;
};

const AVG_KEYS = new Set<SummaryItem["title"]>(["가동률", "평균 효율"]);

const mergeWeather = (ids: string[]) => {
  // 선택 없으면 기본(전체 공통) 표시
  if (!ids.length) return WEATHER_DATA;

  // 선택된 것 중 첫 번째 발전소(대표) 기상만 표시
  const first = PLANT_DATA[ids[0]];
  return first?.weather ?? WEATHER_DATA;
};

const mergeSummary = (ids: string[]) => {
  if (!ids.length) return PLANT_SUMMARY_DATA;

  const list = ids.map((id) => PLANT_DATA[id]).filter(Boolean) as PlantDataItem[];
  if (!list.length) return PLANT_SUMMARY_DATA;

  const base = list[0].summary.map((x) => ({ ...x }));

  for (let i = 1; i < list.length; i++) {
    const next = list[i].summary;

    for (let j = 0; j < base.length; j++) {
      const isAvg = AVG_KEYS.has(base[j].title);

      if (isAvg) {
        base[j].count += next[j].count; // 일단 누적해두고 아래에서 나눔
        // 평균 항목은 totalCount 합산 안 함(원하면 유지 가능)
      } else {
        base[j].count += next[j].count;
        if (base[j].totalCount != null || next[j].totalCount != null) {
          base[j].totalCount =
            (base[j].totalCount ?? 0) + (next[j].totalCount ?? 0);
        }
      }
    }
  }

  // 평균 항목만 선택 개수로 나눔
  for (let j = 0; j < base.length; j++) {
    if (AVG_KEYS.has(base[j].title)) {
      base[j].count = Number((base[j].count / list.length).toFixed(1));
    }
  }

  return base;
};

const mergeGauges = (ids: string[]) => {
  if (!ids.length)
    return { lastMonth: 0, thisMonth: 0, yesterday: 0, current: 0 };

  const first = PLANT_DATA[ids[0]];
  if (!first)
    return { lastMonth: 0, thisMonth: 0, yesterday: 0, current: 0 };

  const out = { ...first.gauges };

  for (let i = 1; i < ids.length; i++) {
    const g = PLANT_DATA[ids[i]]?.gauges;
    if (!g) continue;

    out.lastMonth += g.lastMonth;
    out.thisMonth += g.thisMonth;
    out.yesterday += g.yesterday;
    out.current += g.current;
  }

  return out;
};

const mergeTableRows = (ids: string[]) => {
  if (!ids.length) return TABLE_ROWS;

  const first = PLANT_DATA[ids[0]];
  if (!first) return TABLE_ROWS;

  const rows0 = first.tableRows.map((r) => ({ ...r }));

  for (let i = 1; i < ids.length; i++) {
    const rows = PLANT_DATA[ids[i]]?.tableRows;
    if (!rows) continue;

    for (let j = 0; j < rows0.length; j++) {
      rows0[j].time = fmt(toNum(rows0[j].time) + toNum(rows[j].time), "h");
      rows0[j].gen = fmt(toNum(rows0[j].gen) + toNum(rows[j].gen), "MWh");
      rows0[j].trans = fmt(
        toNum(rows0[j].trans) + toNum(rows[j].trans),
        "MWh",
      );
      rows0[j].co2 = fmt(toNum(rows0[j].co2) + toNum(rows[j].co2), "tCO₂");
      rows0[j].rate =
        `${((toNum(rows0[j].rate) + toNum(rows[j].rate)) / 2).toFixed(1)} %`;
    }
  }

  return rows0;
};

const mergeEquipmentStatus = (ids: string[]): EquipmentStatus => {
  const useIds = ids.length ? ids : PLANTS.map((p) => p.id);

  return useIds.reduce(
    (a, id) => {
      const v = EQUIPMENT_STATUS_BY_PLANT[id];
      if (!v) return a;
      a.normal += v.normal;
      a.checking += v.checking;
      a.error += v.error;
      return a;
    },
    { normal: 0, checking: 0, error: 0 },
  );
};

const mergePerformanceSeries = (ids: string[]): BarChartData[] => {
  const useIds = ids.length ? ids : PLANTS.map((p) => p.id);

  const base: BarChartData[] = Array.from({ length: 10 }, (_, i) => ({
    category: String(i + 1),
    value: 0,
  }));

  for (const id of useIds) {
    const series = PERFORMANCE_SERIES_BY_PLANT[id];
    if (!series) continue;

    for (let i = 0; i < 10; i++) {
      base[i].value += series[i]?.y ?? 0;
    }
  }

  return base;
};

/** 발전소 선택 셀렉트 박스 */
const PlantSelector = ({ onChange }: { onChange: (ids: string[]) => void }) => (
  <form style={{ display: "flex", gap: 8 }}>
    <Select
      aria-label="발전소 선택"
      selectionMode="multiple"
      placeholder="발전소 선택"
      style={{ flex: 1, width: 200 }}
      onChange={(key: unknown) => {
        if (key === "all") {
          onChange(PLANTS.map((p) => p.id));
          return;
        }
        if (key instanceof Set) {
          onChange(Array.from(key as Set<React.Key>).map(String));
          return;
        }
        if (Array.isArray(key)) {
          onChange(key.map(String));
          return;
        }
        if (key == null) return;
        onChange([String(key)]);
      }}
    >
      {PLANTS.map((plant) => (
        <SelectItem id={plant.id} key={plant.id}>
          {plant.name}
        </SelectItem>
      ))}
    </Select>
  </form>
);

/** 기상 정보 및 발전소 요약 섹션 */
const TopDashboardSection = ({
  weatherData,
  plantSummaryData,
}: {
  weatherData: WeatherItem[];
  plantSummaryData: SummaryItem[];
}) => (
  <div className="group">
    <TopInfoBoxComponent title="금일 기상정보">
      <InfoBoxGroup>
        {weatherData.map((item, idx) => (
          <InfoBoxComponent key={`weather-${idx}`} bg="white" {...item} />
        ))}
      </InfoBoxGroup>
    </TopInfoBoxComponent>

    <TopInfoBoxComponent
      title="발전소 요약정보"
      bg="#FFE6D3"
      color="#A34600"
      className="flex-1"
    >
      <InfoBoxGroup>
        {plantSummaryData.map((item, idx) => (
          <InfoBoxComponent key={`summary-${idx}`} bg="white" {...item} />
        ))}
      </InfoBoxGroup>
    </TopInfoBoxComponent>
  </div>
);

/** 발전 현황 표 */
const PowerGenerationTable = ({ rows }: { rows: TableRowItem[] }) => (
  <>
    <h3 id="caption" className="sr-only">발전 현황 표</h3>
    <p id="summary" className="sr-only">구분, 발전시간, 발전량, 인버터송전량, AC/DC 변환율, CO₂ 감소량을 표시한 표입니다. </p>
    <Table aria-labelledby="caption" aria-describedby="summary" style={{ height: "100%" }} >
      <TableHeader style={{ height: 70 }}>
        <Column isRowHeader>구분</Column>
        <Column>발전 시간<br />(시간)</Column>
        <Column>발전량<br />(MWh)</Column>
        <Column>인버터송전량<br />(MWh)</Column>
        <Column>AC/DC 변환율<br />(%)</Column>
        <Column>CO₂ 감소량<br />(tCO₂)</Column>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <Row
            key={row.id}
            className={row.isTotal ? "react-aria-Row tfoot" : "react-aria-Row"}
          >
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
  const [selectedPlantIds, setSelectedPlantIds] = useState<string[]>([]);

  const weatherData = useMemo(
    () => mergeWeather(selectedPlantIds),
    [selectedPlantIds],
  );
  const plantSummaryData = useMemo(
    () => mergeSummary(selectedPlantIds),
    [selectedPlantIds],
  );
  const gauges = useMemo(() => mergeGauges(selectedPlantIds), [selectedPlantIds]);
  const tableRows = useMemo(
    () => mergeTableRows(selectedPlantIds),
    [selectedPlantIds],
  );

  const equipmentStatus = useMemo(
    () => mergeEquipmentStatus(selectedPlantIds),
    [selectedPlantIds],
  );
  const performanceSeries = useMemo(
    () => mergePerformanceSeries(selectedPlantIds),
    [selectedPlantIds],
  );

  return (
    <>
      <div className="title-group">
        <TitleComponent title="발전소 모니터링" subTitle="운영 모니터링" desc="Real-time Plant Operations Dashboard" />
        <PlantSelector onChange={setSelectedPlantIds} />
      </div>

      <TopDashboardSection weatherData={weatherData} plantSummaryData={plantSummaryData}/>

      <div className="group flex-1">
        <div className="row-group" style={{ width: 400 }}>
          <InfoGroupComponent title="현재 장비 상태">
            <PieChartComponent
              data={[
                { name: "정상", value: equipmentStatus.normal, color: "#1AED83" },
                { name: "점검중", value: equipmentStatus.checking, color: "#FFCA58" },
                { name: "오류", value: equipmentStatus.error, color: "#FF5757" },
              ]}
            />
            <TextBoxGroup gap={2}>
              <TextBoxComponent width="100%" title={<span className="dot normal">정상</span>} content={`${equipmentStatus.normal}건`} />
              <TextBoxComponent width="100%" title={<span className="dot checking">점검중</span>} content={`${equipmentStatus.checking}건`} />
              <TextBoxComponent width="100%" title={<span className="dot error">오류</span>} content={`${equipmentStatus.error}건`} />
            </TextBoxGroup>
          </InfoGroupComponent>

          <InfoGroupComponent flex={1} title="발전소별 성능">
            <BarChartComponent data={performanceSeries} />
          </InfoGroupComponent>
        </div>

        <div className="row-group flex-1">
          <InfoGroupComponent title="발전소 발전량">
            <div style={{display: "flex",padding: "16px 0 20px",justifyContent: "space-around",}}>
              <GaugeChartComponent title="지난달 발전량" value={gauges.lastMonth} />
              <GaugeChartComponent title="이번달 발전량" value={gauges.thisMonth} />
              <GaugeChartComponent title="전일 발전량" value={gauges.yesterday} />
              <GaugeChartComponent title="현재 발전량" value={gauges.current} />
            </div>
          </InfoGroupComponent>

          <InfoGroupComponent flex={1} title="발전 현황 표">
            <PowerGenerationTable rows={tableRows} />
          </InfoGroupComponent>
        </div>
      </div>
    </>
  );
}