//importing depenencies 

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'; 

const app = express();

//starting path for all the routes


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true})); //propery send a request
app.use(cors());

app.use('/posts', postRoutes);


const CONNECTION_URL = 'mongodb+srv://adnanhabib:spooderman16@cluster0.8zd2l.mongodb.net/<dbname>?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

//connects to database
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>app.listen(PORT, () => console.log(`Server runiing on port: ${PORT}`)))
.catch((error) => console.log(error.message) )

mongoose.set('useFindAndModify', false);