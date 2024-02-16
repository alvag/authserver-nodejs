import { MongoDb } from '../mongo/mongo-db';
import { envs } from '../../config';
import { UserModel } from '../mongo/models/user.model';
import { ProductModel } from '../mongo/models/product.model';
import { CategoryModel } from '../mongo/models/category.model';
import { seedData } from './data';

( async () => {
    await MongoDb.connect( {
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    } );

    await main();

    await MongoDb.disconnect();
} )();

const randomBetween0AndX = ( x: number ) => Math.floor( Math.random() * x );

async function main() {
    await Promise.all( [
        UserModel.deleteMany(),
        ProductModel.deleteMany(),
        CategoryModel.deleteMany(),
    ] );

    const users = await UserModel.insertMany( seedData.users );

    const categories = await CategoryModel.insertMany(
        seedData.categories.map( category => {
            return {
                ...category,
                user: users[ randomBetween0AndX( users.length ) ]._id,
            };
        } ),
    );

    await ProductModel.insertMany(
        seedData.products.map( product => {
            return {
                ...product,
                user: users[ randomBetween0AndX( users.length ) ]._id,
                category: categories[ randomBetween0AndX( categories.length ) ]._id,
            };
        } ),
    );


}
