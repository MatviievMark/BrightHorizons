import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

interface CalendarEvent {
    id: number;
    date: string;
    time_slot: string | null;
    client_name: string | null;
    lesson_type: string | null;
    blocked_day: boolean;
    created_at: string;
    updated_at: string;
}

interface BlockedDay {
    date: string;
    blocked: boolean;
}

interface Props extends PageProps {
    events: CalendarEvent[];
    blockedDays: BlockedDay[];
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTime: string;
    selectedDate: string;
    onEventCreated: (event: CalendarEvent) => void;
}

const BookingModal = ({ isOpen, onClose, selectedTime, selectedDate, onEventCreated }: BookingModalProps) => {
    const [lessonType, setLessonType] = useState('');
    const [clientName, setClientName] = useState('');
    const [customHours, setCustomHours] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!lessonType || !clientName || (lessonType === 'custom' && !customHours)) {
            alert('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post('/calendar/book', {
                date: selectedDate,
                time_slot: selectedTime,
                client_name: clientName,
                lesson_type: lessonType,
                custom_hours: lessonType === 'custom' ? customHours : undefined
            });

            onEventCreated(response.data);
            onClose();
            setLessonType('');
            setClientName('');
            setCustomHours(1);
        } catch (error: any) {
            console.error('Error creating event:', error);
            alert(error.response?.data?.message || 'Failed to create event. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    // Calculate max available hours based on selected time
    const startHour = parseInt(selectedTime.split(':')[0]);
    const maxAvailableHours = 21 - startHour; // Assuming 20:00 is the last slot

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Book Session for {selectedTime}</h2>
                
                <div className="space-y-4">
                    {/* Lesson Type Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Lesson Type
                        </label>
                        <select
                            value={lessonType}
                            onChange={(e) => {
                                setLessonType(e.target.value);
                                if (e.target.value !== 'custom') {
                                    setCustomHours(1);
                                }
                            }}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Select a type</option>
                            <option value="online">Online</option>
                            <option value="in-person">In Person</option>
                            <option value="custom">Custom</option>
                        </select>

                        {/* Notice for In-Person Lessons */}
                        {lessonType === 'in-person' && (
                            <p className="mt-2 text-sm text-amber-600">
                                Notice: In person blocks off 4 blocks - 2 hours as minimum required for in person lesson and 2 additional blocks for travel.
                            </p>
                        )}

                        {/* Custom Hours Selector */}
                        {lessonType === 'custom' && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Number of Hours
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        min="1"
                                        max={maxAvailableHours}
                                        value={customHours}
                                        onChange={(e) => setCustomHours(Math.max(1, Math.min(maxAvailableHours, parseInt(e.target.value) || 1)))}
                                        className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-500">hour(s)</span>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    Maximum available hours: {maxAvailableHours}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Client Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Client
                        </label>
                        <input
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter client name"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-medium text-primary bg-blue rounded-md hover:bg-light-blue transition-colors disabled:bg-blue-400"
                        >
                            {isSubmitting ? 'Booking...' : 'Book Session'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Timeline = ({ selectedDay, currentDate, events = [], onEventRemoved, onEventCreated }: { 
    selectedDay: Date | null; 
    currentDate: Date;
    events: CalendarEvent[];
    onEventRemoved: (eventId: number) => void;
    onEventCreated: (event: CalendarEvent) => void;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');

    if (selectedDay === null) return null;

    const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8am to 8pm

    const handleTimeClick = (hour: number) => {
        const formattedTime = `${hour.toString().padStart(2, '0')}:00`;
        setSelectedTime(formattedTime);
        setIsModalOpen(true);
    };

    const formatTimeRange = (hour: number) => {
        const startHour = hour.toString().padStart(2, '0');
        const endHour = (hour + 1).toString().padStart(2, '0');
        return `${startHour}:00-${endHour}:00`;
    };

    const handleRemoveEvent = (eventId: number) => {
        if (window.confirm('Are you sure you want to remove this event?')) {
            axios.delete(`/calendar/${eventId}`).then(() => {
                onEventRemoved(eventId);
            });
        }
    };

    const handleBlockDay = () => {
        // TODO: Implement block day functionality
        const data = {
            date: selectedDay.toISOString().split('T')[0],
            blocked_day: true
        };
        
        // Make API call to store endpoint
        axios.post('/calendar', data).then(() => {
            window.location.reload();
        });
    };

    const formattedDate = selectedDay.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Filter events for the selected day
    const selectedDayEvents = events.filter(event => {
        return event.date === selectedDay.toISOString().split('T')[0];
    });

    // Function to get event for a specific hour
    const getEventForHour = (hour: number) => {
        const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
        return selectedDayEvents.find(event => event.time_slot?.startsWith(timeSlot));
    };

    return (
        <div className="mt-8 border rounded-lg p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Timeline for {formattedDate}</h3>
                {selectedDayEvents.length === 0 && (
                    <button
                        onClick={handleBlockDay}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Block Day
                    </button>
                )}
            </div>
            <div className="space-y-2">
                {hours.map((hour) => {
                    const event = getEventForHour(hour);
                    const timeRange = formatTimeRange(hour);

                    return (
                        <div 
                            key={hour} 
                            onClick={() => !event && handleTimeClick(hour)}
                            className={`flex items-center ${!event ? 'hover:bg-gray-50 cursor-pointer' : ''} p-2 rounded-lg group`}
                        >
                            <div className="w-32 font-medium text-gray-600 flex flex-col items-start">
                                <span>{timeRange}</span>
                                {event && (
                                    <button 
                                        className="mt-2 px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveEvent(event.id);
                                        }}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <div className={`flex-1 ml-4 border-l-2 ${event ? 'border-blue-200' : 'border-gray-200'} pl-4 min-h-[3rem] group-hover:border-blue-300`}>
                                {event ? (
                                    <div className="space-y-1">
                                        <div className="font-medium text-blue-600">
                                            {event.client_name || 'Unnamed Client'}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {event.lesson_type === 'travel' ? 'Travel Time' :
                                             event.lesson_type === 'in-person' ? 'In-Person Lesson' :
                                             event.lesson_type === 'online' ? 'Online Lesson' :
                                             'Custom Session'}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-gray-500 text-sm">Available</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <BookingModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedTime={selectedTime}
                selectedDate={selectedDay.toISOString().split('T')[0]}
                onEventCreated={onEventCreated}
            />
        </div>
    );
};

const CalendarGrid = ({ events: initialEvents = [], blockedDays: initialBlockedDays = [] }: { events: CalendarEvent[], blockedDays: BlockedDay[] }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [events, setEvents] = useState(initialEvents);
    const [blockedDays, setBlockedDays] = useState(initialBlockedDays);
    
    const handleEventRemoved = (eventId: number) => {
        setEvents(events.filter(event => event.id !== eventId));
    };

    const handleEventCreated = (newEvent: CalendarEvent | CalendarEvent[]) => {
        if (Array.isArray(newEvent)) {
            // For in-person lessons, add all the created events
            setEvents(prevEvents => [...prevEvents, ...newEvent]);
        } else {
            // For single events (online/custom)
            setEvents(prevEvents => [...prevEvents, newEvent]);
        }
    };

    useEffect(() => {
        console.log('Blocked Days:', blockedDays);
    }, [blockedDays]);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Function to check if a date is blocked
    const isDateBlocked = (date: Date) => {
        const formattedDate = date.toISOString().split('T')[0];
        return (blockedDays?.some(blockedDay => blockedDay?.date === formattedDate)) || isSunday(date);
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        const daysArray = [];
        const firstDayOfWeek = firstDay.getDay();
        
        for (let i = 0; i < firstDayOfWeek; i++) {
            daysArray.push(null);
        }
        
        for (let i = 1; i <= lastDay.getDate(); i++) {
            daysArray.push(new Date(year, month, i));
        }
        
        return daysArray;
    };

    const isSunday = (date: Date) => {
        return date.getDay() === 0;
    };

    const monthDays = getDaysInMonth(currentDate);
    
    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDay(null);
    };
    
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDay(null);
    };

    // Function to get summarized events for a date
    const getEventsForDate = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        const dayEvents = events.filter(event => event.date === dateStr && event.lesson_type !== 'travel');
        
        // Group by client name to avoid duplicates
        const clientGroups = dayEvents.reduce((groups: { [key: string]: { count: number, type: string } }, event) => {
            const clientName = event.client_name || 'Unnamed';
            if (!groups[clientName]) {
                groups[clientName] = { count: 0, type: event.lesson_type || '' };
            }
            groups[clientName].count++;
            return groups;
        }, {});

        return Object.entries(clientGroups).map(([client, data]) => ({
            client_name: client,
            lesson_type: data.type,
            count: data.count
        }));
    };

    const handleUnblockDay = (date: Date) => {
        const formattedDate = date.toISOString().split('T')[0];
        const blockedEvent = events.find(event => 
            event.date === formattedDate && event.blocked_day
        );

        if (blockedEvent?.id) {
            axios.delete(`/calendar/${blockedEvent.id}`).then(() => {
                // Update both events and blockedDays states
                setEvents(events.filter(event => event.id !== blockedEvent.id));
                setBlockedDays(blockedDays.filter(day => day.date !== formattedDate));
            });
        }
    };

    return (
        <div className="w-full">
            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-4">
                <button 
                    onClick={goToPreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button 
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
                {/* Days header */}
                {days.map((day) => (
                    <div key={day} className={`text-center font-semibold p-2 ${day === 'Sun' ? 'text-gray-400' : ''}`}>
                        {day}
                    </div>
                ))}
                
                {/* Calendar days */}
                {monthDays.map((date, index) => {
                    if (!date) return <div key={index} className="aspect-square" />;
                    
                    const isBlocked = isDateBlocked(date);
                    const isSelected = selectedDay && date.toDateString() === selectedDay.toDateString();
                    const dayEvents = date ? getEventsForDate(date) : [];
                    
                    return (
                        <div
                            key={index}
                            onClick={() => !isBlocked && setSelectedDay(date)}
                            onDoubleClick={() => isBlocked && handleUnblockDay(date)}
                            className={`aspect-square border rounded-lg p-2 shadow-sm transition-all flex flex-col relative group
                                ${isBlocked ? 'bg-red-50 cursor-not-allowed' : 'bg-white cursor-pointer hover:shadow-md'}
                                ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                                ${isBlocked ? 'border-red-200' : ''}`}
                        >
                            {isBlocked && (
                                <span className="invisible group-hover:visible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                                    text-xs text-gray-500 bg-white px-2 py-1 rounded-md shadow-sm whitespace-nowrap z-10">
                                    double click to unblock
                                </span>
                            )}
                            <div className={`font-semibold ${
                                isBlocked ? 'text-red-600' : 
                                date.toDateString() === new Date().toDateString() ? 'text-blue-600' : ''
                            }`}>
                                {date.getDate()}
                            </div>
                            
                            {/* Events summary */}
                            <div className="mt-1 space-y-1 text-xs">
                                {dayEvents.map((event, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`truncate ${
                                            event.lesson_type === 'online' ? 'text-blue-600' :
                                            event.lesson_type === 'in-person' ? 'text-green-600' :
                                            'text-gray-600'
                                        }`}
                                    >
                                        {event.client_name}
                                        {event.count > 1 ? ` (${event.count})` : ''}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="text-sm text-red-600 mt-auto">
                                {isBlocked && "Blocked"}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Timeline */}
            {selectedDay && !isDateBlocked(selectedDay) && !isSunday(selectedDay) && (
                <Timeline 
                    selectedDay={selectedDay} 
                    currentDate={currentDate} 
                    events={events}
                    onEventRemoved={handleEventRemoved}
                    onEventCreated={handleEventCreated}
                />
            )}
        </div>
    );
};

export default function Calendar({ auth, events = [], blockedDays = [] }: Props) {
    useEffect(() => {
        console.log('Calendar Events Data:', events);
        console.log('Blocked Days Data:', blockedDays);
    }, [events, blockedDays]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Calendar</h2>}
        >
            <Head title="Calendar" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <CalendarGrid events={events || []} blockedDays={blockedDays || []} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 