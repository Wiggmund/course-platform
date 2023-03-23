import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Logo = () => {
	const logoText = 'CourseMania - the best course platform';

	return (
		<Typography component="div">
			<Box
				sx={{
					typography: { ss: 'h5', xs: 'h4', sm: 'h1' },
					textAlign: 'center'
				}}
			>
				{logoText}
			</Box>
		</Typography>
	);
};

export default Logo;
