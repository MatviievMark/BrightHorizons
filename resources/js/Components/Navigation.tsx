import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface NavigationProps {
    className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuItemsRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const collapsedNavRef = useRef<HTMLDivElement>(null);
    const expandedNavRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            
            const tl = gsap.timeline();
            
            // Fade out hamburger
            tl.to(hamburgerRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in'
            })
            
            // Animate backdrop
            .to(backdropRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            }, "-=0.1")
            
            // Expand the collapsed nav into full menu
            .to(collapsedNavRef.current, {
                height: 'auto',
                borderRadius: '2rem',
                paddingTop: '0',
                paddingBottom: '2rem',
                duration: 0.4,
                ease: 'power2.inOut'
            }, "-=0.2")
            
            // Show close button
            .to(closeButtonRef.current, {
                opacity: 1,
                duration: 0.2,
                ease: 'power2.out'
            })
            
            // Animate menu items with stagger
            .fromTo(menuItemsRef.current?.children || [],
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: 'power2.out'
                }
            );

        } else {
            const tl = gsap.timeline();
            
            // First hide menu items
            tl.to(menuItemsRef.current?.children || [], {
                opacity: 0,
                y: 20,
                duration: 0.2,
                stagger: 0.05,
                ease: 'power2.in'
            })
            
            // Hide close button
            .to(closeButtonRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in'
            }, "-=0.1")
            
            // Collapse the nav back
            .to(collapsedNavRef.current, {
                height: '4rem',
                borderRadius: '3rem',
                paddingTop: '0',
                paddingBottom: '0',
                duration: 0.4,
                ease: 'power2.inOut'
            })
            
            // Fade out backdrop
            .to(backdropRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => setIsVisible(false)
            }, "-=0.2")
            
            // Show hamburger
            .to(hamburgerRef.current, {
                opacity: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        }
    }, [isOpen]);

    return (
        <>
            {/* Backdrop blur overlay */}
            <div 
                ref={backdropRef}
                className={`fixed inset-0 bg-grey/50 backdrop-blur-md z-40 opacity-0 ${
                    !isVisible ? 'hidden' : ''
                }`}
                onClick={() => setIsOpen(false)}
            />
            
            <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 ${className}`}>
                {/* Main Navigation Container */}
                <div className="relative">
                    {/* Navigation (Combined collapsed and expanded) */}
                    <div 
                        ref={collapsedNavRef} 
                        className="bg-white rounded-[3rem] shadow-lg px-[2.5rem] w-[90vw] sm:w-[28rem] h-[4rem] overflow-hidden"
                    >
                        <div className="flex justify-between items-center h-[4rem]">
                            <div className="text-primary font-extrabold text-[1.5rem]">
                                Bright Horizons
                            </div>
                            <div ref={hamburgerRef} className={`ml-[1rem] p-[0.5rem] cursor-pointer ${isVisible ? 'pointer-events-none' : ''}`} onClick={() => setIsOpen(true)}>
                                <div className="w-[1.75rem] h-[0.25rem] bg-primary mb-[0.3rem] transition-all"></div>
                                <div className="w-[1.75rem] h-[0.25rem] bg-primary mb-[0.3rem] transition-all"></div>
                                <div className="w-[1.75rem] h-[0.25rem] bg-primary transition-all"></div>
                            </div>
                            <div 
                                ref={closeButtonRef}
                                className={`p-[0.5rem] cursor-pointer absolute right-[2.5rem] opacity-0 h-[4rem] flex items-center ${!isVisible ? 'pointer-events-none' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="relative w-[1.75rem] h-[1.75rem]">
                                    <div className="absolute top-1/2 left-0 w-[1.75rem] h-[0.125rem] bg-primary transform -translate-y-1/2 rotate-45 transition-all"></div>
                                    <div className="absolute top-1/2 left-0 w-[1.75rem] h-[0.125rem] bg-primary transform -translate-y-1/2 -rotate-45 transition-all"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div ref={menuItemsRef} className="flex flex-col space-y-[1.9rem] mt-[2rem]">
                            <button className="bg-purple text-white h-[3.5rem] w-full rounded-[3rem] text-[1.25rem] font-extrabold hover:bg-opacity-90 transition-colors">
                                BOOK SESSION
                            </button>
                            <button className="text-primary text-[1.25rem] font-bold hover:text-purple transition-colors">
                                ABOUT
                            </button>
                            <button className="text-primary text-[1.25rem] font-bold hover:text-purple transition-colors">
                                CONTACT US
                            </button>
                            <button className="text-primary text-[1.25rem] font-bold hover:text-purple transition-colors">
                                FAQ
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
} 