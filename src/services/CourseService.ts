import { AxiosResponse } from "axios";
import { IllegalArgumentException } from "../exceptions";
import $api from "../http";
import { CourseResponseData, ICourse } from "../model";

interface Response {
    courses: CourseResponseData[]
}

class CourseService {
    static coursesEndpoint = 'core/preview-courses';
    static coursePreviewLinkEnding = 'cover.webp';
    static coursePreviewVideoEnding = 'preview.webp'
    static lessonPreviewLinkEnding = '.webp';
    static pagesCount: number = -1;
    static perPage = 10;

    static async getAllCourses(page: number): Promise<CourseResponseData[]> {
        const perPage = CourseService.perPage;
        const response = await $api.get<Response>(CourseService.coursesEndpoint);
        const courses = response.data.courses;
        CourseService.pagesCount = Math.ceil(courses.length / perPage);
        
        const coursesByPage: Map<number, CourseResponseData[]> = new Map();
        splitCoursesByPage();

        if(!coursesByPage.has(page)) {
            throw new IllegalArgumentException('getAllCourses');
        }

        return coursesByPage.get(page) || [];

        function splitCoursesByPage() {
            let to = perPage;
            let from = 0;
            let skip = 0;
            for (let page = 1; page <= CourseService.pagesCount; page++) {
                let list;

                if (to >= courses.length) {
                    list = courses.slice(from);
                }

                list = courses.slice(from, to);
                coursesByPage.set(page, list);
    
                from = perPage + skip;
                skip += perPage;
                to = from + perPage;
            }
        }
    }

    static async getCourseById(courseId: string): Promise<AxiosResponse<ICourse>> {
        return await $api.get<ICourse>(`${CourseService.coursesEndpoint}/${courseId}`);
    }
}
export default CourseService;
