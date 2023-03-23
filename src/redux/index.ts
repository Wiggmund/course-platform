export { default as RootStore } from './store';
export { useAppDispatch, useAppSelector } from './hooks';
export {
	selectCourseById,
	selectAllCoursesPerPage,
	selectCoursesPerPageIds,
	selectAllTags,
	selectPagesQty,
	selectLoadingStatus,
	selectAllCourses,
	selectCurrentPage,
	fetchCourses,
	fetchFilteredCourses
} from './coursesSlice';
