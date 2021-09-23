import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./category";
import { File } from "./file";

@Entity("NL_CR_CATEGORIES_FILES")
export class FileCategory {
  @PrimaryGeneratedColumn()
  num_seq: number = 0;

  @ManyToOne(() => File, (file) => file.file_course, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: "id_file" })
  file: File = {} as File;

  @ManyToOne(() => Category, (category) => category.file_category, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: "id_category" })
  category: Category = {} as Category;

  @Column()
  id_category: number = 0;

  @Column()
  id_file: number = 0;
}
