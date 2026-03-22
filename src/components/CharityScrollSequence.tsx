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
const TOTAL_DURATION = TOTAL_FRAMES / FPS; // ~59s

// Cinematic easing — slow in, slow out, with a hold in the middle
// This gives a film-like feel even though it's all driven by video scrubbing
const CINEMATIC_DURATION_MS = 4000; // 4 seconds, matching old feel

// Convert frame number (1-indexed) to video time in seconds
const frameToTime = (frame: number) => (frame - 1) / FPS;

const CharityScrollSequence = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showText, setShowText] = useState(true);
    const [videoReady, setVideoReady] = useState(false);

    // Animation state — uses RAF lerp, not framer-motion, for zero-overhead scrubbing
    const animStateRef = useRef({
        isAnimating: false,
        startTime: 0,
        fromTime: 0,
        toTime: 0,
        duration: CINEMATIC_DURATION_MS,
        onComplete: null as (() => void) | null,
    });

    // Cinematic easing function (cubic ease in-out)
    const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // --- RAF loop: draws video frame to canvas every tick ---
    useEffect(() => {
        let rafId: number;
        const anim = animStateRef.current;

        const loop = (timestamp: number) => {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const bgCanvas = bgCanvasRef.current;

            // Drive animation — lerp video.currentTime toward target
            if (anim.isAnimating) {
                const elapsed = timestamp - anim.startTime;
                const progress = Math.min(elapsed / anim.duration, 1);
                const eased = easeInOutCubic(progress);
                const newTime = anim.fromTime + (anim.toTime - anim.fromTime) * eased;

                if (video) {
                    video.currentTime = newTime;
                }

                if (progress >= 1) {
                    anim.isAnimating = false;
                    if (anim.onComplete) {
                        anim.onComplete();
                        anim.onComplete = null;
                    }
                }
            }

            // Draw current video frame to canvas
            if (video && canvas && video.readyState >= 2) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    const ratio = Math.max(canvas.width / video.videoWidth, canvas.height / video.videoHeight);
                    const cx = (canvas.width - video.videoWidth * ratio) / 2;
                    const cy = (canvas.height - video.videoHeight * ratio) / 2;
                    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
                        cx, cy, video.videoWidth * ratio, video.videoHeight * ratio);

                    // Draw blurry background for mobile
                    if (bgCanvas) {
                        const bgCtx = bgCanvas.getContext('2d');
                        if (bgCtx) {
                            bgCtx.drawImage(video, 0, 0, bgCanvas.width, bgCanvas.height);
                        }
                    }
                }
            }

            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId);
    }, []);

    // Navigate to a content stop index with cinematic animation
    const navigateTo = useCallback((targetIndex: number, fromIndex: number) => {
        const video = videoRef.current;
        if (!video) return;

        const clampedIndex = Math.max(0, Math.min(contentStops.length - 1, targetIndex));
        const targetTime = frameToTime(contentStops[clampedIndex].frame);
        const fromTime = video.currentTime;

        setShowText(false);

        // Cancel any running animation and start new one
        const anim = animStateRef.current;
        anim.isAnimating = true;
        anim.startTime = performance.now();
        anim.fromTime = fromTime;
        anim.toTime = targetTime;
        anim.duration = CINEMATIC_DURATION_MS;
        anim.onComplete = () => {
            setCurrentIndex(clampedIndex);
            setShowText(true);
        };
    }, []);

    // Touch/scroll navigation — note: NOT blocked during animation
    // Swipes always accepted and cancel the current animation
    const currentIndexRef = useRef(0);
    useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);

    const lastNavTimeRef = useRef(0);
    const NAV_COOLDOWN_MS = 400; // Prevent rapid-fire double triggers

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const tryNavigate = (direction: 'next' | 'prev') => {
            const now = Date.now();
            if (now - lastNavTimeRef.current < NAV_COOLDOWN_MS) return;
            lastNavTimeRef.current = now;

            const idx = currentIndexRef.current;
            if (direction === 'next') {
                const nextIdx = idx + 1 >= contentStops.length ? 0 : idx + 1;
                navigateTo(nextIdx, idx);
                currentIndexRef.current = nextIdx; // track optimistically so rapid swipes chain
            } else {
                if (idx === 0) return;
                navigateTo(idx - 1, idx);
                currentIndexRef.current = idx - 1;
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
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
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

            {/* Hidden video element — the browser buffers this automatically */}
            <video
                ref={videoRef}
                src="/charity_scroll.mp4"
                preload="auto"
                muted
                playsInline
                className="absolute opacity-0 pointer-events-none w-px h-px"
                onCanPlay={() => setVideoReady(true)}
            />

            {/* Loading overlay — shown until video is buffered enough to play */}
            {!videoReady && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <p className="text-white/50 text-xs uppercase tracking-widest">Loading</p>
                    </div>
                </div>
            )}

            {/* Background blurry silhouette — mobile only */}
            <canvas 
                ref={bgCanvasRef}
                className="absolute inset-0 w-full h-full opacity-[0.55] scale-125 z-0 md:hidden pointer-events-none transform-gpu"
                style={{ imageRendering: 'pixelated', filter: 'blur(20px)' }}
            />
            
            {/* Main canvas */}
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
                                className="bg-gradient-to-b from-black/85 via-black/80 to-black/95 md:bg-gradient-to-b md:from-black/80 md:via-black/60 md:to-black/80 md:backdrop-blur-xl p-6 md:p-16 rounded-[2rem] md:rounded-3xl border border-white/15 md:border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full relative overflow-y-auto overflow-x-hidden max-h-full"
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
