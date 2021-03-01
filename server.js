import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db'
import routes from './routes'


dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended:true}));

app.use(cors());

app.get('/' , (req ,res) => res.send('API RUNNING'));

// Define Routes
routes(app);
//app.use('/api/v1/product' , require('./routes/product'));

//app.use('/' , require('./routes/facebook_login'));

// app.use('/api/profile' , require('./routes/profile'));
// app.use('/api/v1/auth' , require('./routes/auth'));
// app.use('/api/posts' , require('./routes/posts'));


const PORT = process.env.SERVER_PORT || 3001 ;

app.listen(PORT , () => console.log(`SERVER STARTED ON PORT ${PORT}`));


 