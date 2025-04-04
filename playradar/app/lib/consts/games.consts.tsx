import type { Game } from '@/types/games.types';
import {
  Swords,
  Compass,
  Gamepad2,
  WalletCardsIcon as Cards,
  Target,
  GraduationCap,
  Users,
  Brush,
} from 'lucide-react';
import { IoExtensionPuzzleOutline } from 'react-icons/io5';
import { FaGun } from 'react-icons/fa6';
import { GiFloatingPlatforms } from 'react-icons/gi';
import {
  PiBoxingGloveBold,
  PiStrategy,
  PiCubeTransparentLight,
} from 'react-icons/pi';
import { MdOutlineSportsBasketball } from 'react-icons/md';
import {
  PcIcon,
  PlaystationIcon,
  Playstation4Icon,
  Playstation5Icon,
  XboxIcon,
  XboxOneIcon,
  XboxSeriesXIcon,
  NintendoIcon,
  MacIcon,
  LinuxIcon,
  IosIcon,
  AndroidIcon,
  NintendoSwitchIcon,
  NintendoWiiIcon,
  NintendoDsIcon,
} from '@/components/ui/Platforms';

export const genres = [
  { name: 'Action', slug: 'action', icon: <Swords className="w-4 h-4" /> },
  {
    name: 'Fighting',
    slug: 'fighting',
    icon: <PiBoxingGloveBold className="w-4 h-4" />,
  },
  { name: 'Shooter', slug: 'shooter', icon: <FaGun className="w-4 h-4" /> },
  {
    name: 'Platformer',
    slug: 'platformer',
    icon: <GiFloatingPlatforms className="w-4 h-4" />,
  },
  {
    name: 'Sports',
    slug: 'sports',
    icon: <MdOutlineSportsBasketball className="w-4 h-4" />,
  },
  {
    name: 'Strategy',
    slug: 'strategy',
    icon: <PiStrategy className="w-4 h-4" />,
  },
  {
    name: 'Simulation',
    slug: 'simulation',
    icon: <PiCubeTransparentLight className="w-4 h-4" />,
  },
  {
    name: 'Adventure',
    slug: 'adventure',
    icon: <Compass className="w-4 h-4" />,
  },
  { name: 'Arcade', slug: 'arcade', icon: <Gamepad2 className="w-4 h-4" /> },
  { name: 'Card', slug: 'card', icon: <Cards className="w-4 h-4" /> },
  { name: 'Casual', slug: 'casual', icon: <Target className="w-4 h-4" /> },
  {
    name: 'Educational',
    slug: 'educational',
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    name: 'Puzzle',
    slug: 'puzzle',
    icon: <IoExtensionPuzzleOutline className="w-4 h-4" />,
  },
  { name: 'Family', slug: 'family', icon: <Users className="w-4 h-4" /> },
  { name: 'Indie', slug: 'indie', icon: <Brush className="w-4 h-4" /> },
];

export const platforms = [
  {
    name: 'Windows',
    slug: 'pc',
    icon: <PcIcon />,
    id: '1',
  },
  {
    name: 'PlayStation',
    slug: 'playstation',
    icon: <PlaystationIcon />,
    id: '2',
  },
  {
    name: 'PlayStation 5',
    slug: 'playstation-5',
    icon: <Playstation5Icon />,
    id: '187',
  },
  {
    name: 'PlayStation 4',
    slug: 'playstation-4',
    icon: <Playstation4Icon />,
    id: '18',
  },
  {
    name: 'Xbox',
    slug: 'xbox',
    icon: <XboxIcon />,
    id: '3',
  },
  {
    name: 'Xbox Series X',
    slug: 'xbox-series-x',
    icon: <XboxSeriesXIcon />,
    id: '186',
  },
  {
    name: 'Xbox One',
    slug: 'xbox-one',
    icon: <XboxOneIcon />,
    id: '14',
  },
  {
    name: 'Nintendo',
    slug: 'nintendo',
    icon: <NintendoIcon />,
    id: '7',
  },
  {
    name: 'Nintendo Switch',
    slug: 'nintendo-switch',
    icon: <NintendoSwitchIcon />,
    id: '130',
  },
  {
    name: 'Nintendo Wii',
    slug: 'nintendo-wii',
    icon: <NintendoWiiIcon />,
    id: '11',
  },
  {
    name: 'Nintendo DS',
    slug: 'nintendo-ds',
    icon: <NintendoDsIcon />,
    id: '13',
  },
  {
    name: 'MacOS',
    slug: 'mac',
    icon: <MacIcon />,
    id: '5',
  },
  {
    name: 'Linux',
    slug: 'linux',
    icon: <LinuxIcon />,
    id: '6',
  },
  {
    name: 'iOS',
    slug: 'ios',
    icon: <IosIcon />,
    id: '4',
  },
  {
    name: 'Android',
    slug: 'android',
    icon: <AndroidIcon />,
    id: '8',
  },
];

export const sortGames = (games: Game[], sortBy: string) => {
  return [...games].sort((a, b) => {
    if (sortBy === 'likes') {
      return (b.ratings_count ?? 0) - (a.ratings_count ?? 0);
    }
    if (sortBy === 'release') {
      return new Date(b.released).getTime() - new Date(a.released).getTime();
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
};
