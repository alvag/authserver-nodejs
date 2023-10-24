import { AppRoutes, Server } from './presentation';
import { envs } from './config';
import { MongoDb } from './data';

( async () => {
    main();
} )();


async function main() {

    await MongoDb.connect( {
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    } );

    const server = new Server( {
        port: envs.PORT,
        routes: AppRoutes.routes,
    } );

    server.start();
}
