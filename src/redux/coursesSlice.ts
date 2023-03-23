import { createEntityAdapter, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "../constants";
import {CourseResponseData} from '../model';
import {CourseService} from '../services'
import { RootState } from "./store";

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (page: number) => {
    return await CourseService.getAllCourses(page);
})

const coursesAdapter = createEntityAdapter<CourseResponseData>({
    sortComparer: (a, b) => Number(a.rating) - Number(b.rating)
});

const coursesSlice = createSlice({
    name: 'courses',
    initialState: coursesAdapter.getInitialState({
        coursesList: [] as CourseResponseData[],
        currentPage: 1,
        tags: [] as string[],
        pagesQty: 1,
        status: LoadingStatus.Idle,
        error: null
    }),
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.status = LoadingStatus.Loading;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                const {coursesPerPage, pagesQty, allCourses, currentPage } = action.payload;

                state.status = LoadingStatus.Succeed;
                state.currentPage = currentPage;
                state.pagesQty = pagesQty;
                state.coursesList = allCourses;
                
                const uniqueTags: string[] = [];
                allCourses
                    .flatMap(course => course.tags)
                    .forEach(tag => {
                        if (!uniqueTags.find(unique => unique === tag)) uniqueTags.push(tag);
                    })
                state.tags = uniqueTags;

                coursesAdapter.setAll(state, coursesPerPage);
            })
            .addCase(fetchCourses.rejected, (state) => {
                state.status = LoadingStatus.Failed;
            })
    }
});

export default coursesSlice.reducer;

export const {
    selectById: selectCourseById,
    selectAll: selectAllCoursesPerPage,
    selectIds: selectCoursesPerPageIds
} = coursesAdapter.getSelectors((state: RootState) => state.courses);

export const selectAllTags = (state: RootState) => state.courses.tags;
export const selectPagesQty = (state: RootState) => state.courses.pagesQty;
export const selectLoadingStatus = (state: RootState) => state.courses.status;
export const selectAllCourses = (state: RootState) => state.courses.coursesList;
export const selectCurrentPage = (state: RootState) => state.courses.currentPage;