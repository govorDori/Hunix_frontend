import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// CustomCursor komponens
export const CustomCursor = ({ cursorType }) => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    //Valós kurzor lekövetési sebesség
    const springConfig = { damping: 20, stiffness: 800 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16); // A cursor középre igazítása
            cursorY.set(e.clientY - 16);
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY]);

    // Cursor settings méret / szín hover esetén
    const cursorSize = cursorType === "hover" ? 40 : 32;
    const cursorColor = cursorType === "hover" ? "00FF1E" : "rgba(0, 0, 0, 0.2)";

    return (
        <motion.div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                x: cursorXSpring,
                y: cursorYSpring,
                width: cursorSize,
                height: cursorSize,
                backgroundColor: cursorColor,
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 9999,
            }}
            whileHover={{ scale: 1.2 }} // Animáció hover esetén
            whileTap={{ scale: 0.8 }} // Animáció kattintás esetén
        />
    );
};