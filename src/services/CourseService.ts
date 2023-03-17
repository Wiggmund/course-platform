import { AxiosResponse } from "axios";
import $api from "../http";
import { CourseResponseData, ICourse } from "../model";

export class CourseService {
    static async getAllCourses(): Promise<AxiosResponse<CourseResponseData[]>> {
        return await $api.get<CourseResponseData[]>(CourseService.getCoursesEndpoint());
    }

    static async getCourseById(courseId: string): Promise<AxiosResponse<ICourse>> {
        return await $api.get<ICourse>(`${CourseService.getCoursesEndpoint()}/${courseId}`);
    }

    static getCoursesEndpoint(): string {
        return `core/preview-courses`
    }
}

