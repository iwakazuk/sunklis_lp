import headsetIcon from '../../../assets/headset-solid-full.svg';

interface AdvisorIconProps {
  className?: string;
}

export default function AdvisorIcon({ className = '' }: AdvisorIconProps) {
  return (
    <img
      src={headsetIcon}
      alt="advisor icon"
      className={`brightness-0 invert object-contain ${className}`}
    />
  );
}
