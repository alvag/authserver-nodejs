import { isValidObjectId } from 'mongoose';

export class Validators {

    static isMongoID( id: string ): boolean {
        return isValidObjectId( id );
    }

}
