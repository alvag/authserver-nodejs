import { Router } from 'express';
import { ProductsController } from './products.controller';
import { AuthMiddleware } from '../middlewares';
import { ProductsService } from '../services';


export class ProductsRoutes {


    static get routes(): Router {

        const router = Router();

        const controller = new ProductsController( new ProductsService() );

        router.get( '/', controller.getProducts );
        router.post( '/', AuthMiddleware.validateJWT, controller.createProduct );

        return router;
    }


}
