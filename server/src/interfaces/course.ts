export interface BaseCourse {
    name: string;
    createdBy: string;
    id_category: number;
    category?: string;
}

export interface CourseInterface extends BaseCourse {
    num_seq: number;
}