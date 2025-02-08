import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://ducminhtlu:Ducminhxp.tp2811@cluster0.twtrp.mongodb.net/blog-app');
    console.log("DB Connected")
}

