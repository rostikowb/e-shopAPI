import mongoose from 'mongoose';
export const mongoConnection = () => {
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useCreateIndex', true);
    mongoose.connect(
        // `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}`,
        `mongodb://127.0.0.1:27017/eShop`,
        //     error =>{
        //     if (error)  throw error
        // },
        { useCreateIndex: true, useNewUrlParser: true },

    );


    mongoose.connection.on('error', () => {
        throw new Error('Unable to connect to database');
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose default connection disconnected');
    });
};
