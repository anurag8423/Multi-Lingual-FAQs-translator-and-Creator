import express from "express";
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import cors from"cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import FAQROUTER from "./routes/faqRoutes.js";

//database models
import FAQ from "./models/faqModel.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

app.use("/api/faqs", FAQROUTER);

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to database");
    } catch (error) {
        console.error("error connecting to database");
    }
};

connect();

// AdminJS Configuration
AdminJS.registerAdapter(AdminJSMongoose);
const adminJs = new AdminJS({
    resources: [
        { resource: FAQ, options: { parent: { name: 'FAQ Management' } }}
    ],
    rootPath: '/admin',
})
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);


const server = app.listen(3000, ()=>{
    console.log("server is running on http://localhost:3000");
    console.log(`Admin panel: http://localhost:3000/admin`);
});

export { app, server };