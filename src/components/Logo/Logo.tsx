import {Typography, Box} from '@mui/material';

export const Logo = () => {
    const logoText = 'CourseMania - the best course platform';
    
    return (
        <Typography component='div' >
            <Box
                sx={{
                    typography: {ss: 'h5',xs: 'h4', sm: 'h1'},
                    textAlign: 'center'
                }}
            >{logoText}</Box>
        </Typography>
    );
};