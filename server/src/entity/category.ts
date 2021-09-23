import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany, ManyToMany, JoinColumn } from "typeorm";
import { Course } from './course';
import { FileCategory } from './file-category';

@Entity('NL_CL_CATEGORIES')
export class Category {
    @PrimaryGeneratedColumn()
    num_seq: number = 0;

    @Column({ length: 200 })
    name: string = '';

    // Uma categoria pode existir em vários cursos
    @OneToMany(() => Course, course => course.id_category)
    @JoinColumn()
    courses?: Course[];

    @OneToMany(() => FileCategory, file_course => file_course.file)
    file_category? : FileCategory[];
}