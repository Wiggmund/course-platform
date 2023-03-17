import Util from "../../utils/Util";
import styles from './CourseDuration.module.css';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import {Typography} from '@mui/material'


interface CourseDurationProps {
    minutes: number;
}

export const CourseDuration = ({
    minutes
}: CourseDurationProps) => {
    const timeNotation = Util.getHoursAndMinutesFromMinutes(minutes);


    return (
        <div className={styles.container}>
            <AccessTimeOutlinedIcon />
            <Typography>{timeNotation}</Typography>
        </div>
    );
};