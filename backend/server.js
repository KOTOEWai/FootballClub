const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const BlogRoutes = require('./routes/blog')
const UserRoutes = require('./routes/user')
const PlayerRoutes = require('./routes/players')
const MatchesRoutes = require('./routes/match')
const TicketRoutes = require('./routes/tickets')
const bodyParser = require('body-parser');
const path = require('path')
const cookieParser = require ('cookie-parser');
const cors = require("cors");
const ProductRoutes = require('./routes/product')

dotenv.config();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cookieParser());


  app.use(cors({
    origin: 'http://localhost:5173', // Match frontend URL
    credentials: true, // Allow cookies and authorization headers
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'], // Include all methods you use
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
app.use('/api/tickets',TicketRoutes);
app.use('/api/products',ProductRoutes);

  
  

app.listen(process.env.port,()=>console.log(`Listen ${process.env.PORT}`));