import Grid from '@mui/material/Grid'
import CourseCard from "../CourseCard/CourseCard";
import {useEffect, useState} from 'react'
import { CourseResponseData } from "../../model";
import Typography from "@mui/material/Typography/Typography";
import { CourseService } from "../../services";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { Pagination } from '@mui/material';

const CourseCardList = () => {
    const [page, setPage] = useState(1);
    const [pageQty, setPageQty] = useState(0);
    const [loading, setLoading] = useState(false);
    const [courseList, setCourseList] = useState<CourseResponseData[]>([]);

    useEffect(() => {
        async function loadCourseList() {
            setLoading(true);
            const courses = await CourseService.getAllCourses(page);
            setCourseList(courses);
            setPageQty(CourseService.pagesCount);
            setLoading(false);
        }

        loadCourseList();
    }, [page]);


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
            {pageQty !== 0 &&
                <Grid item ss={12}>
                    <Stack alignItems='center' justifyContent='center'>
                        <Pagination
                            count={pageQty}
                            page={page}
                            onChange={(_, newPage) => setPage(newPage)}
                            showFirstButton
                            showLastButton
                        />
                    </Stack>
                </Grid>
            }
        </Grid>
    );
};

export default CourseCardList;