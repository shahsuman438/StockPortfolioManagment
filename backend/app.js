const express = require ('express');
const mangoose = require('mongoose');
const app = express(); 
const url = 'mongodb://localhost/companyprofile'
const cors=require('cors')


// Database Settings

mangoose.connect(url, {useNewUrlParser:true})
const con=mangoose.connection
con.on('open',()=>{
    console.log("Database conection success..")
})
app.use(cors())
app.use(express.json())
//Router seting for student
const CompanyProfileRouter=require ('./routers/companyprofile')
const transactionRouter=require('./routers/transaction')
app.use('/Company',CompanyProfileRouter);
app.use('/Transac',transactionRouter);

app.listen(3000,()=>{
    console.log("Server Started...")
})