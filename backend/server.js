const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const BlogRoutes = require('./routes/blog')
const UserRoutes = require('./routes/user')
const PlayerRoutes = require('./routes/players')
const MatchesRoutes = require('./routes/match')
const bodyParser = require('body-parser');
const path = require('path')
const cookieParser = require ('cookie-parser');
const cors = require("cors");
dotenv.config();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Indicates that the credentials (cookies) should be sent over HTTPS.

}));
app.options('*', cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGODB_URI,{
    autoIndex:true
})
.then(()=>console.log('Connect'))
.catch((err)=>console.log(err))



  
 

app.use('/api/blogs',BlogRoutes);
app.use('/user',UserRoutes);
app.use('/api/matches',MatchesRoutes);
app.use('/api/players',PlayerRoutes);


  
  

app.listen(process.env.port,()=>console.log(`Listen ${process.env.PORT}`));