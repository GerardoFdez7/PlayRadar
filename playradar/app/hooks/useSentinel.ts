import { useEffect, useRef } from "react";

export default function useSentinel(
  loadMore: () => void,
  loadMoreSearch: () => void,
  searchTerm: string
) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Detect if the user is in the end of the page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (searchTerm.trim()) {
            // If searching, load more search results
            loadMoreSearch();
          } else {
            // If not, load more games (normal view)
            loadMore();
          }
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.0,
      }
    );

    // Save the position of the sentinel 
    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }
    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [loadMore, loadMoreSearch, searchTerm]);

  return sentinelRef;
}
