import Util from "../../utils/Util";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import {Stack, Typography} from '@mui/material';
import MainTheme from "../../miu/MainTheme";
import Box from "@mui/material/Box";


interface CourseDurationProps {
    duration: number;
}

export const Duration = ({
    duration
}: CourseDurationProps) => {
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

    // We always have hours if we have minutes >= 60, so we use '!'
    const time = !hours || !minutes
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