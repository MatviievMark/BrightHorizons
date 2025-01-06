import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import Navigation from '@/Components/Navigation';
import gsap from 'gsap';
import LinesSvg from '@/Components/Svg/LinesSvg';
import BearStockSvg from '@/Components/Svg/BearStockSvg';
import StarsSvg from '@/Components/Svg/StarsSvg';
import DoubleCircleSvg from '@/Components/DoubleCircleSvg';

interface Props {
    auth: {
        user: any;
    };
}

export default function BookSession({ auth }: Props) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [sessionType, setSessionType] = useState<'online' | 'inPerson' | null>(null);
    const [footerHeight, setFooterHeight] = useState(0);
    
    const timeSelectorRef = useRef<HTMLDivElement>(null);
    const calendarContainerRef = useRef<HTMLDivElement>(null);
    const investmentOptionsRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Initialize footer height
    useEffect(() => {
        if (footerRef.current) {
            setFooterHeight(footerRef.current.offsetHeight);
        }
    }, []);

    // Add footer animation when content changes
    useEffect(() => {
        if (footerRef.current && contentRef.current) {
            const contentHeight = contentRef.current.offsetHeight;
            
            gsap.to(footerRef.current, {
                duration: 0.5,
                ease: "power2.out",
                top: contentHeight + 96,
            });
        }
    }, [showCalendar, selectedDate, selectedTimeSlots]);

    // Generate time slots based on session type
    const getTimeSlots = () => {
        const slots: string[] = [];
        if (sessionType === 'online') {
            // Generate 1-hour slots from 8 AM to 8 PM
            for (let hour = 8; hour <= 20; hour++) {
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const hour12 = hour > 12 ? hour - 12 : hour;
                slots.push(`${hour12}:00 ${ampm}`);
            }
        } else if (sessionType === 'inPerson') {
            // Generate 2-hour blocks from 8 AM to 8 PM
            for (let hour = 8; hour < 20; hour += 2) {
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const hour12 = hour > 12 ? hour - 12 : hour;
                const endHour = hour + 2;
                const endHour12 = endHour > 12 ? endHour - 12 : endHour;
                const endAmPm = endHour >= 12 ? 'PM' : 'AM';
                slots.push(`${hour12}:00 ${ampm} - ${endHour12}:00 ${endAmPm}`);
            }
        }
        return slots;
    };

    // Handle time slot selection
    const handleTimeSlotSelect = (time: string) => {
        setSelectedTimeSlots(prev => {
            if (prev.includes(time)) {
                // Remove the time slot if it's already selected
                return prev.filter(t => t !== time);
            } else {
                // Add the time slot
                const newSlots = [...prev, time].sort((a, b) => {
                    // Sort by time for better display
                    const timeA = new Date(`1970/01/01 ${a.split(' ')[0]} ${a.split(' ')[1]}`);
                    const timeB = new Date(`1970/01/01 ${b.split(' ')[0]} ${b.split(' ')[1]}`);
                    return timeA.getTime() - timeB.getTime();
                });
                return newSlots;
            }
        });
    };

    // Calculate total hours and cost
    const calculateTotal = () => {
        if (selectedTimeSlots.length === 0) return { hours: 0, cost: 0 };

        let hours = 0;
        if (sessionType === 'online') {
            hours = selectedTimeSlots.length; // Each slot is 1 hour
        } else if (sessionType === 'inPerson') {
            hours = selectedTimeSlots.length * 2; // 2-hour blocks
        }

        const rate = sessionType === 'online' ? 40 : 50;
        const cost = hours * rate;

        return { hours, cost };
    };

    useEffect(() => {
        if (selectedDate && timeSelectorRef.current) {
            // Reset the transform and opacity before animating
            gsap.set(timeSelectorRef.current, { 
                y: -20, 
                opacity: 0,
                height: 0,
                marginTop: 0
            });
            
            // Animate the time selector sliding down
            gsap.to(timeSelectorRef.current, {
                y: 0,
                opacity: 1,
                height: "auto",
                marginTop: "1.5rem",
                duration: 0.5,
                ease: "power2.out"
            });
        }
    }, [selectedDate]);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        
        const days = [];
        // Add empty slots for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }
        // Add the actual days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const isDateSelectable = (date: Date) => {
        if (!date) return false;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
        oneMonthFromNow.setHours(23, 59, 59, 999);

        // Check if it's not a Sunday (0 is Sunday in getDay())
        const isSunday = date.getDay() === 0;
        
        // Check if date is between today and one month from now
        const isInRange = date >= today && date <= oneMonthFromNow;

        return !isSunday && isInRange;
    };

    const prevMonth = () => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
        const today = new Date();
        // Only allow going back if the new month includes today
        if (newDate.getMonth() === today.getMonth() && newDate.getFullYear() === today.getFullYear()) {
            setCurrentMonth(newDate);
        }
    };

    const nextMonth = () => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
        const oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
        // Only allow going forward if the new month is within one month from now
        if (newDate <= oneMonthFromNow) {
            setCurrentMonth(newDate);
        }
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    // Handle investment option selection
    const handleOptionSelect = (type: 'online' | 'inPerson' | 'package') => {
        if (type === 'package') {
            // Navigate to sign up page
            window.location.href = '/sign-up';
            return;
        }

        setSessionType(type);
        
        if (investmentOptionsRef.current) {
            // Fade out investment options
            gsap.to(investmentOptionsRef.current, {
                opacity: 0,
                y: 50,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    setShowCalendar(true);
                }
            });
        }
    };

    // Handle calendar animation after it's mounted
    useEffect(() => {
        if (showCalendar && calendarContainerRef.current) {
            const tl = gsap.timeline();
            tl.fromTo(calendarContainerRef.current,
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        }
    }, [showCalendar]);

    // Handle time selector animation
    useEffect(() => {
        let animation: gsap.core.Tween;
        
        if (selectedDate && timeSelectorRef.current) {
            // Reset the transform and opacity before animating
            gsap.set(timeSelectorRef.current, { 
                y: -20, 
                opacity: 0,
                height: 0,
                marginTop: 0
            });
            
            // Animate the time selector sliding down
            animation = gsap.to(timeSelectorRef.current, {
                y: 0,
                opacity: 1,
                height: "auto",
                marginTop: "1.5rem",
                duration: 0.5,
                ease: "power2.out"
            });
        }

        // Cleanup function
        return () => {
            if (animation) {
                animation.kill();
            }
        };
    }, [selectedDate]);

    // Format time slot for display
    const formatTimeRange = (timeSlot: string) => {
        if (sessionType === 'inPerson') {
            return timeSlot; // Already in correct format
        }
        // For online sessions, convert "8:00 AM" to "8:00 AM - 9:00 AM"
        const [time, period] = timeSlot.split(' ');
        const [hour] = time.split(':');
        const hourNum = parseInt(hour);
        
        let nextHour = hourNum + 1;
        let nextPeriod = period;
        
        if (nextHour === 12) {
            nextPeriod = period === 'AM' ? 'PM' : 'AM';
        } else if (nextHour > 12) {
            nextHour = 1;
            nextPeriod = 'PM';
        }
        
        return `${hour}:00 ${period} - ${nextHour}:00 ${nextPeriod}`;
    };

    return (
        <div className="relative min-h-screen bg-white font-sans">
            <Head title="Book Session" />
            <Navigation />

            {/* Grid Background */}
            <div className="fixed inset-0 min-h-screen" style={{
                backgroundImage: `
                    linear-gradient(to right, #E5E7EB 1px, transparent 1px),
                    linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)
                `,
                backgroundSize: '1.25rem 1.25rem',
                zIndex: 0
            }}></div>

            {/* Slanted Blue Background */}
            <div className="absolute top-0 left-0 w-full h-[45rem] md:h-[55rem] overflow-x-hidden">
                <div 
                    className="absolute top-0 left-0 w-[150%] h-full bg-light-blue transform -skew-y-[-6deg] md:-skew-y-[-4deg] translate-y-[-15%] -translate-x-[10%]"
                    style={{ zIndex: 1 }}
                ></div>
            </div>

            {/* Main Content Container */}
            <div ref={contentRef} className="relative px-8 pt-28 pb-24" style={{ zIndex: 2 }}>
                <div className="max-w-xl mx-auto">
                    <h1 className="text-[2.5rem] font-extrabold text-primary leading-tight mb-[5rem]">
                        {showCalendar ? 'Book Your Session' : 'Select Your Plan'}
                    </h1>

                    {/* Investment Options */}
                    <div ref={investmentOptionsRef} className={`flex flex-col items-center space-y-6 ${showCalendar ? 'hidden' : ''}`}>
                        {/* Online 1-on-1 */}
                        <div className="relative">
                            <LinesSvg className="absolute -left-[0rem] -top-[3rem] -z-10" />
                            <div 
                                className="bg-grey backdrop-blur-sm rounded-3xl p-6 shadow-card w-[15.5rem] cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => handleOptionSelect('online')}
                            >
                                <h3 className="text-[1.25rem] font-bold text-primary mb-1">Online 1-on-1</h3>
                                <div className="text-[1.5rem] font-bold text-primary mb-3">$40/hour</div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-purple"></div>
                                        <span className="text-primary text-[0.9rem]">Flexible scheduling</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-purple"></div>
                                        <span className="text-primary text-[0.9rem]">Virtual whiteboard</span>
                                    </div>
                                </div>
                                <BearStockSvg className="absolute top-[-3.3rem] right-[4rem]" />
                            </div>
                        </div>

                        {/* 10-Hour Package */}
                        <div 
                            className="bg-primary backdrop-blur-sm rounded-3xl p-6 shadow-card w-[16rem] cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => handleOptionSelect('package')}
                        >
                            <h3 className="text-[1.25rem] font-bold text-white mb-1">10-Hour Package</h3>
                            <div className="text-[1.5rem] font-bold text-white mb-3">$350</div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-blue"></div>
                                    <span className="text-white text-[0.9rem]">Most Popular Choice</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-blue"></div>
                                    <span className="text-white text-[0.9rem]">Save $50</span>
                                </div>
                            </div>
                        </div>

                        {/* In-Person */}
                        <div className="relative">
                            <DoubleCircleSvg className="absolute -left-[3.5rem] -top-[0rem] w-[15rem] -z-10" />
                            <div 
                                className="bg-grey backdrop-blur-sm rounded-3xl p-6 shadow-card w-[15.5rem] cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => handleOptionSelect('inPerson')}
                            >
                                <h3 className="text-[1.25rem] font-bold text-primary mb-1">In-Person</h3>
                                <div className="text-[1.5rem] font-bold text-primary mb-3">$50/hour</div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-purple"></div>
                                        <span className="text-primary text-[0.9rem]">Jacksonville area only</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-purple"></div>
                                        <span className="text-primary text-[0.9rem]">2-hour minimum</span>
                                    </div>
                                </div>
                                <StarsSvg className="absolute bottom-[-10rem] right-[-2rem]" />
                            </div>
                        </div>
                    </div>

                    {/* Calendar View */}
                    <div ref={calendarContainerRef} className={`opacity-0 ${!showCalendar ? 'hidden' : ''}`}>
                        {/* Calendar and Time Selector Container */}
                        <div className="bg-white rounded-3xl shadow-card p-6 overflow-hidden">
                            {/* Calendar */}
                            <div>
                                {/* Calendar Header */}
                                <div className="flex justify-between items-center mb-6">
                                    <button 
                                        onClick={prevMonth}
                                        className="text-primary p-2"
                                    >
                                        ←
                                    </button>
                                    <h2 className="text-xl font-bold text-primary">
                                        {formatDate(currentMonth)}
                                    </h2>
                                    <button 
                                        onClick={nextMonth}
                                        className="text-primary p-2"
                                    >
                                        →
                                    </button>
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-2">
                                    {/* Weekday headers */}
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                        <div 
                                            key={day} 
                                            className="text-center text-sm font-medium text-primary/60 pb-2"
                                        >
                                            {day}
                                        </div>
                                    ))}

                                    {/* Calendar days */}
                                    {getDaysInMonth(currentMonth).map((date, index) => {
                                        const isSelectable = date && isDateSelectable(date);
                                        return (
                                            <div
                                                key={index}
                                                className={`
                                                    aspect-square flex items-center justify-center rounded-full
                                                    ${isSelectable ? 'cursor-pointer hover:bg-purple/10 text-primary' : 'text-gray-300 cursor-not-allowed'}
                                                    ${date && selectedDate && date.getTime() === selectedDate.getTime() ? 'bg-purple text-white hover:bg-purple' : ''}
                                                    ${date && isToday(date) ? 'border-2 border-purple' : ''}
                                                `}
                                                onClick={() => {
                                                    if (date && isSelectable) {
                                                        setSelectedDate(date);
                                                        setSelectedTimeSlots([]);
                                                        console.log('Selected date:', date.toLocaleDateString('en-US', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        }));
                                                    }
                                                }}
                                            >
                                                {date ? date.getDate() : ''}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Time Selector */}
                            {selectedDate && (
                                <div 
                                    ref={timeSelectorRef}
                                    className="mt-6 opacity-0"
                                >
                                    <div className="h-px bg-gray-200 mb-6"></div>
                                    <h3 className="text-xl font-bold text-primary mb-4">
                                        Select Time {sessionType === 'inPerson' ? '(2-hour blocks)' : ''}
                                    </h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {getTimeSlots().map((time) => (
                                            <button
                                                key={time}
                                                className={`
                                                    py-2 px-4 rounded-full font-medium
                                                    ${sessionType === 'inPerson' ? 'text-[0.75rem]' : 'text-sm'}
                                                    ${selectedTimeSlots.includes(time)
                                                        ? 'bg-purple text-white hover:bg-purple'
                                                        : 'bg-grey text-primary hover:bg-purple/10'}
                                                    transition-colors
                                                `}
                                                onClick={() => handleTimeSlotSelect(time)}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Total Hours and Cost */}
                                    {selectedTimeSlots.length > 0 && (
                                        <div className="mt-6 p-4 bg-grey rounded-2xl">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="text-lg font-bold text-primary">Selected Time{selectedTimeSlots.length > 1 ? 's' : ''}</h4>
                                                    <div className="mt-2 space-y-1">
                                                        {selectedTimeSlots.map((time, index) => (
                                                            <div key={index} className="text-sm text-primary/80">
                                                                {formatTimeRange(time)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-primary/80">Total Hours: {calculateTotal().hours}</div>
                                                    <div className="text-xl font-bold text-primary">Total: ${calculateTotal().cost}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div 
                ref={footerRef} 
                className='fixed w-full left-0 px-8 py-16 bg-grey'
                style={{ 
                    position: 'absolute',
                    top: '100%',
                    zIndex: 2
                }}
            >
                <div className='max-w-4xl mx-auto'>
                    <div className='flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0'>
                        {/* Logo/Brand */}
                        <div className='text-primary font-extrabold text-xl'>
                            Bright Horizons
                        </div>

                        {/* Contact */}
                        <div className='text-center md:text-right'>
                            <p className='text-primary font-medium mb-6'>Ready to excel in math?</p>
                            <button className='bg-purple text-white px-8 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-colors'>
                                Contact Max
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='h-px bg-primary/10 my-8'></div>

                    {/* Bottom Section */}
                    <div className='flex flex-col md:flex-row justify-between items-center text-sm text-primary/60'>
                        <div>© 2024 Bright Horizons. All rights reserved.</div>
                        <div className='mt-4 md:mt-0'>
                            <a href="#" className='hover:text-primary transition-colors'>Privacy Policy</a>
                            <span className='mx-4'>|</span>
                            <a href="#" className='hover:text-primary transition-colors'>Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 