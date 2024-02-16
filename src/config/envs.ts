import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

    PORT: get( 'PORT' ).required().asPortNumber(),
    MONGO_URL: get( 'MONGO_URL' ).required().asString(),
    MONGO_DB_NAME: get( 'MONGO_DB_NAME' ).required().asString(),
    JWT_SECRET_KEY: get( 'JWT_SECRET_KEY' ).required().asString(),
    MAIL_SERVICE: get( 'MAIL_SERVICE' ).required().asString(),
    MAILER_EMAIL: get( 'MAILER_EMAIL' ).required().asEmailString(),
    MAILER_SECRET_KEY: get( 'MAILER_SECRET_KEY' ).required().asString(),
    WEB_APP_URL: get( 'WEB_APP_URL' ).required().asString(),
    SEND_EMAIL: get( 'SEND_EMAIL' ).default( 'false' ).asBool(),
};
