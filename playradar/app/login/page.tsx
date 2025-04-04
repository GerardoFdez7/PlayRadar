import MainLogin from '@/components/layout/MainLogin';
import HeaderAuth from '@/layout/HeaderAuth';
import Footer from '@/layout/Footer';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center flex-1 bg-gray-300 dark:bg-gray-900 transition-colors duration-500">
      <HeaderAuth />
      <MainLogin />
      <Footer />
    </div>
  );
}
