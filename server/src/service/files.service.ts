/**
 * Data Model Interfaces
 */
import { FileInterface, BaseFile } from '../interfaces/file';
import { File } from '../entity/file';
import { getRepository } from 'typeorm';

/**
 * Service Methods
 */
export const findAll = async (): Promise<FileInterface[]> => { 
    const list = await getRepository<FileInterface>(File).find({
        order: {
            name: 'ASC'
        }
    });
    return list;
 };

export const find = async (num_seq: number): Promise<FileInterface | undefined> => { 
    const obj = await getRepository<FileInterface>(File).findOne({ num_seq });
    return obj;
};

export const findOne = async (file: BaseFile) => {
    const obj = await getRepository<FileInterface>(File).findOne({ where: {name: file.name, url: file.url} });
    return obj;
};

export const create = async (newFile: BaseFile): Promise<FileInterface> => { 
    return await getRepository<FileInterface>(File).save(newFile);
};

export const update = async ( num_seq: number, fileUpdate: BaseFile ): Promise<FileInterface | null> => {
    const file = await find(num_seq);

    if (!file) {
        return null;
    }

    const obj: FileInterface = {
        num_seq,
        name: fileUpdate.name,
        url: fileUpdate.url
    };

    return await getRepository<FileInterface>(File).save(obj);
}

export const remove = async ( num_seq: number ): Promise<null | void> => {
    const file = await find(num_seq);

    if (!file) {
        return null;
    }

    getRepository(File).delete(num_seq);
}