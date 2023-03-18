import {ICourse} from "../../model";

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';
import { CourseDuration } from "../CourseDuration/CourseDuration";
import { Box } from "@mui/material";
import { CourseRating } from "../CourseRating/CourseRating";
import MainTheme from "../../miu/MainTheme";

type CourseCardProps = Pick<ICourse, 'title' | 'description' | 'duration' | 'rating' | 'tags'>

let counter = 1;
export const CourseCard = ({
    title,
    description,
    duration,
    rating,
    tags  
}: CourseCardProps) => {
    const link = `https://source.unsplash.com/random/200x200?sig=${counter++}`;
    
    const tagItems = tags.map((tag, index) => (
        <Typography
            variant="caption" 
            key={`${tag}-${index}`}
        >
            {`#${tag}`}
        </Typography>
    ));

    const tagsBlock = (
        <Stack direction={'row'} gap={1}>
            {tagItems}
        </Stack>
    );
    
    return (
        <Card
            component={Stack}
            spacing={2}
            height={'100%'}
        >
            <Box component='img' src={link} alt={title}></Box>
            <Stack
                paddingLeft={2}
                paddingRight={2}
                paddingBottom={2}
                justifyContent='space-between'
                spacing={2}
                flex={1}
            >
                <Box>
                    <Typography variant="h6">{title}</Typography>
                    {tagsBlock}
                    <Typography variant="body2">{description}</Typography>
                </Box>
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
                    >More</Button>
                    <CourseDuration duration={duration} />
                    <CourseRating rating={rating} />
                </Stack>
            </Stack>
        </Card>
    );
};