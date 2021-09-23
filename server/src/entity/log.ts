import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Course } from './course';
import { File } from './file';

@Entity('NL_CR_LOGS')
export class Log {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({ length: 200 })
    id_user: string = '';

    @Column({ length: 200 })
    progress: string = '';

    //Vários logs podem ter o mesmo Curso
    @ManyToOne(() => Course, course => course.num_seq, { nullable: false, eager: true })
    @JoinColumn({ name: "id_course" })
    id_course: number = 0;;

    //Vários logs podem ter o mesmo File
    @ManyToOne(() => File, file => file.num_seq, { nullable: false, eager: true })
    @JoinColumn({ name: "id_file" })
    id_file: number = 0;;

}