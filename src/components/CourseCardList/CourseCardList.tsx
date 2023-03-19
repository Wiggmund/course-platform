import Grid from '@mui/material/Grid'
import CourseCard from "../CourseCard/CourseCard";
import {useEffect, useState} from 'react'
import { CourseResponseData } from "../../model";
import Typography from "@mui/material/Typography/Typography";
import { CourseService } from "../../services";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

const CourseCardList = () => {
    const [courseList, setCourseList] = useState<CourseResponseData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadCourseList() {
            setLoading(true);
            const {data} = await CourseService.getAllCourses();
            setCourseList(data.courses.slice(0, 15));
            setLoading(false);
        }

        loadCourseList();
    }, []);

    if (loading) {
        return (
            <Stack alignItems='center' justifyContent='center'>
                <CircularProgress color="primary" />
            </Stack>
        );
    }

    if (courseList.length === 0) {
        return <Typography variant='h4' textAlign='center'>There is no avaiable courses</Typography>;
    }

    return (
        <Grid container spacing={2}>
            {courseList.map(course => (
                <Grid item key={course.id} ss={12} sm={6} md={4} lg={3}>
                    <CourseCard {...course} />
                </Grid>
            ))}
        </Grid>
    );
};

export default CourseCardList;