import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { motion } from 'framer-motion';

const HomeComponent = () => {

    const texts = useMemo(
        () => [
          "The Community Of Champions",
          "Earn Your Rank",
        ],
        []
      );

      const [displayedText, setDisplayedText] = useState("");
      const [currentTextIndex, setCurrentTextIndex] = useState(0);
      const [isDeleting, setIsDeleting] = useState(false);
      const [charIndex, setCharIndex] = useState(0);
      const [showCursor, setShowCursor] = useState(true);

      const handleTyping = useCallback(() => {
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
      }, [charIndex, currentTextIndex, isDeleting, texts]);

      useEffect(() => {
        const typingSpeed = isDeleting ? 50 : 150;
        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
      }, [handleTyping, isDeleting]);

      useEffect(() => {
        const cursorInterval = setInterval(() => {
          setShowCursor((prev) => !prev);
        }, 500);
    
        return () => clearInterval(cursorInterval);
      }, []);


  return (
    <section 
      className='h-[300px] sm:h-[400px] md:h-[469px] relative top-[170px] w-full flex items-center justify-center'
      aria-label="Main headline"
    >
      <div className="w-full max-w-[1200px] px-4 flex justify-center items-center">
        <motion.h1
          id="heading1"
          className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl leading-tight font-bold text-center mx-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="font-FIra">
            <span className="typing-effect">
              <span className="text-white">{displayedText}</span>
              <motion.span
                animate={{ opacity: showCursor ? 1 : 0 }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-white"
                aria-hidden="true"
              >
                _
              </motion.span>
            </span>
          </span>
        </motion.h1>
      </div>
    </section>
  )
}

export default React.memo(HomeComponent)
