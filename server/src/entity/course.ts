import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Category } from './category';
import { FileCourse } from './file-course';

@Entity('NL_CR_COURSES')
export class Course {
    @PrimaryGeneratedColumn()
    num_seq: number = 0;

    @Column({ length: 200 })
    name: string = '';

    @Column({ length: 200 })
    createdBy: string = '';

    //Vários cursos podem pertencer a mesma categoria
    @ManyToOne(() => Category, category => category.num_seq, { nullable: false, eager: true })
    @JoinColumn({ name: "id_category" })
    id_category: number = 0;

    @OneToMany(() => FileCourse, file_course => file_course.file)
    file_course? : FileCourse[];

}