/**
 * Data Model Interfaces
 */
import { CourseInterface, BaseCourse } from '../interfaces/course';
import { Course } from '../entity/course';
import { getRepository, Like } from 'typeorm';

/**
 * Service Methods
 */
export const findAll = async (searchTerm: string = ''): Promise<CourseInterface[]> => { 
    if(searchTerm == ''){
        const list = await getRepository<CourseInterface>(Course).find({
            order: {
                name: 'ASC'
            }
        });
        return list;
    } else {
        const list = await getRepository<CourseInterface>(Course).find({
            where: { 
                name: Like(`%${searchTerm}%`), 
            },
            order: {
                name: 'ASC'
            }
        });
        return list;
    }
};

export const find = async (num_seq: number | undefined): Promise<CourseInterface | undefined> => { 
    const obj = await getRepository<CourseInterface>(Course).findOne({ num_seq: num_seq });
    return obj;
};

export const create = async (newCourse: BaseCourse): Promise<CourseInterface> => {
    return await getRepository<CourseInterface>(Course).save(newCourse);
};

export const update = async ( num_seq: number, courseUpdate: BaseCourse ): Promise<CourseInterface | null> => {
    const file = await find(num_seq);

    if (!file) {
        return null;
    }

    const obj: CourseInterface = {
        num_seq: num_seq,
        name: courseUpdate.name,
        createdBy: courseUpdate.createdBy,
        id_category: courseUpdate.id_category
    };

    return await getRepository<CourseInterface>(Course).save(obj);
}

export const remove = async ( id: number ): Promise<null | void> => {
    const file = await find(id);

    if (!file) {
        return null;
    }

    getRepository(Course).delete(id);
}