/** @format */

require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/users/users');
const postRoutes = require('./routes/posts/posts');
const commentRoutes = require('./routes/comments/comments');

require('./config/dbConnect');

const app = express();

//middlewares
//------------
app.use(express.json()); //pass incoming data
//users route
//------------
app.use('/api/v1/users', userRoutes);

//------------
//posts route
app.use('/api/v1/posts', postRoutes);

//comments
app.use('/api/v1/comments', commentRoutes);

//Error handler middlewares
//------------
//listen server
//------------
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is up and running on PORT ${PORT}`));
