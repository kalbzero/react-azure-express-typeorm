/**
 * Data Model Interfaces
 */
import { CategoryInterface, BaseCategory } from '../interfaces/category';
import { Category } from '../entity/category';
import { getRepository, Like } from 'typeorm';

/**
 * Service Methods
 */
export const findAll = async (searchTerm: string = ''): Promise<CategoryInterface[]> => { 
    if(searchTerm == ''){
        const list = await getRepository<CategoryInterface>(Category).find({
            order: {
                name: 'ASC'
            }
        });
        return list;
    } else {
        const list = await getRepository<CategoryInterface>(Category).find({
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

export const find = async (num_seq: number): Promise<CategoryInterface | undefined> => { 
    const obj = await getRepository<CategoryInterface>(Category).findOne({ num_seq });
    return obj; 
};

export const create = async (newCategory: BaseCategory): Promise<CategoryInterface> => { 
    return await getRepository<CategoryInterface>(Category).save(newCategory);
};

export const update = async ( num_seq: number, categoryUpdate: BaseCategory ): Promise<CategoryInterface | null> => {
    const file = await find(num_seq);

    if (!file) {
        return null;
    }

    const obj: CategoryInterface = {
        num_seq,
        name: categoryUpdate.name,
    };

    return await getRepository<CategoryInterface>(Category).save(obj);
}

export const remove = async ( id: number ): Promise<null | void> => {
    const file = await find(id);

    if (!file) {
        return null;
    }

    getRepository(Category).delete(id);
}