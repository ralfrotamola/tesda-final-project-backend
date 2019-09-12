const 
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = express();

const productRoute = require('./routes/product');
const userRoute = require('./routes/user')

//Middlewares
app.use(bodyParser.json());
app.use(cors());

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongo
mongoose
    .set('useUnifiedTopology', true)
    .set('useNewUrlParser', true)
    .connect(db)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

// Routes
app.use("/", productRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
