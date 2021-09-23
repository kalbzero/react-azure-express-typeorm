/**
 * Data Model Interfaces
 */
import { Search } from '../interfaces/search';
import { Course } from '../entity/course';
import { getRepository, Like } from 'typeorm';

/**
 * Service Methods
 */
 export const find = async (searchTerm: string = ''): Promise<Course[]> => {
    let list:any[] =[];
    if(searchTerm == ''){ 
        return list;
    } else {
        list = await getRepository(Course).find({
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