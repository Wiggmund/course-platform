import {Util} from "../../utils";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {MainTheme} from "../../miu";
import Box from "@mui/material/Box";


interface DurationProps {
    duration: number;
}

const Duration = ({
    duration
}: DurationProps) => {
    const {hours, minutes} = Util.getHoursAndMinutesFromMinutes(duration);


    const DurationTitle = (content: string) => (
        <Typography component='div' >
            <Box
                sx={{
                    typography: {xs: 'caption', sm: 'body1', xl: 'h6'}
                }}
            >{content}</Box>
        </Typography>
    );

    const time = !hours || !minutes
        // Here we can't have minutes undefined, so we use '!assertion' 
        ? (hours ? DurationTitle(hours) : DurationTitle(minutes!))
        : <Stack sx={{
            [MainTheme.breakpoints.up('lg')]: {
                flexDirection: 'row',
                gap: 0.5
            },
        }}>
            {DurationTitle(hours)}
            {DurationTitle(minutes)}
        </Stack>

    return (
        <Stack
            direction={'row'}
            alignItems={'center'}
            gap={1}
        >
            <AccessTimeOutlinedIcon />
            <Typography variant="caption">{time}</Typography>
        </Stack>
    );
};

export default Duration;