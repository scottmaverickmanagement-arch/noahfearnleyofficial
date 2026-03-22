import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, animate, useMotionValue, useMotionValueEvent, AnimatePresence, Variants } from 'framer-motion';

const contentStops = [
    { 
        frame: 1, 
        category: "Charity", 
        text: "Giving Back", 
        description: "Noah Fearnley is committed to using his platform to support causes close to his heart. Through partnerships with various charities, he aims to make a positive impact. To make a donation or get involved with these initiatives, please click the button below to reach our team.", 
        button: "Support Our Causes",
        link: "mailto:charity@noahfearnleyofficial.com"
    },
    { 
        frame: 18, 
        category: "Animal Wellness", 
        text: "Noah Fearnley is deeply committed to animal wellness, believing every creature deserves a loving home. Working alongside shelters and rescues.", 
        description: null, 
        button: null 
    },
    { 
        frame: 217, 
        category: "Animal Wellness", 
        text: "Together, we have rescued and rehabilitated countless animals. The journey involves dedicated care, medical attention, and safe fostering environments.", 
        description: null, 
        button: null 
    },
    { 
        frame: 427, 
        category: "Animal Wellness", 
        text: "Join us in our continuous partnership with Best Friends Animal Society to ensure every pet finds a family.", 
        description: null, 
        button: "Best Friends Animal Society", 
        link: "https://bestfriends.org/" 
    },
    { 
        frame: 675, 
        category: "Environmental Conservation", 
        text: "Protecting our oceans is vital for the future of our planet. Our environmental conservation efforts focus on cleanups and marine life protection.", 
        description: null, 
        button: null 
    },
    { 
        frame: 921, 
        category: "Environmental Conservation", 
        text: "By mobilizing communities, we've removed tons of plastic from beaches, restoring habitats and promoting sustainable practices globally.", 
        description: null, 
        button: null 
    },
    { 
        frame: 1057, 
        category: "Environmental Conservation", 
        text: "Help us safeguard the oceans by supporting Oceana's critical campaigns.", 
        description: null, 
        button: "Oceana.org", 
        link: "https://oceana.org/" 
    },
    { 
        frame: 1210, 
        category: "Art & Education", 
        text: "Art and education empower the next generation. We advocate for accessible creative programs in underfunded schools.", 
        description: null, 
        button: null 
    },
    { 
        frame: 1350, 
        category: "Art & Education", 
        text: "Our initiatives have provided supplies and scholarships to hundreds of students. Support local creativity.", 
        description: null, 
        button: "Arts for LA", 
        link: "https://www.artsforla.org/" 
    },
    { 
        frame: 1445, 
        category: "Children's Hospitals", 
        text: "Bringing hope and advanced care to children fighting severe illnesses. We believe in providing the best medical support and comfort.", 
        description: null, 
        button: null 
    },
    { 
        frame: 1600, 
        category: "Children's Hospitals", 
        text: "Our partnership helps fund life-saving treatments and research. Be a part of the miracle.", 
        description: null, 
        button: "Lucile Packard Children's Hospital", 
        link: "https://www.stanfordchildrens.org/" 
    }
];

