import ModeToggle from "@/components/features/ThemeSelector";
import { GoBack } from "../ui/GoBack";

interface HeaderProfileProps {
  className?: string;
}

const HeaderProfile: React.FC<HeaderProfileProps> = ({ className = "" }) => {
  return (
    <header
      className={`flex flex-row justify-between py-6 mb-4 sticky top-0 backdrop-blur z-50 ${className}`}
    >
      <div className="flex items-center gap-4 ml-2">
        <GoBack />
        <h1 className="text-xl font-bold">Profile</h1>
      </div>
      <div className="flex gap-4 items-center mr-6">
        <ModeToggle />
      </div>
    </header>
  );
};

export default HeaderProfile;
