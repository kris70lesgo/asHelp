"use client"

import React, { useState, useEffect } from "react"
import { motion } from "motion/react"
import Aurora from "./Backgrounds/Aurora"
import { ContainerTextFlip } from "./ui/container-text-flip"

export const LoadingScreen: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <>
              <div className="absolute inset-0 z-0">
                    <Aurora
                      colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                      blend={0.5}
                      amplitude={1.0}
                      speed={0.5}
                    />
                  </div>
            <div className="flex h-screen justify-center items-center gap-6">

                <motion.div
                    initial={{ opacity: 0, y: 250 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="bg-transparent rounded-full p-8 text-cyan-800/75 text-5xl font-extrabold tracking-wider"
                >
                    <ContainerTextFlip
                                  interval={1000}
                                  words={["Sharpening pencils", "Making a todo", "Fetching Assignment sheets", "Almost there"]}
                                  className="text-xl xs:text-xl sm:text-2xl md:text-4xl ml-1 whitespace-nowrap backdrop-blur-xl"
                                />
                </motion.div>
            </div>
        </>
    )
}
