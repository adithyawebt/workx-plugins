import { useEffect, useState } from 'react';
import styles from './Schedule.module.scss';

import RightArrow from '../../assets/icons/circle-right.svg';
import LeftArrow from '../../assets/icons/circle-left.svg';
import DownArrow from '../../assets/icons/chevron-down.svg';
import UpArrow from '../../assets/icons/chevron-up.svg';

import summaryData from '../../mockData/summaryData.json';
import taskData from '../../mockData/taskData.json'

interface OwnProps {
    selectedDay: number,
    selectedMonth: number,
    selectedYear: number,
    onDayChange: (newDay: number) => void,
}

const Schedule = ({
    selectedDay,
    selectedMonth,
    onDayChange }: OwnProps) => {
    const [selectedTab, setSelectedTab] = useState<'Summary' | 'Tasks' | 'Leaves'>('Summary');
    const [taskVisibility, setTaskVisibility] = useState<boolean[]>(new Array(taskData.length).fill(false));

    const [leaveData, setLeaveData] = useState<Record<string, { employeeName: string; leaveDetails: string; date: string }[]> | null>(null);
    const [holidayData, setHolidayData] = useState<Record<string, { name: string; date: string; }[]> | null>(null);
    const [currentDisplayedMonth, setCurrentDisplayedMonth] = useState<number>(selectedMonth);

    useEffect(() => {
        import('../../mockData/leaveData.json')
            .then((data) => {
                console.log('Leave Data:', data);
                setLeaveData(data.default.leaveData);
            })
            .catch((error) => {
                console.error('Error loading leave data:', error);
            });

        import('../../mockData/leaveData.json')
            .then((data) => {
                console.log('Holiday Data:', data);
                setHolidayData(data.default.holidayData);
            })
            .catch((error) => {
                console.error('Error loading holiday data:', error);
            });
    }, [selectedMonth]);

    const handleTaskClick = (index: number) => {
        const newTaskVisibility = [...taskVisibility];
        newTaskVisibility[index] = !newTaskVisibility[index];
        setTaskVisibility(newTaskVisibility);
    }

    const getLeavesForMonth = () => {
        const monthKey = months[currentDisplayedMonth];
        return leaveData?.[monthKey] || [];
    };

    const getHolidaysForMonth = () => {
        const monthKey = months[currentDisplayedMonth];
        return holidayData?.[monthKey] || [];
    };

    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const handleNextMonthClick = () => {
        if (currentDisplayedMonth < 11) {
            setCurrentDisplayedMonth(currentDisplayedMonth + 1);
        }
    };

    const handlePrevMonthClick = () => {
        if (currentDisplayedMonth > 0) {
            setCurrentDisplayedMonth(currentDisplayedMonth - 1);
        }
    };

    return (
        <div className={styles.schedule}>
            <div className={styles.tabsHolder}>
                <div
                    className={`${styles.tab} ${selectedTab === 'Summary' ? styles.selected : ''}`}
                    onClick={() => setSelectedTab('Summary')}>
                    Summary
                </div>
                <div className={`${styles.tab} ${selectedTab === 'Tasks' ? styles.selected : ''}`}
                    onClick={() => setSelectedTab('Tasks')}>
                    Tasks
                </div>
                <div
                    className={`${styles.tab} ${selectedTab === 'Leaves' ? styles.selected : ''}`}
                    onClick={() => setSelectedTab('Leaves')}>
                    Leaves
                </div>
            </div>
            <div className={styles.contentHolder}>
                {selectedTab === 'Summary' && (
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <img src={LeftArrow} onClick={() => onDayChange(selectedDay - 1)} />
                            <span>Summary for {selectedDay}:</span>
                            <img src={RightArrow} onClick={() => onDayChange(selectedDay + 1)} />
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.contentDetails}>
                            {summaryData.map((summary, index) => (
                                <>
                                    <div key={index} className={styles.detailsHolder}>
                                        <div className={styles.time}>{summary.time}</div>
                                        <div className={styles.details}>
                                            {summary.details.map((detail, detailIndex) => (
                                                <div className={styles.detail} key={detailIndex}>{detail}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.dividerSmall}></div>
                                </>
                            ))}
                        </div>
                    </div>
                )}
                {selectedTab === 'Tasks' && (
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <img src={LeftArrow} onClick={() => onDayChange(selectedDay - 1)} />
                            <span>Tasks for {selectedDay}:</span>
                            <img src={RightArrow} onClick={() => onDayChange(selectedDay + 1)} />
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.tasksHolder}>
                            <div className={styles.employeeDetailsTemplate}>
                                <span>Employee</span>
                                <span>Task</span>
                                <span>Status</span>
                            </div>
                            <div className={styles.dividerSmall}></div>
                            {taskData.map((task, index) => (
                                <>
                                    <div key={index} className={styles.task}>
                                        <div className={styles.employeeDetails} onClick={() => handleTaskClick(index)}>
                                            <span>{task.employeeDetails.employeeName}</span>
                                            <span>{task.employeeDetails.taskAssigned}</span>
                                            <div className={styles.taskStatus}>
                                                <span>{task.taskStatus}</span>
                                            </div>
                                            <img
                                                src={taskVisibility[index] ? UpArrow : DownArrow}
                                                alt="arrow"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleTaskClick(index);
                                                }}
                                            />
                                        </div>
                                        {taskVisibility[index] ? (
                                            <div className={styles.taskDetails}>
                                                <div className={styles.dividerSmall}></div>
                                                <span>Client: {task.taskDetails.client}</span>
                                                <span>Project: {task.taskDetails.project}</span>
                                                <span>Details: {task.taskDetails.additionalDetails}</span>
                                            </div>
                                        ) : ''}
                                    </div>
                                    <div className={styles.dividerSmall}></div>
                                </>
                            ))}
                        </div>
                    </div>
                )}
                {selectedTab === 'Leaves' && (
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <img src={LeftArrow} onClick={handlePrevMonthClick} />
                            <span>Leaves for {months[currentDisplayedMonth]}</span>
                            <img src={RightArrow} onClick={handleNextMonthClick} />
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.leaveContainer}>
                            <div className={styles.leaves}>
                                <span className={styles.leaveHeading}>Leaves:</span>
                                {getLeavesForMonth().map((leave, index) => (
                                    <div className={styles.leave} key={index}>
                                        {leave.employeeName}: {leave.leaveDetails} ({leave.date})
                                    </div>
                                ))}
                            </div>
                            <div className={styles.holidays}>
                                <span className={styles.leaveHeading}>Holidays:</span>
                                {getHolidaysForMonth().map((holiday, index) => (
                                    <div className={styles.leave} key={index}>
                                        <span>{holiday.name}:</span>
                                        <span>{holiday.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Schedule;
