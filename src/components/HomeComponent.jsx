import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion';
import videoUrl from '../assets/video/Community of Champions.mp4'

const HomeComponent = () => {

    const texts = useMemo(
        () => [
          "The Community Of Champions_",
          "Earn Your Rank_",
        ],
        []
      );

      const [displayedText, setDisplayedText] = useState("");
      const [currentTextIndex, setCurrentTextIndex] = useState(0);
      const [isDeleting, setIsDeleting] = useState(false);
      const [charIndex, setCharIndex] = useState(0);
      const [showCursor, setShowCursor] = useState(true);


      useEffect(() => {
        const handleTyping = () => {
          const currentText = texts[currentTextIndex];
          if (isDeleting) {
            if (charIndex > 0) {
              setDisplayedText(currentText.substring(0, charIndex - 1));
              setCharIndex(charIndex - 1);
            } else {
              setIsDeleting(false);
              setCurrentTextIndex((currentTextIndex + 1) % texts.length);
            }
          } else {
            if (charIndex < currentText.length) {
              setDisplayedText(currentText.substring(0, charIndex + 1));
              setCharIndex(charIndex + 1);
            } else {
              setTimeout(() => setIsDeleting(true), 2000);
            }
          }
        };
    
        const typingSpeed = isDeleting ? 50 : 150;
        const timer = setTimeout(handleTyping, typingSpeed);
    
        return () => clearTimeout(timer);
      }, [displayedText, isDeleting, charIndex, currentTextIndex, texts]);

      useEffect(() => {
        const cursorInterval = setInterval(() => {
          setShowCursor((prev) => !prev);
        }, 500);
    
        return () => clearInterval(cursorInterval);
      }, []);


  return (
    <div className='h-[469px]  relative top-[170px] w-[100%] flex items-center justify-center'>
      {/* <h1 className='text-white text-homePageHeadingSize font-bold'>Earn your Rank</h1> */}
      <motion.h1
              id="heading1"
              className="sm:text-5xl md:text-6xl leading-tight text-[30px] font-bold "
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <span className="font-FIra cursor-pointer">
                <span className="typing-effect">
                  <span className="text-white">{displayedText}
                  <motion.span
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-white"
                    >
                    _
                    </motion.span>
                  </span>
                </span>
              </span>
            </motion.h1>
        {/* <video className='w-full h-full object-cover ' src={videoUrl}  autoPlay loop muted ></video> */}
        
    </div>
  )
}

export default HomeComponent
