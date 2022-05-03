import { useEffect, useState } from "react";

export default function useHandleResize() {
  const [videosPerPage, setVideosPerPage] = useState<number>(4);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  const countCards = (width: number) => {
    if (width > 1370) return 4;
    if (width > 1092) return 3;
    if (width > 768) return 2;
    return 1;
  };

  const handleResize = () => {
    const width = window.innerWidth;
    const cards = countCards(width);
    setVideosPerPage(cards);
  };

  return {
    videosPerPage,
  };
}
