import HeaderGame from '@/components/layout/HeaderGame';
import MainGame from '@/components/layout/MainGame';
import Footer from '@/components/layout/Footer';

export default function GameDetailsPage() {
  return (
    <div className="min-h-screen bg-gray-100 transition-colors duration-500 dark:bg-gray-900">
      <HeaderGame />
      <MainGame />
      <Footer />
    </div>
  );
}
