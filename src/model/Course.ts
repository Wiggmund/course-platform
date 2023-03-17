import ILesson from "./Lesson";

interface ICourse {
    id: string;
    title: string;
    tags: string[];
    launchDate: string;
    status: string;
    description: string;
    duration: number;
    previewImageLink: string;
    rating: number;

    meta: IMetaInformation;

    lessons: ILesson[];

    containsLockedLessons: boolean;
}

interface IMetaInformation {
    slug: string;
    skills?: string[];
    courseVideoPreview?: ICourseVideoPreview;
    fullCourseProductId?: string;
    fullCourseProductFamily?: string;
}

interface ICourseVideoPreview {
    link: string;
    duration: number;
    previewImageLink: string;
}

export type CourseResponseData = Omit<ICourse, "lessons"> & {
    lessonsCount: number;
};

export default ICourse;

