const Cprofile=require('../models/companyprofile')
const Transac=require('../models/transaction')


var updateCprofile=async function(Cname,quantity,rate,investment){
   var query={CName:Cname}
   var querytran={CName:Cname,TType:"Buy"}
    const cmp=await Cprofile.find(query)
    const trans=await Transac.find(querytran)
    var WACC=  (Number(cmp.map(item=>item.CRate))+rate)/trans.length
    console.log("WACC:- ",WACC)
    Cprofile.updateOne(query,
        {
            $set: {
                CQty: Number(cmp.map(item=>item.CQty))+quantity,
                CInvestment: Number(cmp.map(item=>item.CInvestment))+investment,
                CRate: Number(cmp.map(item=>item.CRate))+rate,
                WACC:WACC
            }
        }
    ).then((result) => {
        console.log(result)
    })

}

module.exports=updateCprofile