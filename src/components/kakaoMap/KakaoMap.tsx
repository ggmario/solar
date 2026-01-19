import { useEffect, useRef } from 'react';
// 위에서 만든 타입 임포트 (경로 맞춰주세요)
import { PlantData } from '../../pages/dashboard/dashboard.data';
import imageSrc from '@assets/images/ico_map.png'
interface Props {
    plants: PlantData[];                  // 부모에게 받을 데이터 리스트
    onSelect: (plant: PlantData) => void; // 클릭 시 부모에게 알려줄 함수
}

export default function KakaoMap({ plants, onSelect }: Props) { // 👈 Props 수신
    const mapElement = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const { kakao } = window as any;
        if (!mapElement.current || !kakao) return;

        kakao.maps.load(() => {
            const options = {
                center: new kakao.maps.LatLng(35.731178, 128.470532), // 대한민국 중심쯤으로 이동
                level: 11
            };
            const map = new kakao.maps.Map(mapElement.current, options);

            // 이미지 설정 (기존 코드 유지)
            // const imageSrc = {imageSrc};
            const imageSize = new kakao.maps.Size(34, 35);
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 🌟 3. Props로 받은 plants 배열로 마커 생성
            plants.forEach((data) => {
                const markerPosition = new kakao.maps.LatLng(data.lat, data.lng);

                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                    title: data.title,
                    image: markerImage,
                    clickable: true
                });

                marker.setMap(map);

                // 🌟 4. 클릭 시 alert 대신 onSelect 실행!
                kakao.maps.event.addListener(marker, 'click', function() {
                    console.log(`${data.title} 선택됨`);
                    onSelect(data); // 👈 부모 컴포넌트의 함수를 실행시킴 (데이터 전달)
                });
            });
        });
    }, [plants]); // plants가 바뀌면 지도 다시 그림

    return <div ref={mapElement} style={{ width: '100%', height: '100%', minHeight: '400px' }} />;
}