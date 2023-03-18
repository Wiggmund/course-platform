import Util from "../../utils/Util";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import {Stack, Typography} from '@mui/material'
import Divider from "@mui/material/Divider/Divider";
import MainTheme from "../../miu/MainTheme";

interface CourseDurationProps {
    duration: number;
}

export const CourseDuration = ({
    duration
}: CourseDurationProps) => {
    const {hours, minutes} = Util.getHoursAndMinutesFromMinutes(duration);

    const time = !hours || !minutes
        ? <Typography variant="caption">{hours ? hours : minutes}</Typography>
        : <Stack sx={{
            [MainTheme.breakpoints.up('lg')]: {
                flexDirection: 'row',
                gap: 0.5
            },
        }}>
            <Typography variant="caption">{hours}</Typography>
            <Divider sx={{
                [MainTheme.breakpoints.up('lg')]: {
                    display: 'none'
                },
            }}/>
            <Typography variant="caption">{minutes}</Typography>
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