import { AxiosResponse } from "axios";
import { IllegalArgumentException } from "../exceptions";
import $api from "../http";
import { CourseResponseData, ICourse } from "../model";

interface Response {
    courses: CourseResponseData[]
}

export interface GetAllCoursesResponse {
    currentPage: number;
    pagesQty: number;
    coursesPerPage: CourseResponseData[];
    allCourses: CourseResponseData[];
}

class CourseService {
    static coursesEndpoint = 'core/preview-courses';
    static coursePreviewLinkEnding = 'cover.webp';
    static coursePreviewVideoEnding = 'preview.webp'
    static lessonPreviewLinkEnding = '.webp';
    static pagesCount: number = -1;
    static perPage = 10;
    static coursesList: CourseResponseData[];

    static async getAllCourses(page: number): Promise<GetAllCoursesResponse> {
        const perPage = CourseService.perPage;
        const response = await $api.get<Response>(CourseService.coursesEndpoint);
        const courses = response.data.courses;
        CourseService.coursesList = courses;

        CourseService.pagesCount = Math.ceil(courses.length / perPage);
        const coursesByPage: Map<number, CourseResponseData[]> = new Map();
        splitCoursesByPage();

        if(!coursesByPage.has(page)) {
            throw new IllegalArgumentException('getAllCourses');
        }

        return {
            currentPage: page,
            pagesQty: CourseService.pagesCount,
            coursesPerPage: coursesByPage.get(page) || [],
            allCourses: courses
        }
        

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

    static getAllHashtags(): string[] {
        if (!CourseService.coursesList) return [];
        
        const result: string[] = [];
        CourseService.coursesList
            .flatMap(course => course.tags)
            .forEach(tag => {
                if (!result.find(item => item === tag)) result.push(tag);
            });
        
        return result;
    }
}
export default CourseService;
