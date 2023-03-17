import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import {Typography} from '@mui/material'
import CustomColors from '../../miu/CustomColors';
import Grid from '@mui/material/Grid';

interface CourseRatingProps {
    rating: number;
}

export const CourseRating = ({
    rating
}: CourseRatingProps) => {

    const defineIconColor = (score: number): string  => {
        if (score < 3.2) return CustomColors.rating.low;

        if (score < 4.2) return CustomColors.rating.middle;

        return CustomColors.rating.high;
    };


    return (
        <Grid container spacing={2}>
            <Grid>
                <StarOutlinedIcon sx={{color: `${defineIconColor(rating)}`}}/>
            </Grid>
            <Grid>
                <Typography>{rating}</Typography>
            </Grid>
        </Grid>
    );
}