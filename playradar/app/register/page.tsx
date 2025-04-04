import HeaderAuth from '@/layout/HeaderAuth';
import MainRegister from '@/components/layout/MainRegister';
import Footer from '@/layout/Footer';

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-300 dark:bg-gray-900 transition-colors duration-500">
      <HeaderAuth />
      <MainRegister />
      <Footer />
    </div>
  );
}
