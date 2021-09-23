/**
 * Data Model Interfaces
 */
import { FileCourseInterface } from '../interfaces/file-course';
import { FileCourse } from '../entity/file-course';
import { getRepository } from 'typeorm';

 /**
 * Service Methods
 */
export const find = async (body: FileCourseInterface): Promise<FileCourseInterface[]> => {
    const response = await getRepository<FileCourseInterface>(FileCourse).find({
        where: { 
            id_course: body.id_course,
            id_file: body.id_file 
        },
    });
    console.log('2', response);
    return response;
};

export const create = async (body: FileCourseInterface) => {
    return await getRepository<FileCourseInterface>(FileCourse).save(body);
};