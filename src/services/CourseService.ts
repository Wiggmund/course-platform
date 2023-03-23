import { AxiosResponse } from 'axios';
import { IllegalArgumentException } from '../exceptions';
import $api from '../http';
import { CourseResponseData, ICourse } from '../model';

interface Response {
	courses: CourseResponseData[];
}

export interface GetAllCoursesResponse {
	currentPage: number;
	pagesQty: number;
	coursesPerPage: CourseResponseData[];
	allCourses: CourseResponseData[];
}

export interface GetAllFilteredCoursesResponse extends GetAllCoursesResponse {
	filteredCourses: CourseResponseData[];
}

export interface FilterOptions {
	title: string;
}

class CourseService {
	static coursesEndpoint = 'core/preview-courses';
	static coursePreviewLinkEnding = 'cover.webp';
	static coursePreviewVideoEnding = 'preview.webp';
	static lessonPreviewLinkEnding = '.webp';
	static perPage = 10;
	static coursesByPage: Map<number, CourseResponseData[]>;
	static pagesCount = 1;

	static async fetchAllCourses(): Promise<CourseResponseData[]> {
		const response = await $api.get<Response>(CourseService.coursesEndpoint);
		return response.data.courses;
	}

	static async getAllCourses(page: number): Promise<GetAllCoursesResponse> {
		const courses = await CourseService.fetchAllCourses();
		CourseService.splitCoursesByPage(courses);

		if (!CourseService.coursesByPage.has(page)) {
			throw new IllegalArgumentException('getAllCourses');
		}

		return {
			currentPage: page,
			pagesQty: CourseService.pagesCount,
			coursesPerPage: CourseService.coursesByPage.get(page) || [],
			allCourses: courses
		};
	}

	static async getFilteredCourses(
		page: number,
		{ title }: FilterOptions
	): Promise<GetAllFilteredCoursesResponse> {
		const courses = await CourseService.fetchAllCourses();
		const filteredCourses = courses.filter((course) =>
			new RegExp(`^(${title})`, 'ig').test(course.title)
		);
		CourseService.splitCoursesByPage(filteredCourses);

		if (!CourseService.coursesByPage.has(page)) {
			throw new IllegalArgumentException('getAllCourses');
		}

		return {
			currentPage: page,
			pagesQty: CourseService.pagesCount,
			coursesPerPage: CourseService.coursesByPage.get(page) || [],
			allCourses: courses,
			filteredCourses
		};
	}

	static async getCourseById(courseId: string): Promise<AxiosResponse<ICourse>> {
		return await $api.get<ICourse>(`${CourseService.coursesEndpoint}/${courseId}`);
	}

	static splitCoursesByPage(courses: CourseResponseData[]) {
		const perPage = CourseService.perPage;
		const pagesCount = Math.ceil(courses.length / perPage);

		CourseService.pagesCount = pagesCount;
		CourseService.coursesByPage = new Map();

		let to = perPage;
		let from = 0;
		let skip = 0;
		for (let page = 1; page <= pagesCount; page++) {
			let list;

			if (to >= courses.length) {
				list = courses.slice(from);
			}

			list = courses.slice(from, to);
			CourseService.coursesByPage.set(page, list);

			from = perPage + skip;
			skip += perPage;
			to = from + perPage;
		}
	}
}
export default CourseService;
