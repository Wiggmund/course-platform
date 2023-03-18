import Box from "@mui/material/Box/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CourseDuration, CourseInfo, CourseRating, CourseStatus, HashTags, LessonCard, SkillsBlock } from "../../components";
import { CourseList, LessonsList } from "../../data";
import { HeaderContainer, MainContainer } from "./Home";

const CoursePage = () => {
    const course = CourseList[0];     
    const link = course.previewImageLink + '/cover.webp';
    const lessons = LessonsList;
    const lessonItems = lessons.map((lesson, index) => (
        <LessonCard key={lesson.id} lesson={lesson} isLast={index + 1 === lessons.length}/>
    ));


    const headerTextContent = (
        <Stack gap={4}>
            <CourseStatus />
            <Box>
                <Typography variant='h3'>{course.title}</Typography>
                <Box marginTop={2}>
                    <HashTags tags={course.tags}/>
                </Box>

                <Stack gap={2} marginTop={2}>
                    <Stack direction='row' justifyContent='space-between'>
                        <CourseDuration duration={course.duration}/>
                        <CourseRating rating={course.rating}/>
                    </Stack>
                    <Typography variant='h5'>{course.description}</Typography>
                </Stack>
            </Box>
        </Stack>
    );

    return (
        <Container maxWidth="xl">
            <HeaderContainer maxWidth="xl">
                <Grid container p={2} alignItems='center'>
                    <Grid item xs={12} md={4}>
                        {headerTextContent}
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box component='img' src={link} alt={course.title} maxWidth={'100%'}></Box>
                    </Grid>
                </Grid>
            </HeaderContainer>
            <MainContainer maxWidth="xl">
                <Grid 
                    container
                    justifyContent='space-between'
                    spacing={2}
                >
                    <Grid item xs={12} md={6}>
                        <CourseInfo launchDate={course.launchDate} lessonsCount={course.lessonsCount}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SkillsBlock skills={course.meta.skills!}/>
                    </Grid>
                </Grid>
                <Stack gap={4} marginTop={2}>
                    <Typography variant='h3'>Course program</Typography>
                    <Stack gap={4}>
                        {lessonItems}
                    </Stack>
                </Stack>
            </MainContainer>
        </Container>
    );
};


export default CoursePage;