import { Router } from 'express';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from '../services';
import { FileUploadMiddleware, TypeMiddleware } from '../middlewares';

export class FileUploadRoutes {
    static get routes(): Router {
        const router = Router();

        router.use( FileUploadMiddleware.containFiles );
        router.use( TypeMiddleware.validTypes( [ 'users', 'products', 'categories' ] ) );

        const controller = new FileUploadController( new FileUploadService() );

        router.post( '/single/:type', controller.uploadFile );
        router.post( '/multiple/:type', controller.uploadMultipleFiles );

        return router;
    }
}
