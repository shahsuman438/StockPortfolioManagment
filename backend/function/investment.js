
var Buyinvestment=function(rate,quantity,btype){
    if (btype=="IPO"){
        var amt=rate*quantity
    return amt
    }
    else{
        var amt=rate*quantity
        var BComm=BCommChrg(amt)
        // console.log("Broker comm:- ",BComm)
        var Sebon=(amt*0.015)/100
        // console.log("SEBON COMM:-", Sebon)
        var dp=25
        var Tamt=amt+BComm+Sebon+dp
        return(Tamt)
    }
}

function BCommChrg(amt){
    if(amt<=50000)
    {
        var calc=(amt*0.40)/100
        if (calc<10){
            calc=10
        }
        return calc
    }
    else if(amt>50000 && amt<=5000000){
        var calc=(amt*0.37)/100
        if (calc<10){
            calc=10
        }
        return calc
    }
    else if(amt>5000000 && amt<=2000000){
        var calc=(amt*0.34)/100
        if (calc<10){
            calc=10
        }
        return calc
    }
    else if(amt>2000000 && amt<10000000){
        var calc=(amt*0.30)/100
        if (calc<10){
            calc=10
        }
        return calc
    }
    else{
        var calc=(amt*0.27)/100
        if (calc<10){
            calc=10
        }
        return calc
    }
}

module.exports=Buyinvestment