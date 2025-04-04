import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useTheme } from 'next-themes';

export const LoaderSmall = () => {
  const theme = useTheme();
  return (
    <DotLottieReact
      src="https://lottie.host/84c67050-0fa0-46df-9503-c19115f98581/lKZMzJst3H.lottie"
      loop
      autoplay
      themeId={theme.theme === 'light' ? 'Dark' : undefined}
      className="w-16 h-16"
    />
  );
};

export default LoaderSmall;
