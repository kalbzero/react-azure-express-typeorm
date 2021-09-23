/**
 * Data Model Interfaces
 */
import { FileCategoryInterface } from '../interfaces/file-category';
import { FileCategory } from '../entity/file-category';
import { getRepository } from 'typeorm';

/**
 * Service Methods
 */
export const find = async (body: FileCategoryInterface): Promise<FileCategoryInterface[]> => {
    const response = await getRepository<FileCategoryInterface>(FileCategory).find({
        where: { 
            id_category: body.id_category,
            id_file: body.id_file 
        },
    });
    return response;
};

export const create = async (body: FileCategoryInterface) => {
    return await getRepository<FileCategoryInterface>(FileCategory).save(body);
};