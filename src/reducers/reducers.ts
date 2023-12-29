import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';

const selectedDaySlice = createSlice({
    name: 'selectedDay',
    initialState: new Date().getDate(),
    reducers: {
        setSelectedDay: (state, action: PayloadAction<number>) => action.payload,
    },
});

const eventsSlice = createSlice({
    name: 'events',
    initialState: {} as Record<number, string[]>,
    reducers: {
        addEvent: (state, action: PayloadAction<{ day: number; event: string }>) => {
            const { day, event } = action.payload;
            state[day] = [...(state[day] || []), event];
        },
    },
});

const rootReducer = combineReducers({
    selectedDay: selectedDaySlice.reducer,
    events: eventsSlice.reducer,
});

export const { setSelectedDay } = selectedDaySlice.actions;
export const { addEvent } = eventsSlice.actions;

export default rootReducer;
