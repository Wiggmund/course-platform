import { createTheme } from '@mui/material';
import { red, green, yellow } from '@mui/material/colors';

const MainTheme = createTheme({
	breakpoints: {
		values: {
			ss: 150,
			xs: 320,
			sm: 600,
			md: 900,
			lg: 1400,
			xl: 1980
		}
	},
	palette: {
		rating: {
			low: red[500],
			middle: green[500],
			high: yellow[500]
		}
	}
});

export default MainTheme;
