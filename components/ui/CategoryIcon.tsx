import React from 'react';
import {
  Headphones,
  Radio,
  Cable,
  Disc,
  Gamepad2,
  VolumeX,
  Activity,
  Mic,
  Smile,
  Bluetooth,
  type LucideProps,
} from 'lucide-react';

interface CategoryIconProps extends LucideProps {
  name: string;
}

export default function CategoryIcon({ name, className = 'w-4 h-4', ...props }: CategoryIconProps) {
  switch (name) {
    case 'Headphones':
      return <Headphones className={className} {...props} />;
    case 'Radio':
      return <Radio className={className} {...props} />;
    case 'Cable':
      return <Cable className={className} {...props} />;
    case 'Disc':
      return <Disc className={className} {...props} />;
    case 'Gamepad2':
      return <Gamepad2 className={className} {...props} />;
    case 'VolumeX':
      return <VolumeX className={className} {...props} />;
    case 'Activity':
      return <Activity className={className} {...props} />;
    case 'Mic':
      return <Mic className={className} {...props} />;
    case 'Smile':
      return <Smile className={className} {...props} />;
    case 'Bluetooth':
      return <Bluetooth className={className} {...props} />;
    default:
      return <Headphones className={className} {...props} />;
  }
}
