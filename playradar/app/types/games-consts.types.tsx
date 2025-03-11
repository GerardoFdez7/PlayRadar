import {
  Swords,
  Compass,
  Gamepad2,
  WalletCardsIcon as Cards,
  Target,
  GraduationCap,
  Users,
  Brush,
} from "lucide-react";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { FaGun } from "react-icons/fa6";
import { GiFloatingPlatforms } from "react-icons/gi";
import {
  PiBoxingGloveBold,
  PiStrategy,
  PiCubeTransparentLight,
} from "react-icons/pi";
import { MdOutlineSportsBasketball } from "react-icons/md";

export const genres = [
  { name: "Action", slug: "action", icon: <Swords className="w-4 h-4" /> },
  {
    name: "Fighting",
    slug: "fighting",
    icon: <PiBoxingGloveBold className="w-4 h-4" />,
  },
  { name: "Shooter", slug: "shooter", icon: <FaGun className="w-4 h-4" /> },
  {
    name: "Platformer",
    slug: "platformer",
    icon: <GiFloatingPlatforms className="w-4 h-4" />,
  },
  {
    name: "Sports",
    slug: "sports",
    icon: <MdOutlineSportsBasketball className="w-4 h-4" />,
  },
  {
    name: "Strategy",
    slug: "strategy",
    icon: <PiStrategy className="w-4 h-4" />,
  },
  {
    name: "Simulation",
    slug: "simulation",
    icon: <PiCubeTransparentLight className="w-4 h-4" />,
  },
  {
    name: "Adventure",
    slug: "adventure",
    icon: <Compass className="w-4 h-4" />,
  },
  { name: "Arcade", slug: "arcade", icon: <Gamepad2 className="w-4 h-4" /> },
  { name: "Card", slug: "card", icon: <Cards className="w-4 h-4" /> },
  { name: "Casual", slug: "casual", icon: <Target className="w-4 h-4" /> },
  {
    name: "Educational",
    slug: "educational",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    name: "Puzzle",
    slug: "puzzle",
    icon: <IoExtensionPuzzleOutline className="w-4 h-4" />,
  },
  { name: "Family", slug: "family", icon: <Users className="w-4 h-4" /> },
  { name: "Indie", slug: "indie", icon: <Brush className="w-4 h-4" /> },
];

export const platformSlugToId: { [key: string]: string } = {
  pc: "1",
  playstation: "2",
  xbox: "3",
  nintendo: "7",
  linux: "6",
  mac: "5",
  ios: "4",
  android: "8",
};