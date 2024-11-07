import { m, useAnimation } from "framer-motion";
import { useSelector } from "react-redux";

import { SKINIMG } from "../../constants/skins.constants";

import s from "./GameCoin.module.scss";

import HorseGif from "../../assets/images/giphy.gif";
import HorseJPG from "../../assets/images/giphy.jpg";

// import HorseGif from "../../assets/images/abcd.gif";
// import HorseJPG from "../../assets/images/abc.jpg";

import React, { useState, useRef } from "react";
import classNames from "classnames";

export default function GameCoin({ handleClickCoin }) {
  const { energy, multitap, equipSkin } = useSelector((state) => state.user);
  //   const controls = useAnimation();

  //   const handleClick = async (e) => {
  //     if (energy - multitap <= 0) return;
  //     handleClickCoin(e);

  //     await controls.start({
  //       rotate: [0, 0, 5, -5, 0],
  //       scale: [1, 0.9, 0.93, 0.95, 1],
  //       transition: { duration: 0.4, repeat: 0 },
  //     });
  //   };

  //   return (
  //     <m.div
  //       className={s.coinWrapper}
  //       animate={controls}
  //       onTouchEnd={handleClick}
  //     >
  //       {/* <img src={SKINIMG[equipSkin - 1]} alt='silver' /> */}
  //     </m.div>
  //   );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const timeoutRef = useRef(null);
  const handleGifClick1 = (e) => {
    // e.preventDefault();
    clearTimeout(timeoutRef.current);
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 0);
    if (e.type == "click") handleClickCoin(e.clientX, e.clientY);
    if (e.type == "touchstart")
      handleClickCoin(e.touches[0].clientX, e.touches[0].clientY);
    timeoutRef.current = setTimeout(() => {
      setIsPlaying(false);
    }, 500);
  };
  return (
    <div className={s.gifcontainer}>
      <img
        src={isPlaying ? HorseGif : HorseJPG}
        alt="GIF"
        className={classNames(isLoaded ? s.gif : s.hidden)}
        onClick={handleGifClick1}
        onTouchStart={handleGifClick1}
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
    </div>
  );
}
