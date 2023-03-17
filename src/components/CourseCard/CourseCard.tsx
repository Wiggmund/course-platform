import {ICourse} from "../../model";

type CourseCardProps = Pick<ICourse, 'title' | 'description' | 'duration' | 'rating' | 'tags'>


export const CourseCard = ({
    title,
    description,
    duration,
    rating,
    tags  
}: CourseCardProps) => {

    return <h2>Course: {title}</h2>
};