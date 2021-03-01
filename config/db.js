const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async() => {
    try {
        await mongoose.connect(db ,{
            useNewUrlParser: true ,
            useUnifiedTopology: true ,
            useCreateIndex: true,
            useFindAndModify:false
        })

        console.log("Mongoose Connected")
        
    } catch (error) {

        console.error(error.message);

        // Exit Process with failure
        process.exit(1)
        
        
    }
}

export default connectDB