const TOTAL_FRAMES = 1770;
const ANIMATION_DURATION = 4.0; // Seconds spent moving between frames
const CharityScrollSequence = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);
    
    // Request tracking to prevent out-of-order painting without skipping delayed frames
    const latestRequestIdRef = useRef(0);
    const lastDrawnRequestIdRef = useRef(-1);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const motionFrame = useMotionValue(1);
    const [renderedFrame, setRenderedFrame] = useState(1);
    
    // RAM Management - LRU Sliding Cache
    const MAX_CACHE_SIZE = 40; 
    const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());

    const preloadFrames = useCallback((current: number) => {
        // Enforce max memory cache to stop iOS crashes
        if (imageCache.current.size > MAX_CACHE_SIZE) {
            Array.from(imageCache.current.keys()).forEach((key) => {
                if (Math.abs(key - current) > MAX_CACHE_SIZE / 2) {
                    const img = imageCache.current.get(key);
                    if (img) img.src = ""; // Force disconnect source to help GC recycle RAM
                    imageCache.current.delete(key);
                }
            });
        }

        // Look-ahead fetch the next 15 frames + 5 backwards frames
        const preloadAhead = 15;
        const preloadBehind = 5;

        for (let i = Math.max(1, current - preloadBehind); i <= Math.min(TOTAL_FRAMES, current + preloadAhead); i++) {
            if (!imageCache.current.has(i)) {
                const img = new Image();
                img.decoding = 'async';
                img.src = `/frames_optimized/frame-${i}.webp`;
                imageCache.current.set(i, img);
            }
        }
    }, []);

    useMotionValueEvent(motionFrame, "change", (latest) => {
        const finalFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(latest)));
        setRenderedFrame(finalFrame);
        // Hint the preloader immediately to fetch frames slightly before React unloads the DOM render cycle
        preloadFrames(finalFrame); 
    });

    const goToNext = useCallback(() => {
        setIsAnimating(true);
        const nextIndex = currentIndex + 1;
        
        if (nextIndex >= contentStops.length) {
            // Animate to end of sequence, then silently wrap back to 0
            animate(motionFrame, TOTAL_FRAMES, {
                duration: ANIMATION_DURATION,
                ease: "easeInOut",
                onComplete: () => {
                    motionFrame.set(1);
                    setCurrentIndex(0);
                    setIsAnimating(false);
                }
            });
            setCurrentIndex(contentStops.length); // hides text
        } else {
            animate(motionFrame, contentStops[nextIndex].frame, {
                duration: ANIMATION_DURATION,
                ease: "easeInOut",
                onComplete: () => {
                    setCurrentIndex(nextIndex);
                    setIsAnimating(false);
                }
            });
            setCurrentIndex(nextIndex); // hides text early for the transition
        }
    }, [currentIndex, motionFrame]);

    const goToPrev = useCallback(() => {
        if (currentIndex === 0) return; // Prevent going backward past start
        
        setIsAnimating(true);
        const prevIndex = currentIndex - 1;
        
        animate(motionFrame, contentStops[prevIndex].frame, {
            duration: ANIMATION_DURATION,
            ease: "easeInOut",
            onComplete: () => {
                setCurrentIndex(prevIndex);
                setIsAnimating(false);
            }
        });
        setCurrentIndex(prevIndex); // hides text early before transition resolves
    }, [currentIndex, motionFrame]);

    // Input handlers
    useEffect(() => {
        // Prevent default scrolling globally while actively mounted
        document.body.style.overflow = 'hidden';

        const handleWheel = (e: WheelEvent) => {
            if (isAnimating) return;
            if (e.deltaY > 30) {
                goToNext();
            } else if (e.deltaY < -30) {
                goToPrev();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isAnimating) return;
            if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') goToNext();
            if (e.key === 'ArrowUp' || e.key === 'PageUp') goToPrev();
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            if (isAnimating) return;
            const deltaY = touchStartY - e.touches[0].clientY;
            if (deltaY > 40) {
                goToNext();
                touchStartY = e.touches[0].clientY;
            } else if (deltaY < -40) {
                goToPrev();
                touchStartY = e.touches[0].clientY;
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isAnimating, goToNext, goToPrev]);

    // Canvas drawing effect
    useEffect(() => {
        const canvas = canvasRef.current;
        const bgCanvas = bgCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        latestRequestIdRef.current += 1;
        const thisRequestId = latestRequestIdRef.current;

        // Ensure the frame is in the cache mapping
        preloadFrames(renderedFrame);
        const img = imageCache.current.get(renderedFrame);
        if (!img) return;
        
        const drawRoutine = () => {
            // Only discard this frame if a strictly newer requested frame has ALREADY been drawn.
            // This prevents screen tearing (out of order), but allows slightly delayed frames
            // to still draw, completely fixing the frozen screen/stuttering effect!
            if (thisRequestId < lastDrawnRequestIdRef.current) return;
            lastDrawnRequestIdRef.current = thisRequestId;

            // Draw main foreground canvas
            const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;  
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height,
                          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
                          
            // Draw heavily downsampled silhouette canvas for mobile background
            if (bgCanvas) {
                const bgCtx = bgCanvas.getContext('2d');
                if (bgCtx) {
                    // Mobile background doesn't need scaling math, we just stretch it massively across the tiny bounding box, let CSS blur do the rest
                    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
                    bgCtx.drawImage(img, 0, 0, img.width, img.height,
                                    0, 0, bgCanvas.width, bgCanvas.height);
                }
            }
        };

        if (img.complete) {
            drawRoutine();
        } else {
            img.onload = drawRoutine;
        }
    }, [renderedFrame, preloadFrames]);

    // Canvas robust resize handling
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && canvasContainerRef.current) {
                const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 to save performance
                const rect = canvasContainerRef.current.getBoundingClientRect();
                
                // Map the internal canvas resolution to the display's exact physical pixels for its container
                canvasRef.current.width = rect.width * dpr;
                canvasRef.current.height = rect.height * dpr;
                
                // Keep the blurry silhouette at a strictly reduced micro-resolution to aggressively save mobile GPU
                // A 16x32 canvas stretched via CSS is natively ultra-blurry and completely eliminates GPU strain!
                if (bgCanvasRef.current) {
                    bgCanvasRef.current.width = 16;
                    bgCanvasRef.current.height = 32;
                }
                
                setRenderedFrame(prev => prev); // triggers re-draw
            }
        };
        // wait for DOM paint to finish then size correctly
        requestAnimationFrame(handleResize);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const activeContent = contentStops[currentIndex];

    // Animation Variants for Text Parallax Flow
    const containerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 120 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1], // Custom bouncy ease out
                delayChildren: 0.2, // Stagger children slightly
                staggerChildren: 0.1
            }
        },
        exit: { 
            opacity: 0, 
            scale: 1.05, 
            y: -120, // Continues flowing upwards when exiting! Deep parallax.
            transition: { duration: 0.8, ease: "easeInOut" } 
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-50 flex flex-col md:block">
            {/* Background Blurry Silhouette for Mobile Bottom Half */}
            <canvas 
                ref={bgCanvasRef}
                className="absolute inset-0 w-full h-full opacity-[0.55] scale-125 z-0 md:hidden pointer-events-none transform-gpu"
                style={{ imageRendering: 'pixelated', filter: 'blur(20px)' }}
            />
            
            {/* The Animated Frame Canvas (Top view on mobile, Fullscreen view on desktop) */}
            <div 
                ref={canvasContainerRef} 
                className="relative w-full h-[45vh] md:h-full md:absolute md:inset-0 z-0 bg-transparent flex justify-center overflow-hidden shrink-0 shadow-[0_15px_60px_rgba(0,0,0,0.8)] md:shadow-none"
            >
                <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full object-cover md:opacity-90 md:mix-blend-lighten pointer-events-none"
                />
            </div>
            
            {/* Gradual Introduction Overlay Content (Scrollable bottom view on mobile) */}
            <div className="relative w-full h-[55vh] md:h-full md:absolute md:inset-0 z-10 flex flex-col justify-start md:justify-center items-center px-3 md:px-8 py-4 md:py-0 overflow-hidden pointer-events-none shrink-0 border-t border-white/5 md:border-t-0">
                <AnimatePresence mode="wait">
                    {!isAnimating && activeContent && (
                        <motion.div
                            key={currentIndex}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full pointer-events-auto h-full md:h-auto"
                        >
                            <div 
                                className="bg-gradient-to-b from-white/10 via-black/80 to-black/95 md:from-black/80 md:via-black/60 md:to-black/80 backdrop-blur-[35px] md:backdrop-blur-xl p-6 md:p-16 rounded-[2rem] md:rounded-3xl border border-white/20 md:border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] md:shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full relative overflow-y-auto overflow-x-hidden max-h-full"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
                                <div className="absolute inset-0 bg-primary/5 opacity-30 md:opacity-50 pointer-events-none mix-blend-overlay"></div>
                                
                                {activeContent.category && (
                                    <motion.p variants={itemVariants} className="tracking-[0.2em] md:tracking-[0.4em] text-primary uppercase text-[10px] md:text-sm font-semibold mb-3 md:mb-6 flex items-center justify-center gap-3 md:gap-4">
                                        <span className="w-6 md:w-8 h-[1px] bg-primary/50"></span>
                                        {activeContent.category}
                                        <span className="w-6 md:w-8 h-[1px] bg-primary/50"></span>
                                    </motion.p>
                                )}
                                
                                <motion.h2 variants={itemVariants} className={`font-serif text-white drop-shadow-2xl mb-3 md:mb-6 leading-[1.15] md:leading-[1.1] tracking-wide ${currentIndex === 0 ? 'text-[28px] md:text-7xl font-bold' : 'text-[22px] md:text-5xl'}`}>
                                    {activeContent.text}
                                </motion.h2>
                                
                                {activeContent.description && (
                                    <motion.p variants={itemVariants} className="text-muted-foreground/90 text-[13px] md:text-xl font-light mb-5 md:mb-8 mx-auto max-w-2xl leading-[1.6] md:leading-relaxed">
                                        {activeContent.description}
                                    </motion.p>
                                )}
                                
                                {activeContent.button && (
                                    <motion.a 
                                        variants={itemVariants}
                                        href={activeContent.link || "#"} 
                                        target={activeContent.link !== "#" ? "_blank" : "_self"} 
                                        rel="noreferrer"
                                        className="inline-block mt-1 md:mt-4 px-6 md:px-10 py-[10px] md:py-4 bg-primary text-black font-bold rounded-full hover:scale-105 hover:bg-white transition-all duration-300 pointer-events-auto uppercase text-[10px] md:text-sm tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.1)] md:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                    >
                                        {activeContent.button}
                                    </motion.a>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Scroll Indicator */}
            <div className="fixed bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-[0.4] md:opacity-50 z-20">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white mb-2">Scroll</span>
                <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-[1px] h-6 md:h-12 bg-gradient-to-b from-white to-transparent"
                />
            </div>
        </div>
    );
};

export default CharityScrollSequence;
