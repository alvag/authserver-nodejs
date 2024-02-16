import { Router } from 'express';
import { CategoryController } from './category.controller';
import { CategoryService } from '../services';


export class CategoryRoutes {


    static get routes(): Router {

        const router = Router();

        const controller = new CategoryController( new CategoryService() );

        router.get( '/', controller.getCategories );
        router.post( '/', controller.createCategory );

        return router;
    }


}
