import {CourseResponseData, ICourse} from "../../model";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Duration from "../Duration/Duration";
import Box from "@mui/material/Box";
import CourseRating from "../CourseRating/CourseRating";
import {MainTheme} from "../../miu";
import HashTags from "../HashTags/HashTags";
import { Link } from "react-router-dom";

type CourseCardProps = Pick<ICourse, 'title' | 'description' | 'duration' | 'rating' | 'tags' | 'previewImageLink'>

const CourseCard = ({
    id,
    title,
    description,
    duration,
    rating,
    tags,
    previewImageLink
}: CourseResponseData) => {
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
            <Link to={`course/${id}`}>
                <Button variant='contained' size="small" color="primary"
                    sx={{
                        [MainTheme.breakpoints.down('xs')]: {
                            order: 1
                        },
                    }}
                >
                    More
                </Button>
            </Link>
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

    const cardImage = (
        <Box 
            component='img'
            src={preview} 
            alt={title} 
            maxHeight={400}
            minHeight={200}
        />
    );

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

export default CourseCard;