import ModeToggle from '@/components/features/ThemeSelector';
import logo from '@/assets/logo.png';
import Image from 'next/image';
import { GoBack } from '@/app/components/ui/GoBack';

interface HeaderAuthProps {
  className?: string;
}

const HeaderAuth: React.FC<HeaderAuthProps> = ({ className = '' }) => {
  return (
    <header className={`${className}`}>
      {/* Title */}
      <div className="flex items-center mt-16 mb-2 lg:mt-24">
        {/* Back button */}
        <GoBack className="absolute top-4 left-4" />
        {/* Logo */}
        <Image
          src={logo}
          alt="PlayRadar Logo"
          width={80}
          height={80}
          className="mx-2 w-30 h-30"
        />
        <h1 className="max-[370px]:text-[12vw] text-5xl sm:text-6xl mr-2 font-bold w-full dark:text-gray-200 font-playRadar">
          PlayRadar
        </h1>
      </div>
      {/* Theme button */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
    </header>
  );
};

export default HeaderAuth;
