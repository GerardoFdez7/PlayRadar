import ModeToggle from "@/components/features/ThemeSelector";
import LogInButton from "@/components/ui/LogInButton";
import { GoHome } from "../ui/GoHome";

interface HeaderGameProps {
  className?: string;
}

const HeaderGame: React.FC<HeaderGameProps> = ({ className = "" }) => {
  return (
    <header
      className={`flex flex-row gap-4 justify-between mx-6 py-6 ${className}`}
    >
      <GoHome />
      <div className="flex gap-4 items-center">
        <LogInButton />
        <ModeToggle />
      </div>
      {/* Game Title */}
      
    </header>
  );
};

export default HeaderGame;
