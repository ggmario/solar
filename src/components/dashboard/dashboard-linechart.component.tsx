import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

interface DataPoint {
  time: string;
  value: number;
}

type Props = {
  type: 'time' | 'day';
  data?: DataPoint[];
};

export function LineChartComponent({ type, data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const chartData = useMemo<DataPoint[]>(() => {
    if (data?.length) return data;

    if (type === 'day') {
      return [
        { time: '01-01', value: 120 },
        { time: '01-02', value: 90 },
        { time: '01-03', value: 160 },
        { time: '01-04', value: 80 },
        { time: '01-05', value: 140 },
        { time: '01-06', value: 110 },
        { time: '01-07', value: 170 },
      ];
    }

    return [
      { time: '00:00', value: 35 },
      { time: '01:00', value: 50 },
      { time: '02:00', value: 20 },
      { time: '03:00', value: 185 },
      { time: '04:00', value: 35 },
      { time: '07:00', value: 40 },
      { time: '09:00', value: 45 },
      { time: '10:00', value: 70 },
      { time: '11:00', value: 40 },
      { time: '12:00', value: 80 },
      { time: '13:00', value: 50 },
      { time: '14:00', value: 40 },
      { time: '15:00', value: 20 },
      { time: '16:00', value: 90 },
      { time: '17:00', value: 120 },
      { time: '18:00', value: 70 },
      { time: '19:00', value: 40 },
      { time: '20:00', value: 20 },
      { time: '21:00', value: 10 },
      { time: '22:00', value: 20 },
      { time: '23:00', value: 20 },
      { time: '24:00', value: 35 },
    ];
  }, [data, type]);

  const xLabelFormatter = useMemo(() => {
    if (type === 'day') return (v: string) => v;
    return (v: string) => v;
  }, [type]);

  const option: EChartsOption = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      grid: {
        top: '15%',
        bottom: '15%',
        left: '3%',
        right: '3%',
        containLabel: false,
      },
      tooltip: {
        trigger: 'axis',
        show: true,
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#9291A5',
            type: 'dashed',
            width: 1,
          },
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        textStyle: { color: '#333' },
        formatter: (params: any) => {
          const p = params?.[0];
          const x = p?.axisValue ?? '';
          const y = p?.data ?? '';
          const label = type === 'day' ? '일별' : '시간별';
          return `${label}<br/>${x} : ${y}`;
        },
      },
      xAxis: {
        type: 'category',
        data: chartData.map(item => item.time),
        boundaryGap: false,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#615E83',
          fontSize: 12,
          margin: 15,
          formatter: xLabelFormatter as any,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#EDF2F7',
            type: 'dashed',
          },
        },
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: [
        {
          name: type === 'day' ? 'Day' : 'Time',
          type: 'line',
          data: chartData.map(item => item.value),
          smooth: 0.4,
          showSymbol: false,
          emphasis: {
            scale: true,
            itemStyle: {
              color: '#D70251',
              borderColor: '#FFFFFF',
              borderWidth: 2,
              shadowBlur: 8,
              shadowColor: 'rgba(0, 0, 0, 0.2)',
            },
          },
          symbol: 'circle',
          symbolSize: 15,
          lineStyle: {
            width: 1,
            color: '#D70251',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgb(228, 70, 49)' },
              { offset: 0.45, color: 'rgb(241, 162, 152)' },
              { offset: 1, color: 'rgba(255, 255, 255, 0)' },
            ]),
          },
        },
      ],
    };
  }, [chartData, type, xLabelFormatter]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }
    chartInstance.current.setOption(option, true);

    const handleResize = () => {
      requestAnimationFrame(() => {
        chartInstance.current?.resize();
      });
    };

    resizeObserverRef.current = new ResizeObserver(handleResize);

    let element: HTMLDivElement | null = chartRef.current;
    for (let i = 0; i < 5 && element; i++) {
      resizeObserverRef.current.observe(element);
      element = element.parentElement as HTMLDivElement | null;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserverRef.current?.disconnect();
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [option]);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0 }}>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
