export interface BaseLog {
    id_user: string;
    id_course: number;
    id_file: number;
    progress: string;
}

export interface LogInterface extends BaseLog {
    num_seq: number;
}