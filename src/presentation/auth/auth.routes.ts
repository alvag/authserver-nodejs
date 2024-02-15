import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import { AuthMiddleware } from '../middlewares';


export class AuthRoutes {


    static get routes(): Router {

        const router = Router();

        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl( datasource );
        const controller = new AuthController( authRepository );

        router.post( '/login', controller.login );
        router.post( '/register', controller.register );
        router.get( '/', AuthMiddleware.validateJWT, controller.getUsers );

        return router;
    }


}
