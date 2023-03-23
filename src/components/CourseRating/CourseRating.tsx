import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CustomColors from '../../miu/CustomColors';

interface CourseRatingProps {
	rating: number;
}

const CourseRating = ({ rating }: CourseRatingProps) => {
	const defineIconColor = (score: number): string => {
		if (score < 3.2) return CustomColors.rating.low;

		if (score < 4.2) return CustomColors.rating.middle;

		return CustomColors.rating.high;
	};

	return (
		<Stack direction={'row'} alignItems={'center'} gap={1}>
			<StarOutlinedIcon sx={{ color: `${defineIconColor(rating)}` }} />
			<Typography>{rating}</Typography>
		</Stack>
	);
};

export default CourseRating;
