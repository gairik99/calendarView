import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';// Import your CSS module here
// import schedule from '../data/schedule';
import { getSchedule } from '../api/action';

const CalendarView = () => {
    const [schedules, setSchedules] = useState([])
    const parseTime = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    };

    // Convert schedule to events
    const events = schedules.map(item => ({
        title: item.title,
        start: `${item.date}T${parseTime(item.stime)}`,
        end: `${item.date}T${parseTime(item.etime)}`,
        extendedProps: {
            description: item.description,
        },
    }));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSchedule();
                // console.log(data.data[0].schedule)
                setSchedules(data.data[0].schedule)

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    // console.log(schedules)
    return (
        <div className="p-4">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                initialDate="2025-03-01" // Force March 2025 display
                headerToolbar={{
                    left: 'prev,next',
                    center: 'dayGridMonth,timeGridWeek,timeGridDay',
                    right: 'title',
                }}
                events={events}
                selectable={true}
                height="auto"
                timeZone="local" // Explicitly set timezone
                eventDisplay="block"
                locale="en" // Add locale
                eventTimeFormat={{ // Configure time display
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true // Show AM/PM
                }}// Force event visualization
            />
        </div>
    );
};

export default CalendarView;