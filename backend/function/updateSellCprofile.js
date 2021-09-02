const Cprofile=require('../models/companyprofile')
const Transac=require('../models/transaction')


var updateSell=async function(TRA,quantity,Cname,wacc){
    var query={CName:Cname}
    var cmp=await Cprofile.find(query)
    var profitloss=TRA-wacc*quantity
    // var PQty=Number(cmp.map(item=>item.CQty))
    Cprofile.updateOne(query,
        {
            $set: {
                CQty: Number(cmp.map(item=>item.CQty))-quantity,
                SoldUnit: Number(cmp.map(item=>item.SoldUnit))+quantity,
                SoldValue: Number(cmp.map(item=>item.SoldValue))+TRA,
                ProfitLoss:Number(cmp.map(item=>item.ProfitLoss))+profitloss
            }
        }
    ).then((result) => {
        console.log(result)
    })

}

module.exports=updateSell