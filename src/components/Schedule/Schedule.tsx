import styles from './Schedule.module.scss';

interface ScheduleProps {
    events: Record<number, string[]>;
    selectedDay: number;
    onAddEvent: (event: string) => void;
}

const Schedule = ({ events, selectedDay, onAddEvent }: ScheduleProps) => {
    const dayEvents = events[selectedDay] || [];

    return (
        <div className={styles.schedule}>
            <h3>Events for {selectedDay}</h3>
            {dayEvents.length === 0 ? (
                <p>No events for this day.</p>
            ) : (
                <ul>
                    {dayEvents.map((event, index) => (
                        <li key={index}>{event}</li>
                    ))}
                </ul>
            )}
            <button onClick={() => onAddEvent('New Event')}>Add Event</button>
        </div>
    );
};

export default Schedule;
