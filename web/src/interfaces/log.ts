import { Course } from './course';
import { File } from './file';

export interface Log {
  id: string;
  id_user: string;
  id_course: Course;
  id_file: File;
  progress: string;
}
