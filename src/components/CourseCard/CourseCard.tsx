import {ICourse} from "../../model";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';
import { Duration } from "../Duration/Duration";
import { Box } from "@mui/material";
import { CourseRating } from "../CourseRating/CourseRating";
import MainTheme from "../../miu/MainTheme";
import { HashTags } from "../HashTags/HashTags";

type CourseCardProps = Pick<ICourse, 'title' | 'description' | 'duration' | 'rating' | 'tags' | 'previewImageLink'>

export const CourseCard = ({
    title,
    description,
    duration,
    rating,
    tags,
    previewImageLink
}: CourseCardProps) => {
    const preview = `${previewImageLink}/cover.webp`;
    

    const cardBottom = (
        <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            gap={1}
            sx={{
                [MainTheme.breakpoints.down('xs')]: {
                    flexDirection: 'column',
                    gap: 2
                },
            }}
        >
            <Button variant='contained' size="small" color="primary"
                sx={{
                    [MainTheme.breakpoints.down('xs')]: {
                        order: 1
                    },
                }}
            >
                More
            </Button>
            <Duration duration={duration} />
            <CourseRating rating={rating} />
        </Stack>
    );

    const cardTextContent = (
        <Box>
            <Typography variant="h6">{title}</Typography>
            <HashTags tags={tags}/>
            <Typography variant="body2">{description}</Typography>
        </Box>
    );

    const cardImage = (<Box component='img' src={preview} alt={title} height={'400px'}/>);

    return (
        <Card
            component={Stack}
            spacing={2}
            height={'100%'}
        >
            {cardImage}
            <Stack
                paddingLeft={2}
                paddingRight={2}
                paddingBottom={2}
                justifyContent='space-between'
                spacing={2}
                flex={1}
            >
                {cardTextContent}
                {cardBottom}  
            </Stack>
        </Card>
    );
};