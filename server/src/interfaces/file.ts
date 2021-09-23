export interface BaseFile {
    name: string;
    url: string;
}

export interface FileInterface extends BaseFile {
    num_seq: number;
}