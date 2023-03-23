import Grid from '@mui/material/Grid';
import CourseCard from '../CourseCard/CourseCard';
import { EntityId } from '@reduxjs/toolkit';

interface CourseCardListProps {
	coursesIds: EntityId[];
}

const CourseCardList = ({ coursesIds }: CourseCardListProps) => {
	return (
		<Grid container spacing={2}>
			{coursesIds.map((courseId) => (
				<Grid item key={courseId} ss={12} sm={6} md={4} lg={3}>
					<CourseCard courseId={courseId} />
				</Grid>
			))}
		</Grid>
	);
};

export default CourseCardList;
