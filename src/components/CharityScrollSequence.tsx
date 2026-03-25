import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

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
const FPS = 30;
// Target cinematic duration per transition in seconds
// Clamp so short transitions (17 frames) still take ≥2s and long ones (657 frames) take ≤5s
const MIN_TRANSITION_S = 2.0;
const MAX_TRANSITION_S = 5.0;

const frameToTime = (frame: number) => (frame - 1) / FPS;

const CharityScrollSequence = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showText, setShowText] = useState(true);
    const [videoReady, setVideoReady] = useState(false);

    const isAnimatingRef = useRef(false);
    const currentIndexRef = useRef(0);
    const lastNavTimeRef = useRef(0);
    const targetTimeRef = useRef(0);
    const stopCheckRafRef = useRef<number>(0);

    useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);

    // -----------------------------------------------------------------------
    // Canvas drawing — uses requestVideoFrameCallback (rVFC) when available.
    // rVFC fires exactly once per decoded video frame, so every frame of the
    // video gets painted to canvas — no skips, no duplicates.
    // Falls back to a standard RAF loop on older browsers.
    // -----------------------------------------------------------------------
    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const bgCanvas = bgCanvasRef.current;
        if (!video || !canvas) return;

        let rafId = 0;
        let stopped = false;

        const paintFrame = () => {
            if (stopped) return;

            const ctx = canvas.getContext('2d');
            if (ctx && video.readyState >= 2 && canvas.width > 0 && canvas.height > 0) {
                const { videoWidth: vw, videoHeight: vh } = video;
                const { width: cw, height: ch } = canvas;
                const ratio = Math.max(cw / vw, ch / vh);
                const cx = (cw - vw * ratio) / 2;
                const cy = (ch - vh * ratio) / 2;
                ctx.drawImage(video, 0, 0, vw, vh, cx, cy, vw * ratio, vh * ratio);

                // Blurry background for mobile
                if (bgCanvas) {
                    const bgCtx = bgCanvas.getContext('2d');
                    if (bgCtx) bgCtx.drawImage(video, 0, 0, bgCanvas.width, bgCanvas.height);
                }
            }

            // Schedule next paint
            if ('requestVideoFrameCallback' in video) {
                // Frame-accurate: fires exactly when the next video frame is ready
                (video as any).requestVideoFrameCallback(paintFrame);
            } else {
                // Fallback: standard RAF (may miss frames on slow devices but still works)
                rafId = requestAnimationFrame(paintFrame);
            }
        };

        if ('requestVideoFrameCallback' in video) {
            (video as any).requestVideoFrameCallback(paintFrame);
        } else {
            rafId = requestAnimationFrame(paintFrame);
        }

        return () => {
            stopped = true;
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    // -----------------------------------------------------------------------
    // Navigate: plays the video through every frame between current and target.
    // Uses a dynamic playback rate so the cinematic duration is always ~2-5s
    // regardless of how many frames need to play.
    // -----------------------------------------------------------------------
    const navigateTo = useCallback((targetIndex: number) => {
        const video = videoRef.current;
        if (!video) return;

        const clampedIdx = Math.max(0, Math.min(contentStops.length - 1, targetIndex));
        const targetTime = frameToTime(contentStops[clampedIdx].frame);
        const currentTime = video.currentTime;
        const span = Math.abs(targetTime - currentTime); // seconds of video content

        // If span is negligible (already there), just show the text
        if (span < 0.1) {
            setCurrentIndex(clampedIdx);
            setShowText(true);
            isAnimatingRef.current = false;
            return;
        }

        // Calculate playback rate so the transition duration is clamped to [MIN, MAX]
        // e.g.: 0.567s span → play at 0.28x for 2s (very slow, every frame visible)
        //       21.9s span  → play at 4.38x for 5s (fast but all frames shown)
        const desiredDuration = Math.min(MAX_TRANSITION_S, Math.max(MIN_TRANSITION_S, span));
        const rate = span / desiredDuration;
        const clampedRate = Math.max(0.1, Math.min(16, rate)); // browser limits playbackRate

        // Cancel any previous stop-check loop
        cancelAnimationFrame(stopCheckRafRef.current);

        setShowText(false);
        isAnimatingRef.current = true;
        targetTimeRef.current = targetTime;

        // If going backwards, we need to scrub currentTime first
        // (HTML video can only play() forward)
        if (targetTime < currentTime) {
            // Seek to the start of the range then play forward
            // This is rare (user scrolled up) — a brief seek then play is fine
            video.pause();
            video.currentTime = targetTime - 0.033; // 1 frame before target
            video.playbackRate = 1;
            video.addEventListener('seeked', () => {
                setCurrentIndex(clampedIdx);
                setShowText(true);
                isAnimatingRef.current = false;
            }, { once: true });
            return;
        }

        video.playbackRate = clampedRate;
        video.play().catch(() => {}); // ignore autoplay policy errors

        // Monitor playback — stop when we hit the target time
        const checkStop = () => {
            if (!video || video.paused) return;
            if (video.currentTime >= targetTime) {
                video.pause();
                video.currentTime = targetTime; // snap exactly to target frame
                video.playbackRate = 1;
                isAnimatingRef.current = false;
                setCurrentIndex(clampedIdx);
                setShowText(true);
            } else {
                stopCheckRafRef.current = requestAnimationFrame(checkStop);
            }
        };
        stopCheckRafRef.current = requestAnimationFrame(checkStop);
    }, []);

    // -----------------------------------------------------------------------
    // Input handlers — wheel, keyboard, touch
    // -----------------------------------------------------------------------
    const NAV_COOLDOWN_MS = 300;

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const tryNavigate = (direction: 'next' | 'prev') => {
            const now = Date.now();
            if (now - lastNavTimeRef.current < NAV_COOLDOWN_MS) return;
            // Allow new navigation even mid-animation (interrupts the current one)
            lastNavTimeRef.current = now;

            const idx = currentIndexRef.current;
            if (direction === 'next') {
                const nextIdx = idx + 1 >= contentStops.length ? 0 : idx + 1;
                currentIndexRef.current = nextIdx;
                navigateTo(nextIdx);
            } else {
                if (idx === 0) return;
                const prevIdx = idx - 1;
                currentIndexRef.current = prevIdx;
                navigateTo(prevIdx);
            }
        };

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 30) tryNavigate('next');
            else if (e.deltaY < -30) tryNavigate('prev');
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') tryNavigate('next');
            if (e.key === 'ArrowUp' || e.key === 'PageUp') tryNavigate('prev');
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
        const handleTouchEnd = (e: TouchEvent) => {
            const deltaY = touchStartY - e.changedTouches[0].clientY;
            if (deltaY > 40) tryNavigate('next');
            else if (deltaY < -40) tryNavigate('prev');
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
    }, [navigateTo]);

    // Canvas resize
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

    const activeContent = contentStops[currentIndex];

    const containerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 120 },
        visible: { 
            opacity: 1, scale: 1, y: 0,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delayChildren: 0.2, staggerChildren: 0.1 }
        },
        exit: { 
            opacity: 0, scale: 1.05, y: -120,
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

            {/* Hidden video — preloaded, muted, will be played forward through frames */}
            <video
                ref={videoRef}
                src="/charity_scroll.mp4"
                preload="auto"
                muted
                playsInline
                className="absolute opacity-0 pointer-events-none w-px h-px"
                onCanPlay={() => setVideoReady(true)}
            />

            {/* Loading state */}
            {!videoReady && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <p className="text-white/50 text-xs uppercase tracking-widest">Loading</p>
                    </div>
                </div>
            )}

            {/* Blurry background — mobile only */}
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
                    {showText && activeContent && videoReady && (
                        <motion.div
                            key={currentIndex}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full pointer-events-auto h-full md:h-auto"
                        >
                            <div 
                                className="bg-gradient-to-b from-black/85 via-black/80 to-black/95 md:from-black/80 md:via-black/60 md:to-black/80 md:backdrop-blur-xl p-6 md:p-16 rounded-[2rem] md:rounded-3xl border border-white/15 md:border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full relative overflow-y-auto overflow-x-hidden max-h-full"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
                                <div className="absolute inset-0 bg-primary/5 opacity-30 md:opacity-50 pointer-events-none mix-blend-overlay" />
                                
                                {activeContent.category && (
                                    <motion.p variants={itemVariants} className="tracking-[0.2em] md:tracking-[0.4em] text-primary uppercase text-[10px] md:text-sm font-semibold mb-3 md:mb-6 flex items-center justify-center gap-3 md:gap-4">
                                        <span className="w-6 md:w-8 h-[1px] bg-primary/50" />
                                        {activeContent.category}
                                        <span className="w-6 md:w-8 h-[1px] bg-primary/50" />
                                    </motion.p>
                                )}
                                
                                {currentIndex === 0 ? (
                                    <motion.h1 variants={itemVariants} className="font-serif text-white drop-shadow-2xl mb-3 md:mb-6 leading-[1.15] md:leading-[1.1] tracking-wide text-[28px] md:text-7xl font-bold">
                                        {activeContent.text}
                                    </motion.h1>
                                ) : (
                                    <motion.h2 variants={itemVariants} className="font-serif text-white drop-shadow-2xl mb-3 md:mb-6 leading-[1.15] md:leading-[1.1] tracking-wide text-[22px] md:text-5xl">
                                        {activeContent.text}
                                    </motion.h2>
                                )}
                                
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

            {/* Scroll indicator */}
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
