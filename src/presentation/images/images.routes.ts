import { Router } from 'express';
import { ImagesController } from './images.controller';

export class ImagesRoutes {
    static get routes(): Router {
        const router = Router();

        const controller = new ImagesController();

        router.get( '/:type/:img', controller.getImage );

        return router;
    }
}
