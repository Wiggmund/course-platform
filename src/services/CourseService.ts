import { AxiosResponse } from "axios";
import $api from "../http";
import { CourseResponseData, ICourse } from "../model";

class CourseService {
    static coursesEndpoint = 'core/preview-courses';
    
    static async getAllCourses(): Promise<AxiosResponse<CourseResponseData[]>> {
        return await $api.get<CourseResponseData[]>(CourseService.coursesEndpoint);
    }

    static async getCourseById(courseId: string): Promise<AxiosResponse<ICourse>> {
        return await $api.get<ICourse>(`${CourseService.coursesEndpoint}/${courseId}`);
    }
}

export default CourseService;
