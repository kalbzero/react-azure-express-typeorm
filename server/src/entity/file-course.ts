import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Course } from "./course";
import { File } from "./file";

@Entity("NL_CR_COURSES_FILES")
export class FileCourse {
  @PrimaryGeneratedColumn()
  num_seq: number = 0;

  @ManyToOne(() => File, (file) => file.file_course, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: "id_file" })
  file: File = {} as File;

  @ManyToOne(() => Course, (course) => course.file_course, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: "id_course" })
  course: Course = {} as Course;

  @Column()
  id_course: number = 0;

  @Column()
  id_file: number = 0;
}
