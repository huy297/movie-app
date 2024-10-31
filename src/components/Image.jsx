import { useState, useEffect } from "react";
const ImageComponent = ({ src, width, height, className, key }) => {
  const [currentSrc, setCurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=Loading`,
  );

  useEffect(() => {
    const img = new Image();
    if (src) {
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
      };
      return;
    }
    setCurrentSrc(`https://placehold.co/${width}x${height}?text=No Image`);  
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <img
      className={currentSrc === src ||!src ? className : `${className} blur-md`}
      width={width}
      height={height}
      src={currentSrc}
      {...(key ? { key: key } : {})}
    />
  );
};

export default ImageComponent;
