const IconSource = [
  { name: 'alarm', src: '/solar/icons/icon_alarm.svg' },
  { name: 'arrow_down', src: '/solar/icons/icon_arrow_down.svg' },
  { name: 'arrow_down02', src: '/solar/icons/icon_arrow_down02.svg' },
  { name: 'arrow_right', src: '/solar/icons/icon_arrow_right.svg' },
  { name: 'battery', src: '/solar/icons/icon_battery.svg' },
  { name: 'battery02', src: '/solar/icons/icon_battery02.svg' },
  { name: 'check', src: '/solar/icons/icon_check.svg' },
  { name: 'close', src: '/solar/icons/icon_close.svg' },
  { name: 'dust', src: '/solar/icons/icon_dust.svg' },
  { name: 'energy', src: '/solar/icons/icon_energy.svg' },
  { name: 'eye', src: '/solar/icons/icon_eye.svg' },
  { name: 'eye_off', src: '/solar/icons/icon_eye_off.svg' },
  { name: 'factory', src: '/solar/icons/icon_factory.svg' },
  { name: 'feedback', src: '/solar/icons/icon_feedback.svg' },
  { name: 'google', src: '/solar/icons/icon_google.svg' },
  { name: 'humidity', src: '/solar/icons/icon_humidity.svg' },
  { name: 'imp', src: '/solar/icons/icon_imp.svg' },
  { name: 'kakao', src: '/solar/icons/icon_kakao.svg' },
  { name: 'link', src: '/solar/icons/icon_link.svg' },
  { name: 'logout', src: '/solar/icons/icon_logout.svg' },
  { name: 'menu', src: '/solar/icons/icon_menu.svg' },
  { name: 'menu01', src: '/solar/icons/icon_menu01.svg' },
  { name: 'menu02', src: '/solar/icons/icon_menu02.svg' },
  { name: 'menu03', src: '/solar/icons/icon_menu03.svg' },
  { name: 'menu04', src: '/solar/icons/icon_menu04.svg' },
  { name: 'menu05', src: '/solar/icons/icon_menu05.svg' },
  { name: 'menu06', src: '/solar/icons/icon_menu06.svg' },
  { name: 'menu07', src: '/solar/icons/icon_menu07.svg' },
  { name: 'menu08', src: '/solar/icons/icon_menu08.svg' },
  { name: 'menu09', src: '/solar/icons/icon_menu09.svg' },
  { name: 'menu10', src: '/solar/icons/icon_menu10.svg' },
  { name: 'naver', src: '/solar/icons/icon_naver.svg' },
  { name: 'plus', src: '/solar/icons/icon_plus.svg' },
  { name: 'power', src: '/solar/icons/icon_power.svg' },
  { name: 'solar', src: '/solar/icons/icon_solar.svg' },
  { name: 'temp', src: '/solar/icons/icon_temp.svg' },
  { name: 'wind', src: '/solar/icons/icon_wind.svg' },
  { name: 'download', src: '/solar/icons/icon_download.svg' },
  { name: 'group', src: '/solar/icons/icon_group.svg' },
];

export type iName = (typeof IconSource)[number]['name'];

interface IconProps {
  iName?: iName | string;
  size?: number;
  color?: string;
  background?: string;
  className?: string;
  original?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Icons = ({
  iName,
  original,
  background,
  color = "#374957",
  size = 24,
  className,
  style,
  onClick }: IconProps) => {
  const icon = IconSource.find((item) => item.name === iName);

  const iconStyle = !original
    ? {
        display: 'inline-block',
        WebkitMaskImage: `url(${icon?.src})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        WebkitMaskPosition: 'center',
        width: size,
        height: size,
        background: background ?? color,
      }
    : {
        display: 'inline-block',
        backgroundImage: `url(${icon?.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: size,
        height: size,
        backgroundColor: color,
      };

  return <i className={className} style={{...iconStyle, ...style}} onClick={() => onClick?.()} />;
};
export default Icons;
