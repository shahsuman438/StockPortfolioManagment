
var SellTaxcalculator = function (rate, quantity, wacc) {
    var amt = rate * quantity
    var BComm = BCommChrg(amt)
    var Sebon = (amt * 0.015) / 100
    var dp = 25
    var TRAmt = 0
    if (rate > wacc) {
        var waccamt = wacc * quantity
        var diff = amt - waccamt
        var profitamt = diff - BComm - Sebon - dp

        var CGT = (profitamt * 7.5) / 100

        TRAmt = amt - BComm - Sebon - dp - CGT

        return TRAmt
    } else {
        TRAmt = amt - BComm - Sebon - dp;
        return TRAmt
    }

}

function BCommChrg(amt) {
    if (amt <= 50000) {
        var calc = (amt * 0.40) / 100
        if (calc < 10) {
            calc = 10
        }
        return calc
    }
    else if (amt > 50000 && amt <= 5000000) {
        var calc = (amt * 0.37) / 100
        if (calc < 10) {
            calc = 10
        }
        return calc
    }
    else if (amt > 5000000 && amt <= 2000000) {
        var calc = (amt * 0.34) / 100
        if (calc < 10) {
            calc = 10
        }
        return calc
    }
    else if (amt > 2000000 && amt < 10000000) {
        var calc = (amt * 0.30) / 100
        if (calc < 10) {
            calc = 10
        }
        return calc
    }
    else {
        var calc = (amt * 0.27) / 100
        if (calc < 10) {
            calc = 10
        }
        return calc
    }
}

module.exports = SellTaxcalculator