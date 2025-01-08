//import { url } from "inspector";
import mongoose from "mongoose";



export const Connection = async (username,password) => {
    const URL = `mongodb+srv://${username}:${password}@flipkart.3ps8e.mongodb.net/flipkart?retryWrites=true&w=majority&appName=flipkart`;
    try{
        await mongoose.connect(URL, { /*useUnifiedTopology: true*/ });
        console.log('Database connected successfully');
    }catch (error){
        console.log('error while connecting with the database',error.message);
    }
}

export default Connection;