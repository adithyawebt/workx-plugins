import { createAction } from '@reduxjs/toolkit';

export const setSelectedDay = createAction<number>('SET_SELECTED_DAY');
export const addEvent = createAction<{ day: number; event: string }>('ADD_EVENT');
