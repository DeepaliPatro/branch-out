import { connect, ConnectOptions } from 'mongoose';

export const db = () => {
    connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log('db connection successful.'),
        (error) => console.log(error)   
    )
}