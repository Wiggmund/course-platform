import { CourseList } from "../../data";


export const CourseGallery = () => {
    const courses = CourseList.slice(0, 5);


    return (
        <>
            {courses.map(a => <p>{a.title}</p>)}
        </>
    );
};