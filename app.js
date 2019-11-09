const express = require('express')
require('./db/mongoose')
const app = express();
const userRouter = require('./routers/main')
const bodyParser = require('body-parser')

const port = 3000 | process.env.PORT;

app.use(express.static('./public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
  
app.use(userRouter);

app.listen(port,()=>{
    console.log(`server is up at port ${port}`)
})