const mongoose=require('mongoose');

const TransactionSchema= new mongoose.Schema({
    TDate:{
        type:Date,
        required:true
    },
    TType:{
        type:String,
        required:true
    },
    CName:{
        type:String,
        required:true
    },
    TQty:{
        type:Number,
        required:true
    },
    TRate:{
        type:Number,
        required:true
    },
    BuyType:{
        type:String,
    }
});


module.exports = mongoose.model('Transaction',TransactionSchema);

