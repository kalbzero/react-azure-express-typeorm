import { Category } from './category';
import { Course } from './course';

export interface File {
  num_seq: string;
  name: string;
  url: string;
  id_course: Course;
  id_category: Category;
}
