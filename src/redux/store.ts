import {configureStore} from '@reduxjs/toolkit'
import CoursesReducer from './coursesSlice';

const store = configureStore({
    reducer: {
        courses: CoursesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;