import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { FileCourse } from './file-course';
import { FileCategory } from './file-category';

@Entity('NL_CR_FILES')
export class File {
    @PrimaryGeneratedColumn()
    num_seq: number = 0;

    @Column({ length: 200 })
    name: string = '';

    @Column({ length: 200 })
    url: string = '';

    @OneToMany(() => FileCourse, file_course => file_course.file)
    file_course? : FileCourse[];

    @OneToMany(() => FileCategory, file_category => file_category.file)
    file_category? : FileCategory[];
}