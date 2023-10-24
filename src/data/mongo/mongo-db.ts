import * as mongoose from 'mongoose';

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDb {
    static async connect( options: ConnectionOptions ) {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect( mongoUrl, {
                dbName,
            } );

            console.log( 'Connected to mongo db' );
        } catch ( error ) {
            console.log( 'Error connecting to mongo' );
            throw error;
        }
    }
}
