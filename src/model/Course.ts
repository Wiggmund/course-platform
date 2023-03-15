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
    skills: string[];
    courseVideoPreview: ICourseVideoPreview;
}

interface ICourseVideoPreview {
    link: string;
    duration: number;
    previewImageLink: string;
}

export type CourseResponseData = Omit<ICourse, "lessons" | "containsLockedLessons"> & {
    lessonsCount: number;
};

export default ICourse;

