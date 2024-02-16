import { Router } from 'express';
import { AuthRoutes } from './auth';
import { CategoryRoutes } from './category';
import { ProductsRoutes } from './products';


export class AppRoutes {


    static get routes(): Router {

        const router = Router();

        router.use( '/api/auth', AuthRoutes.routes );
        router.use( '/api/categories', CategoryRoutes.routes );
        router.use( '/api/products', ProductsRoutes.routes );

        return router;
    }


}
