import { AppRoutes, Server } from './presentation';
import { envs } from './config';

( async () => {
    main();
} )();


function main() {

    const server = new Server( {
        port: envs.PORT,
        routes: AppRoutes.routes,
    } );

    server.start();
}
