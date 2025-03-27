import HeaderProfile from "@/components/layout/HeaderProfile";
import { MainProfile } from "@/components/layout/MainProfile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 transition-colors duration-500 dark:bg-gray-900">
      <HeaderProfile />
      <MainProfile />
    </div>
  );
}
