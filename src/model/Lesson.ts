export interface ILesson {
    id: string;
    title: string;
    duration: number;
    order: number;
    type: string;
    status: 'locked' | 'unlocked';
    link: string;
    previewImageLink: string;
    meta: null;
}