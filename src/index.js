import express from 'express';
import mongoose from 'mongoose';
import hanldebars from 'express-handlebars';
import expressSession from 'express-session'

import routes from './routes.js';
import cookieParser from 'cookie-parser';
import { auth } from './middlewares/authMiddleware.js';
import { tempData } from './middlewares/tempData.js';

const app = express();

// Db setup

try {
    const uri = 'mongodb://localhost:27017/second-hand-electronics';
    await mongoose.connect(uri)

    console.log('DB connected')
} catch (err) {
    console.log('Can not connect to DB!');
    console.log(err.message)
}

// Hanldebars setup 
app.engine('hbs', hanldebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        setTitle(title) {
            this.pageTitle = title;
        }
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

// Express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser()); 
app.use(expressSession({
    secret: 'asdasdasd',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true}
}));
app.use(auth);
app.use(tempData);
app.use(routes);


app.listen(3000, ()=> console.log('Server is listening on http://localhost:3000...'));