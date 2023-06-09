import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import Button from '@mui/material/Button';
import Duration from '../Duration/Duration';
import { ILesson } from '../../model';
import Paper from '@mui/material/Paper';
import { MainTheme } from '../../miu';
import { CourseService } from '../../services';
import Hls from 'hls.js';

interface LessonCardProps {
	lesson: ILesson;
	isLast: boolean;
}

const LessonCard = ({ lesson, isLast }: LessonCardProps) => {
	const { title, duration, order, status, id } = lesson;
	const imagePreviewLink = `${lesson.previewImageLink}/lesson-${order}${CourseService.lessonPreviewLinkEnding}`;
	const videoLink = lesson.link;
	const locked = status === 'locked' ? true : false;
	let hls: Hls;

	const LessonTitle = (
		<Typography component="div">
			<Box
				sx={{
					typography: { xs: 'caption', sm: 'h5', md: 'h4' }
				}}
			>
				{title}
			</Box>
		</Typography>
	);

	const LessonIcon = locked ? (
		<EnhancedEncryptionIcon
			color="error"
			sx={{
				alignSelf: 'flex-end',
				justifySelf: 'flex-end',
				flexGrow: 1,
				fontSize: { xs: '1.5em', md: '2em' }
			}}
		/>
	) : null;

	const ConnectionLine = (
		<Stack
			sx={{
				alignItems: 'center',
				justifyContent: 'center',
				// below MD-breaking point, there wasn't enough 100% length
				height: `calc(102%)`,
				width: 5,
				backgroundColor: blue[600],
				flexGrow: 1,
				flexShrink: 0,
				[MainTheme.breakpoints.down('sm')]: {
					display: 'none'
				}
			}}
		></Stack>
	);

	const Order = (
		<Stack
			sx={{
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '100%',
				height: { xs: 30, md: 50 },
				width: { xs: 30, md: 50 },
				backgroundColor: blue[600],
				flexGrow: 0,
				flexShrink: 0,
				[MainTheme.breakpoints.down('xs')]: {
					paddingX: 1
				}
			}}
		>
			<Typography variant="h5" fontWeight={800} color="white">
				{order}
			</Typography>
		</Stack>
	);

	const LessonOrder = (
		<Stack alignItems="center" flexGrow={1}>
			{Order}
			{!isLast && ConnectionLine}
		</Stack>
	);

	const lessonVideoPreviewElementId = id;
	const video = document.getElementById(lessonVideoPreviewElementId) as HTMLMediaElement;
	if (Hls.isSupported() && !locked && video) {
		hls = new Hls();
		hls.loadSource(videoLink);
		hls.attachMedia(video);
		hls.on(Hls.Events.MANIFEST_PARSED, function () {
			console.log('Lesson video loaded');
		});
		hls.config.autoStartLoad = false;
	}

	const startVideo = () => {
		hls.startLoad(-1);
		video.play();
		video.muted = false;
	};

	const mediaBlock = !locked ? (
		<Stack
			alignItems="center"
			justifyContent="center"
			component="video"
			id={id}
			controls={!locked}
			src={videoLink}
			poster={imagePreviewLink}
			muted
			onPlay={startVideo}
			sx={{
				weight: { xs: '100%', sm: 250, md: 350, lg: 700 },
				width: { xs: '100%', sm: 280, md: 350, lg: 700 },
				cursor: 'pointer'
			}}
		></Stack>
	) : (
		<Stack
			component="img"
			src={imagePreviewLink}
			alt={title}
			sx={{
				weight: { xs: '100%', sm: 250, md: 350, lg: 700 },
				width: { xs: '100%', sm: 280, md: 350, lg: 700 }
			}}
		></Stack>
	);

	const LessonButton = (
		<Button
			disabled={locked}
			variant="contained"
			size="medium"
			onClick={startVideo}
			sx={{
				flexGrow: 0,
				fontSize: { ss: '0.5em', lg: '2em' },
				paddingY: { md: 2 },
				paddingX: { md: 4 }
			}}
		>
			Start
		</Button>
	);

	return (
		<Stack
			direction="row"
			gap={1}
			height={'100%'}
			sx={{
				[MainTheme.breakpoints.down('sm')]: {
					flexDirection: 'column'
				}
			}}
		>
			<Stack alignItems="center">{LessonOrder}</Stack>
			<Stack
				direction="row"
				flexGrow={1}
				sx={{
					[MainTheme.breakpoints.down('sm')]: {
						flexDirection: 'column'
					}
				}}
			>
				{mediaBlock}
				{/* {LessonPreview} */}
				<Paper sx={{ p: 2, display: 'flex', flexGrow: 1 }}>
					<Stack justifyContent="center" gap={2} flexGrow={1}>
						{LessonIcon}
						{LessonTitle}
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							flexGrow={1}
						>
							{LessonButton}
							<Duration duration={duration} />
						</Stack>
					</Stack>
				</Paper>
			</Stack>
		</Stack>
	);
};

export default LessonCard;
