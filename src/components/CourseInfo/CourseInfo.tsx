import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';
import Paper from '@mui/material/Paper';
import { format, parseISO } from 'date-fns';

interface CourseInfoProps {
	launchDate: string;
	lessonsCount: number;
}

const TextRow = styled(Typography)({
	textAlign: 'center'
});

const TextRowHeader = styled(TextRow)({
	fontWeight: 700
});

const CourseInfo = ({ launchDate, lessonsCount }: CourseInfoProps) => {
	const formattedDate = format(parseISO(launchDate), 'dd/MM/yyyy');

	return (
		<Paper sx={{ p: 2, height: '100%' }}>
			<Stack alignItems="center" gap={2} height="100%">
				<Stack justifyContent="center" flexGrow={1}>
					<TextRowHeader variant="h6">Launch date:</TextRowHeader>
					<TextRow>{formattedDate}</TextRow>
				</Stack>
				<Stack justifyContent="center" flexGrow={1}>
					<TextRowHeader variant="h6">Lesson count:</TextRowHeader>
					<TextRow>{lessonsCount}</TextRow>
				</Stack>
			</Stack>
		</Paper>
	);
};

export default CourseInfo;
