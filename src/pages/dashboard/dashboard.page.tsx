import { useState } from 'react'; // 👈 useState 추가
import { IconComponent, Select, SelectItem, TitleComponent, ButtonComponent, StatusContComponent, TabList, Tabs, Tab, TabPanels, TabPanel, TopBoxComponent, InfoGroupComponent, InfoBoxComponent, InfoBoxGroup, Meter, TextBoxGroup, TextBoxComponent } from "@components";
import KakaoMap from "../../components/kakaoMap/KakaoMap";
// 데이터와 타입 가져오기
import { PLANT_DATA_LIST, PlantData } from "./dashboard.data";

export function DashboardPage() {
    // 🌟 상태 관리: 현재 선택된 발전소 (초기값은 첫 번째 발전소)
    const [selectedPlant, setSelectedPlant] = useState<PlantData>(PLANT_DATA_LIST[0]);

    const statusData = [
        { title: "전체 시설", count: 312, unit: "군데" },
        { title: "총 설비용량", count: 650.2, unit: "kW" },
        { title: "현재 출력", count: 150.2, unit: "kW" },
        { title: "평균 가용률", count: 150.2, unit: "%" },
        { title: "금일 발전량", count: 150.2, unit: "MWh" },
        { title: "전일 발전량", count: 150.2, unit: "MWh" },
    ];

    return (
        <>
            <div className="title-group">
                <TitleComponent title="발전소 현황" desc="실시간 전국 발전소별 모니터링 대시보드 화면 입니다" />
                <form style={{ display: "flex", gap: 8 }}>
                    <Select label="" selectionMode="multiple" placeholder="발전소 선택" style={{ flex: 1, width: 200 }}>
                        <SelectItem>와이어블 1호기</SelectItem>
                        <SelectItem>와이어블 2호기</SelectItem>
                        <SelectItem>와이어블 3호기</SelectItem>
                    </Select>
                    <ButtonComponent variant="third" icon={<IconComponent name="plus" size={20} cursor="pointer" />}>
                        시설 추가
                    </ButtonComponent>
                    <ButtonComponent variant="primary" icon={<IconComponent name="link" size={20} cursor="pointer" />}>
                        대시보드
                    </ButtonComponent>
                </form>
            </div>
            <TopBoxComponent>
                <StatusContComponent items={statusData} />
            </TopBoxComponent>
            <div className="group">
                <div style={{flex: 1, background: "#eee", minHeight: "500px", position: "relative"}}>
                    <KakaoMap
                        plants={PLANT_DATA_LIST}
                        onSelect={setSelectedPlant}
                    />
                </div>
                <div className="row-group" style={{ width: 440 }}>
                    {/* 금일 발전량 */}
                    <Tabs className="s-tabs">
                        <InfoGroupComponent
                            height={225}
                            title="금일 발전량"
                            extra={
                                <>
                                    <TabList aria-label="Today's power generation">
                                        <Tab id="time">시간별</Tab>
                                        <Tab id="day">일별</Tab>
                                    </TabList>
                                </>
                            }
                        >
                            <TabPanels>
                                <TabPanel id="time">dd</TabPanel>
                                <TabPanel id="day">aa</TabPanel>
                            </TabPanels>
                        </InfoGroupComponent>
                    </Tabs>
                    {/* 기상정보 */}
                    <InfoGroupComponent
                        title={
                            <>
                                기상정보
                                <span style={{ display: 'inline-block', height: 20, padding: '2px 4px', borderRadius: 4, background: '#FFDBE9', color: '#9C003A', fontFamily: 'Pretendard', fontSize: '0.8667rem', margin: '-2px 0 0 6px' }}>서울관측소</span>
                            </>
                        }
                        extra={<IconComponent name="arrow_down02" size={16} cursor="pointer" />}
                    >
                        <InfoBoxGroup>
                            <InfoBoxComponent icon="temp" title="온도" count={selectedPlant.weather.temp} unit="℃"/>
                            <InfoBoxComponent icon="humidity" title="습도" count={selectedPlant.weather.humidity} unit="%"/>
                            <InfoBoxComponent icon="wind" title="풍속" count={selectedPlant.weather.wind} unit="m/s"/>
                            <InfoBoxComponent icon="solar" title="일사량" count={selectedPlant.weather.solar} unit="W/m²"/>
                            <InfoBoxComponent icon="dust" title="PM10" count={selectedPlant.weather.pm10} unit="μg/m³"/>
                            <InfoBoxComponent icon="dust" title="PM2.5" count={selectedPlant.weather.pm25} unit="μg/m³"/>
                        </InfoBoxGroup>
                    </InfoGroupComponent>
                    {/* 발전소 상세정보 */}
                    <InfoGroupComponent
                        title={
                            <>
                                발전소 상세정보
                                <span style={{ display: 'inline-block', height: 20, padding: '2px 4px', borderRadius: 4, background: '#FFE6D3', color: '#A34600', fontFamily: 'Pretendard', fontSize: '0.8667rem',  margin: '-2px 0 0 6px' }}>서울관측소</span>
                            </>
                        }
                        extra={<IconComponent name="arrow_down02" size={16} cursor="pointer" />}
                    >
                        <InfoBoxGroup>
                            <InfoBoxComponent icon="battery" title="설비용량" count={selectedPlant.detail.capacity} unit="kW"/>
                            <InfoBoxComponent icon="energy" title="현재출력" count={selectedPlant.detail.output} unit="kW"/>
                            <InfoBoxComponent icon="factory" title="금일 발전량" count={selectedPlant.detail.todayGen} unit="MWh"/>
                            <InfoBoxComponent icon="battery02" title="가동률" count={selectedPlant.detail.rate} unit="%" rightSide>
                                <Meter value={selectedPlant.detail.rate}/>
                            </InfoBoxComponent>
                        </InfoBoxGroup>
                        <TextBoxGroup>
                            <TextBoxComponent title="지역" content={selectedPlant.detail.region}/>
                            <TextBoxComponent title="LMP 존" content={selectedPlant.detail.lmp}/>
                            <TextBoxComponent title="위치" content={`${selectedPlant.lat.toFixed(3)}, ${selectedPlant.lng.toFixed(3)}`}/>
                            <TextBoxComponent title="최종 업데이트" content={selectedPlant.detail.updateTime}/>
                        </TextBoxGroup>
                        <ButtonComponent variant="primary" icon={<IconComponent name="link" color="white" />}>
                            발전소 모니터링
                        </ButtonComponent>
                    </InfoGroupComponent>
                </div>
            </div>
        </>
    );
}
