import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getSchedule } from '../api/action';
import enUSLocale from 'date-fns/locale/en-US';

const locales = { 'en-US': enUSLocale };

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const convertTo24Hour = (timeString) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
};

const validateDate = (date) => {
    if (isNaN(date.getTime())) {
        console.error('Invalid date:', date);
        return new Date(); // Fallback to current date
    }
    return date;
};

const BigCalendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getSchedule();
                const rawSchedule = res.data[0].schedule;

                const formattedEvents = rawSchedule.map(event => {
                    const startStr = `${event.date}T${convertTo24Hour(event.stime)}`;
                    const endStr = `${event.date}T${convertTo24Hour(event.etime)}`;

                    const start = validateDate(new Date(startStr));
                    const end = validateDate(new Date(endStr));

                    return {
                        title: event.title,
                        start,
                        end,
                        allDay: false,
                        description: event.description
                    };
                });

                setEvents(formattedEvents);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ height: '100vh', padding: '20px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultDate={new Date(2025, 2, 1)}  // Ensure current date is shown
                defaultView="month"      // Default to month view
                style={{ height: '100%' }}
            />
        </div>
    );
};

export default BigCalendar;