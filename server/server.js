const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbconnection')

dotenv.config();
connectDB();
const app = express();


const port = process.env.PORT || 5001;

app.use(express.json());

app.use('/api/users', require('./router/userRoutes'));
app.use("/api/team", require("./router/teamRouter"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
