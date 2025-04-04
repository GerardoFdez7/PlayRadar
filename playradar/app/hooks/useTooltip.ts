import { useState, useEffect } from 'react';

const useTooltip = () => {
  const [activeTooltip, setActiveTooltip] = useState<{
    type: string;
    gameId: number;
  } | null>(null);

  useEffect(() => {
    if (activeTooltip) {
      const timer = setTimeout(() => setActiveTooltip(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [activeTooltip]);

  return { activeTooltip, setActiveTooltip };
};

export default useTooltip;
