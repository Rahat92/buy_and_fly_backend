const app = require('./app');
// const connectToDb = require('./utils/dbConnect');

// connectToDb()
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('app is running on port ', port )
})