import { Router } from 'express';
import { AuthRoutes } from './auth';
import { CategoryRoutes } from './category';
import { AuthMiddleware } from './middlewares';


export class AppRoutes {


    static get routes(): Router {

        const router = Router();

        router.use( '/api/auth', AuthRoutes.routes );
        router.use( '/api/categories', AuthMiddleware.validateJWT, CategoryRoutes.routes );

        return router;
    }


}
