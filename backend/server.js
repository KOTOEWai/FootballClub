const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const BlogRoutes = require('./routes/blog')
const UserRoutes = require('./routes/user')
const PlayerRoutes = require('./routes/players')
const MatchesRoutes = require('./routes/match')
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('Connect'))
.catch((err)=>console.log(err))

app.use('/api/blogs',BlogRoutes);
app.use('/user',UserRoutes);
app.use('/api/matches',MatchesRoutes);
app.use('/api/players',PlayerRoutes);
app.listen(process.env.port,()=>console.log(`Listen ${process.env.PORT}`));