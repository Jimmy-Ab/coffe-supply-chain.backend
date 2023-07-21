const mongoose = require('mongoose');
//mongodb://localhost:2717/myapp
const connectDB = async () =>
{
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.DB_NAME,

        useNewUrlParser: true,
        // useCreatIndex: true ,
        useUnifiedTopology: true,
        // useFindAndModify: true
    });

    console.log("MongoDB connected");
}

module.exports = connectDB; 