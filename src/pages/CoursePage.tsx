import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Duration, CourseInfo, CourseRating, CourseStatus, HashTags, LessonCard, SkillsBlock } from "../components";
import { HeaderContainer, MainContainer } from "./Home";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MainTheme } from "../miu";
import { Link, useParams } from "react-router-dom";
import { ICourse } from "../model";
import { CourseService } from "../services";
import {useEffect, useState} from 'react'
import { Status } from "../components/CourseStatus/CourseStatus";
import CircularProgress from '@mui/material/CircularProgress';
import Hls from "hls.js";

const CoursePage = () => {
    const [course, setCourse] = useState<ICourse>();
    const {id} = useParams<Pick<ICourse, 'id'>>();
    const [loading, setLoading] = useState(false);
    let hls: Hls;

    useEffect(() => {
        async function getCourseById() {
            if (id) {
                setLoading(true);
                const {data} = await CourseService.getCourseById(id);
                setCourse(data);
                setLoading(false);
            }
        }

        getCourseById();
    }, [id]);
    

    if (loading) {
        return (
            <Stack alignItems='center' justifyContent='center' height='100vh'>
                <CircularProgress color="primary" />
            </Stack>
        );
    }

    if (!course) {
        return <Typography variant='h4' textAlign='center'>There is no course with given id {id}</Typography>
    }

    const courseVideoPreviewElementId = course.id;
    const video = document.getElementById(courseVideoPreviewElementId) as HTMLMediaElement;
    const {title, description, duration, rating, tags, lessons, previewImageLink, launchDate, meta} = course
    const status = course.status === 'launched' ? Status.Launched : Status.Closed;

    let coursePreview;
    if (meta.courseVideoPreview) {
        const imagePreviewLink = `${meta.courseVideoPreview.previewImageLink}/${CourseService.coursePreviewVideoEnding}`;
        const videoLink = meta.courseVideoPreview.link;

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(videoLink);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                console.log('Course preview video loaded')
            });
            hls.config.autoStartLoad = false;
        }

        const startVideo = () => {
            if (video && hls) {
                hls.startLoad(-1);
                video.play();
            }
        };

        coursePreview = (
            <Stack
                component='video'

                id={id}
                controls
                maxHeight='100%'
                maxWidth='100%'
                preload='metadata'
                muted
                autoPlay
                src={videoLink}
                poster={imagePreviewLink}

                onMouseOver={startVideo}
                sx={{cursor: 'pointer'}}
            ></Stack>
        );
    } else {
        coursePreview = (
            <Stack
                alignItems='center'
                justifyContent='center'
            >
                <Box 
                    component='img'
                    maxHeight='100%'
                    maxWidth='100%'
                    src={`${previewImageLink}/${CourseService.lessonPreviewLinkEnding}`} 
                    alt={title}
                /> 
            </Stack>
        );
    }

    lessons.sort((a, b) => a.order - b.order);
    const lessonItems = lessons.map((lesson, index) => (
        <LessonCard key={lesson.id} lesson={lesson} isLast={index + 1 === lessons.length}/>
    ));


    const StatusBar = (
        <Stack 
            direction='row'
            justifyContent='space-between'
            sx={{
                [MainTheme.breakpoints.down('md')]: {
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2
                }
            }}
        >
            <Link to={'/'}>
                <IconButton aria-label="back">
                    <ArrowBackIcon 
                        color='info'
                        sx={{ fontSize: {ss: '1.5em', xs: '2em'}}}
                    />
                </IconButton>
            </Link>
            <CourseStatus status={status}/>
        </Stack>
    );

    const headerTextContent = (
        <Stack gap={4} p={4}>
            {StatusBar}
            <Box>
                <Typography
                    variant='h3'
                    sx={{
                        [MainTheme.breakpoints.down('lg')]: {
                            typography: 'h4'
                        }
                    }}
                >
                    {title}
                </Typography>
                <Box marginTop={2}>
                    <HashTags tags={tags}/>
                </Box>

                <Stack gap={2} marginTop={2}>
                    <Stack direction='row' justifyContent='space-between'>
                        <Duration duration={duration}/>
                        <CourseRating rating={rating}/>
                    </Stack>
                    <Typography variant='h5'>{description}</Typography>
                </Stack>
            </Box>
        </Stack>
    );

    return (
        <Container maxWidth="xl" sx={{p: 4}}>
            <HeaderContainer maxWidth="xl">
                <Grid container alignItems='center'>
                    <Grid item xs={12} md={4}>
                        {headerTextContent}
                    </Grid>
                    <Grid item ss={12} md={8}>
                        {coursePreview}
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
                        <CourseInfo launchDate={launchDate} lessonsCount={lessons.length}/>
                    </Grid>
                    {meta.skills &&
                        <Grid item xs={12} md={6}>
                            <SkillsBlock skills={meta.skills}/>
                        </Grid>
                    }
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