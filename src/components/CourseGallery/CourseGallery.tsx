import { CourseList } from "../../data";
import Grid from '@mui/material/Grid'
import { CourseCard } from "../CourseCard/CourseCard";

export const CourseGallery = () => {
    const courses = CourseList.slice(0, 5);


    return (
        <Grid container spacing={2}>
            {courses.map(course => (
                <Grid item key={course.id} ss={12} sm={6} md={4} lg={3}>
                    <CourseCard {...course} />
                </Grid>
            ))}
        </Grid>
    );
};