import { Category } from './category';

export interface Course {
  num_seq: string;
  name: string;
  createdBy: string;
  id_category: Category;
}
