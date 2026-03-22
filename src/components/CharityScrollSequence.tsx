import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, animate, useMotionValue, AnimatePresence, Variants } from 'framer-motion';

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
const ANIMATION_DURATION = 4.0; // Cinematic pace — preserved as requested

const CharityScrollSequence = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);

    // Track the currently displayed index and whether text should be hidden (mid-transition)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showText, setShowText] = useState(true);

    const motionFrame = useMotionValue(1);

    // --- KEY FIX #1: Use a ref to track active animation so we can CANCEL it ---
    // This allows any swipe/scroll to interrupt a running animation and jump straight
    // to the next stop — solving the "6-8 swipes barely moves" mobile problem.
    const activeAnimationRef = useRef<{ stop: () => void } | null>(null);
    
    // Pending navigation ref — queues a next/prev action if one is mid-flight
    const pendingNavRef = useRef<'next' | 'prev' | null>(null);
    const isAnimatingRef = useRef(false);

    // --- KEY FIX #2: Large RAM cache (150 frames) and aggressive lookahead ---
    const MAX_CACHE_SIZE = 150;
    const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());

    // Evict frames far from 'current', keep a 150-frame sliding window
    const evictCache = useCallback((current: number) => {
        if (imageCache.current.size > MAX_CACHE_SIZE) {
            for (const [key, img] of imageCache.current.entries()) {
                if (Math.abs(key - current) > MAX_CACHE_SIZE / 2) {
                    img.src = '';
                    imageCache.current.delete(key);
                }
            }
        }
    }, []);

    // Standard rolling preload — always look 30 frames ahead and 10 behind
    const preloadAround = useCallback((current: number) => {
        evictCache(current);
        const ahead = 30;
        const behind = 10;
        for (let i = Math.max(1, current - behind); i <= Math.min(TOTAL_FRAMES, current + ahead); i++) {
            if (!imageCache.current.has(i)) {
                const img = new Image();
                img.decoding = 'async';
                img.src = `/frames_optimized/frame-${i}.webp`;
                imageCache.current.set(i, img);
            }
        }
    }, [evictCache]);

    // --- KEY FIX #3: Destination burst preload —
    // When navigation is triggered, immediately fire off loads for the ENTIRE
    // target frame range so frames are ready before the animation reaches them.
    const preloadDestinationRange = useCallback((from: number, to: number) => {
        const start = Math.min(from, to);
        const end = Math.max(from, to);
        // Load in batches of 60 spaced across the range — covers keyframes without
        // hammering the network with all 700+ at once
        const step = Math.max(1, Math.floor((end - start) / 60));
        for (let i = start; i <= end; i += step) {
            if (!imageCache.current.has(i)) {
                const img = new Image();
                img.decoding = 'async';
                img.src = `/frames_optimized/frame-${i}.webp`;
                imageCache.current.set(i, img);
            }
        }
    }, []);

    // --- KEY FIX #4: requestAnimationFrame loop for canvas drawing ---
    // Replaces the old useMotionValueEvent → setState → useEffect chain.
    // This eliminates hundreds of React re-renders during every animation,
    // letting the canvas update at full 60fps with zero React overhead.
    useEffect(() => {
        let rafId: number;
        let lastDrawnFrame = -1;

        const loop = () => {
            const canvas = canvasRef.current;
            const bgCanvas = bgCanvasRef.current;
            if (!canvas) { rafId = requestAnimationFrame(loop); return; }

            const ctx = canvas.getContext('2d');
            if (!ctx) { rafId = requestAnimationFrame(loop); return; }

            const rawFrame = motionFrame.get();
            const frame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(rawFrame)));

            // Only redraw if the frame number has actually changed
            if (frame !== lastDrawnFrame) {
                lastDrawnFrame = frame;
                preloadAround(frame);

                const img = imageCache.current.get(frame);
                if (img && img.complete && img.naturalWidth > 0) {
                    const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
                    const cx = (canvas.width - img.width * ratio) / 2;
                    const cy = (canvas.height - img.height * ratio) / 2;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);

                    if (bgCanvas) {
                        const bgCtx = bgCanvas.getContext('2d');
                        if (bgCtx) {
                            bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
                            bgCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, bgCanvas.width, bgCanvas.height);
                        }
                    }
                } else if (img && !img.complete) {
                    // Frame not yet loaded — attach onload so it draws as soon as ready
                    img.onload = () => { lastDrawnFrame = -1; }; // Reset so loop redraws on next tick
                }
            }

            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId);
    }, [preloadAround]);

    // Core navigation logic — with interruption support
    const navigateTo = useCallback((targetIndex: number) => {
        const clampedIndex = Math.max(0, Math.min(contentStops.length - 1, targetIndex));
        const targetFrame = contentStops[clampedIndex].frame;
        const currentFrame = Math.round(motionFrame.get());

        // Cancel any in-flight animation immediately
        if (activeAnimationRef.current) {
            activeAnimationRef.current.stop();
            activeAnimationRef.current = null;
        }

        // Burst-preload target range so frames are ready
        preloadDestinationRange(currentFrame, targetFrame);

        setShowText(false); // Hide text during transition

        isAnimatingRef.current = true;
        const controls = animate(motionFrame, targetFrame, {
            duration: ANIMATION_DURATION,
            ease: "easeInOut",
            onComplete: () => {
                isAnimatingRef.current = false;
                activeAnimationRef.current = null;
                setCurrentIndex(clampedIndex);
                setShowText(true);

                // Process any queued navigation that arrived while we were animating
                if (pendingNavRef.current) {
                    const pending = pendingNavRef.current;
                    pendingNavRef.current = null;
                    setCurrentIndex(prev => {
                        const nextIdx = pending === 'next' 
                            ? Math.min(contentStops.length - 1, prev + 1)
                            : Math.max(0, prev - 1);
                        // schedule the next navigate on next tick so state is flushed
                        setTimeout(() => navigateTo(nextIdx), 0);
                        return prev;
                    });
                }
            }
        });

        activeAnimationRef.current = controls;
    }, [motionFrame, preloadDestinationRange]);

    const goToNext = useCallback(() => {
        setCurrentIndex(prev => {
            const nextIdx = prev + 1 >= contentStops.length ? 0 : prev + 1;
            // If animating, queue it — the onComplete handler will pick it up
            if (isAnimatingRef.current) {
                pendingNavRef.current = 'next';
                return prev;
            }
            navigateTo(nextIdx);
            return prev; // actual state update happens in navigateTo's onComplete
        });
    }, [navigateTo]);

    const goToPrev = useCallback(() => {
        setCurrentIndex(prev => {
            if (prev === 0) return prev;
            const prevIdx = prev - 1;
            if (isAnimatingRef.current) {
                pendingNavRef.current = 'prev';
                return prev;
            }
            navigateTo(prevIdx);
            return prev;
        });
    }, [navigateTo]);

    // Input handlers
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 30) goToNext();
            else if (e.deltaY < -30) goToPrev();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') goToNext();
            if (e.key === 'ArrowUp' || e.key === 'PageUp') goToPrev();
        };

        let touchStartY = 0;
        let lastTouchTime = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const now = Date.now();
            // Debounce: ignore taps faster than 300ms apart to prevent double-firing
            if (now - lastTouchTime < 300) return;
            const deltaY = touchStartY - e.changedTouches[0].clientY;
            if (deltaY > 40) {
                lastTouchTime = now;
                goToNext();
            } else if (deltaY < -40) {
                lastTouchTime = now;
                goToPrev();
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [goToNext, goToPrev]);

    // Canvas resize handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && canvasContainerRef.current) {
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                const rect = canvasContainerRef.current.getBoundingClientRect();
                canvasRef.current.width = rect.width * dpr;
                canvasRef.current.height = rect.height * dpr;
                if (bgCanvasRef.current) {
                    bgCanvasRef.current.width = 16;
                    bgCanvasRef.current.height = 32;
                }
            }
        };
        requestAnimationFrame(handleResize);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Boot: preload the first 30 frames immediately on mount
    useEffect(() => {
        preloadAround(1);
    }, [preloadAround]);

    const activeContent = contentStops[currentIndex];

    const containerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 120 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1],
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        },
        exit: { 
            opacity: 0, 
            scale: 1.05, 
            y: -120,
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
            {/* Background blurry silhouette for mobile */}
            <canvas 
                ref={bgCanvasRef}
                className="absolute inset-0 w-full h-full opacity-[0.55] scale-125 z-0 md:hidden pointer-events-none transform-gpu"
                style={{ imageRendering: 'pixelated', filter: 'blur(20px)' }}
            />
            
            {/* Main frame canvas */}
            <div 
                ref={canvasContainerRef} 
                className="relative w-full h-[45vh] md:h-full md:absolute md:inset-0 z-0 bg-transparent flex justify-center overflow-hidden shrink-0 shadow-[0_15px_60px_rgba(0,0,0,0.8)] md:shadow-none"
            >
                <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full object-cover md:opacity-90 md:mix-blend-lighten pointer-events-none transform-gpu"
                />
            </div>
            
            {/* Text overlay */}
            <div className="relative w-full h-[55vh] md:h-full md:absolute md:inset-0 z-10 flex flex-col justify-start md:justify-center items-center px-3 md:px-8 py-4 md:py-0 overflow-hidden pointer-events-none shrink-0 border-t border-white/5 md:border-t-0">
                <AnimatePresence mode="wait">
                    {showText && activeContent && (
                        <motion.div
                            key={currentIndex}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full pointer-events-auto h-full md:h-auto"
                        >
                            <div 
                                className={[
                                    // --- KEY FIX #5: Remove backdrop-blur on mobile — huge GPU saving ---
                                    // Mobile: solid dark background (no blur, no composite layers)
                                    // Desktop: keep the premium glass blur effect
                                    "bg-gradient-to-b from-black/85 via-black/80 to-black/95",
                                    "md:bg-gradient-to-b md:from-black/80 md:via-black/60 md:to-black/80",
                                    "md:backdrop-blur-xl",
                                    "p-6 md:p-16 rounded-[2rem] md:rounded-3xl",
                                    "border border-white/15 md:border-white/20",
                                    "shadow-[0_0_50px_rgba(0,0,0,0.8)]",
                                    "w-full relative overflow-y-auto overflow-x-hidden max-h-full"
                                ].join(' ')}
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
