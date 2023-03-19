import { AxiosResponse } from "axios";
import $api from "../http";
import { CourseResponseData, ICourse } from "../model";

interface Response {
    courses: CourseResponseData[]
}

class CourseService {
    static coursesEndpoint = 'core/preview-courses';
    static coursePreviewLinkEnding = 'cover.webp';
    static lessonPreviewLinkEnding = '.webp';
    
    static async getAllCourses(): Promise<AxiosResponse<Response>> {
        return await $api.get<Response>(CourseService.coursesEndpoint);
    }

    static async getCourseById(courseId: string): Promise<AxiosResponse<ICourse>> {
        return await $api.get<ICourse>(`${CourseService.coursesEndpoint}/${courseId}`);
    }
}
export default CourseService;
