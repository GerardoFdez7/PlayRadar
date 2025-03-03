"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LoadingAnimationProps {
  className?: string;
  size?: number;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  className = "",
  size = 50,
}) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`w-${size} h-${size}`}>
        <DotLottieReact
          src="https://lottie.host/7b4dd0bd-fedc-41a6-b542-8d7c1950999a/3fmNE4stxF.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default LoadingAnimation;