import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {green, red, } from '@mui/material/colors'
import {MainTheme} from '../../miu';

type Status = 'lunched' | 'closed';

const CourseStatus = () => {
    const status: Status = 'lunched';
    
    return (
        <Stack
            paddingY={1}
            paddingX={4}
            alignItems='center'
            justifyContent='center'
            bgcolor={status === 'lunched' ? green[500] : red[500]}
            width='min-content'
            borderRadius={MainTheme.shape.borderRadius}
        >
            <Typography 
                variant='subtitle1'
                color={MainTheme.palette.common.white}
            >
                {status}
            </Typography>
        </Stack>
    );
};

export default CourseStatus;