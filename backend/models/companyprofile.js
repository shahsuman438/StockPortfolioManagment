const mongoose=require('mongoose');

const CompanyProfileSchema= new mongoose.Schema({
    CSymbol:{
        type:String,
        required:true
    },
    CName:{
        type:String,
        required:true
    },
    CLTP:{
        type:Number,
        default:0
    },
    CQty:{
        type:Number,
        default:0
    },
    CInvestment:{
        type:Number,
        default:0
    },
    CRate:{
        type:Number,
        default:0
    },
    WACC:{
        type:Number,
        default:0
    },
    SoldUnit:{
        type:Number,
        default:0
    },
    SoldValue:{
        type:Number,
        default:0
    },
    ProfitLoss:{
        type:Number,
        default:0
    }
 
});


module.exports = mongoose.model('CompanyProfile',CompanyProfileSchema);

