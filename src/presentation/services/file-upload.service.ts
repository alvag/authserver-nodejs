import path from 'path';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import { Uuid } from '../../config';
import { CustomError } from '../../domain/errors';

export class FileUploadService {

    constructor(
        private readonly uuid = Uuid.v4,
    ) {
    }

    private checkFolder( folderPath: string ) {
        if ( !fs.existsSync( folderPath ) ) {
            fs.mkdirSync( folderPath );
        }
    }

    async uploadSingle(
        file: UploadedFile,
        folderPath: string = 'uploads',
        validExtensions: string[] = [ 'png', 'jpg', 'jpeg', 'gif' ],
    ) {

        try {
            const fileExtension = file.mimetype.split( '/' ).at( 1 );

            if ( !validExtensions.includes( fileExtension ?? '' ) ) {
                throw CustomError.badRequest( `Invalid file extension. Valid extensions: ${ validExtensions.join( ', ' ) }` );
            }

            const destination = path.resolve( __dirname, '../../../', folderPath );
            this.checkFolder( destination );

            const fileName = `${ this.uuid() }.${ fileExtension }`;

            await file.mv( `${ destination }/${ fileName }` );

            return { fileName };

        } catch ( error ) {
            console.log( `Error: ${ error }` );
            throw error;
        }

    }

    async uploadMultiple(
        file: UploadedFile[],
        folderPath: string = 'uploads',
        validExtensions: string[] = [ 'png', 'jpg', 'jpeg', 'gif' ],
    ) {

        const fileNames = await Promise.all( file.map( async ( file ) => this.uploadSingle( file, folderPath, validExtensions ) ) );

        return fileNames;

    }

}
