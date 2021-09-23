/**
 * Data Model Interfaces
 */
import { LogInterface, BaseLog } from '../interfaces/log';
import { Log } from '../entity/log';
import { getRepository } from 'typeorm';


// createConnection(/*prod*/).then().catch( (error) => { console.log(error); });
/**
 * Service Methods
 */
export const findAll = async (id_user: string = ''): Promise<LogInterface[]> => { 
    if(id_user == ''){
        const list = await getRepository<LogInterface>(Log).find({
            order: {
                id_user: 'ASC'
            }
        });
        return list;
    } else {
        const list = await getRepository<LogInterface>(Log).find({
            where: { 
                id_user: id_user, 
            }
        });
        return list;
    }
};

export const find = async (num_seq: number): Promise<LogInterface | undefined> => { 
    const obj = await getRepository<LogInterface>(Log).findOne({ num_seq });
    return obj;
};

export const create = async (newLog: BaseLog): Promise<LogInterface> => { 
    return await getRepository<LogInterface>(Log).save(newLog);
};

export const update = async ( num_seq: number, logUpdate: BaseLog ): Promise<LogInterface | null> => {
    const file = await find(num_seq);

    if (!file) {
        return null;
    }

    const obj: LogInterface = {
        num_seq,
        id_user: logUpdate.id_user,
        id_course: logUpdate.id_course,
        id_file: logUpdate.id_file,
        progress: logUpdate.progress
    };

    return await getRepository<LogInterface>(Log).save(obj);
}

export const remove = async ( num_seq: number ): Promise<null | void> => {
    const file = await find(num_seq);

    if (!file) {
        return null;
    }

    getRepository(Log).delete(num_seq);
}