import { useEffect, useState } from 'react';
import { AuthService } from '../services';
import { Logo, SearchPanel, HashTags, CourseCardList } from '../components';
import { CircularProgress, Pagination, Stack, styled } from '@mui/material';
import Container from '@mui/material/Container';
import {
	selectAllTags,
	selectCoursesPerPageIds,
	selectCurrentPage,
	selectLoadingStatus,
	selectPagesQty,
	useAppDispatch,
	useAppSelector,
	fetchCourses,
	fetchFilteredCourses
} from '../redux';
import { LoadingStatus } from '../constants';
import { RequestError } from '../exceptions';

export const HeaderContainer = styled(Container)({
	component: 'header',
	p: 4
});

export const MainContainer = styled(Container)({
	component: 'main',
	marginTop: '40px',
	p: 4
});

const Home = () => {
	const dispatch = useAppDispatch();
	const coursesIds = useAppSelector(selectCoursesPerPageIds);
	const hashTags = useAppSelector(selectAllTags);
	const pagesQty = useAppSelector(selectPagesQty);
	const loadingStatus = useAppSelector(selectLoadingStatus);
	const currentPage = useAppSelector(selectCurrentPage);
	const isFiltered = useAppSelector((state) => state.courses.isFiltered);
	const [filterValue, setFilterValue] = useState('');

	useEffect(() => {
		async function initialAuthentication() {
			await AuthService.checkAuth();
		}
		initialAuthentication();

		if (loadingStatus === LoadingStatus.Idle) {
			dispatch(fetchCourses(currentPage));
		}
	}, [dispatch, currentPage, loadingStatus]);

	if (loadingStatus === LoadingStatus.Failed) {
		throw new RequestError('Failed to fetch courses from the server');
	}

	if (loadingStatus === LoadingStatus.Loading) {
		return (
			<Stack gap={3} height="100vh">
				<Logo />
				<Stack height="100%" justifyContent="center" alignItems="center">
					<CircularProgress color="primary" size="3em" />
				</Stack>
			</Stack>
		);
	}

	const onSearch = (inputValue: string) => {
		if (inputValue.trim() !== '') {
			setFilterValue(inputValue);
			dispatch(fetchFilteredCourses({ page: 1, filter: { title: inputValue } }));
		} else {
			dispatch(fetchCourses(currentPage));
		}
	};

	return (
		<Container maxWidth="xl" sx={{ p: 4 }}>
			<HeaderContainer maxWidth="xl">
				<Stack spacing={3} marginBottom={4}>
					<Logo />
					<HashTags tags={hashTags} />
					<SearchPanel onSearch={onSearch} value={filterValue} />
				</Stack>
			</HeaderContainer>
			<MainContainer maxWidth="xl">
				<CourseCardList coursesIds={coursesIds} />
				<Stack alignItems="center" justifyContent="center" marginTop={4}>
					<Pagination
						count={pagesQty}
						page={currentPage}
						onChange={(_, newPage) =>
							isFiltered
								? dispatch(
										fetchFilteredCourses({
											page: newPage,
											filter: { title: filterValue }
										})
								  )
								: dispatch(fetchCourses(newPage))
						}
						showFirstButton
						showLastButton
					/>
				</Stack>
			</MainContainer>
		</Container>
	);
};

export default Home;
