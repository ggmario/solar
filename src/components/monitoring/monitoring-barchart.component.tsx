import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';

interface BarChartProps {
  width?: string | number;
  height?: string | number;
}

export function BarChartComponent({ 
  width = '100%', 
  height = '100%' 
}: BarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const option = useMemo(() => ({
    grid: {
      left: '0%',
      right: '0%',
      bottom: '5%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#8E94BB',
        margin: 10,
        fontSize: 11
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#F0F0F0'
        }
      },
      axisLine: { show: false },
      axisLabel: { show: false }
    },
    series: [
      {
        data: [15, 45, 90, 15, 40, 55, 30, 20, 45, 15],
        type: 'bar',
        barWidth: 16,
        showBackground: true,
        backgroundStyle: {
          color: '#F4F4F6',
          borderRadius: [1, 1, 0, 0]
        },
        itemStyle: {
          borderRadius: [1, 1, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 0, color: '#FFDDC3' },
            { offset: 0.44, color: '#ED751A' },
            { offset: 1, color: '#D70251' }
          ])
        },
        animationDuration: 1200,
        animationEasing: 'cubicOut'
      }
    ]
  }), []);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // 이미 인스턴스가 있으면 dispose 후 새로 생성하거나 setOption만 수행
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }
    
    chartInstance.current = echarts.init(chartRef.current);
    chartInstance.current.setOption(option);

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    // ResizeObserver를 사용하여 컨테이너 크기 변화 감지
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chartRef.current);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      chartInstance.current?.dispose();
    };
  }, [option]);

  return (
    <div style={{ width: width, height: height, minHeight: 159, position: 'relative' }}>
      <div ref={chartRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}