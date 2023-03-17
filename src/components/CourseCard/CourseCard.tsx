import { CourseList } from "../../data";

interface CourseCardProps {
    courseId: string;
}

const CourseCard = ({
    courseId  
}: CourseCardProps) => {
    const course = CourseList.find(course => course.id === courseId);

    if (!course) {
        return null;
    }

    return <h2>Course: {course.title}</h2>
};

export default CourseCard;