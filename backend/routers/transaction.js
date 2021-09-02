const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const transaction = require('../models/transaction');
const jsonparser = bodyparser.json();
const inv = require('../function/investment')
const Cprofile = require('../models/companyprofile')
const uProfile = require('../function/updateCprofile')
const SellTax = require('../function/SellTaxCalc')
const upSell=require('../function/updateSellCprofile')


router.get('/', async (req, res) => {
    try {

        const Transactions = await transaction.find()
        console.log(Transactions)
        res.json(Transactions)

    } catch (err) {
        res.send('Error:- ', err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        transaction.findById(req.params.id).then((data) => {
            res.json(data)
        })
    } catch (err) {
        res.send('Error:- ', err)
    }
});

router.post('/', async (req, res) => {
    const Transac = new transaction({
        TDate: new Date(req.body.TDate),
        TType: req.body.TType,
        CName: req.body.CName,
        TQty: req.body.TQty,
        TRate: req.body.TRate,
        BuyType: req.body.BuyType
    })
    try {
        if (req.body.TType == "Buy") {
            const S1 = await Transac.save()
            var investment = inv(req.body.TRate, req.body.TQty, req.body.BuyType)
            query = { CName: req.body.CName }
            const cmp = await Cprofile.find(query)
            var TotalRecAmt = SellTax(Number(cmp.map(item => item.TRate)), Number(cmp.map(item => item.TQty)), Number(cmp.map(item => item.WACC)))
            console.log("Total Receive Amount(LTP):-",TotalRecAmt)
            uProfile(req.body.CName, req.body.TQty, req.body.TRate, investment);
            console.log("stock id:=", req.body.CName)
            res.json("Stock Bought")
        } else if (req.body.TType == "Sell") {
            query = { CName: req.body.CName }
            const cmp = await Cprofile.find(query)
            var avlqty = Number(cmp.map(item => item.CQty))
            if (req.body.TQty <= avlqty) {
                var WACC = Number(cmp.map(item => item.WACC));
                console.log("WACC=:=", WACC);
                var TotalRecAmt = SellTax(req.body.TRate, req.body.TQty, WACC)
                const S1 = await Transac.save()
                upSell(TotalRecAmt,req.body.TQty,req.body.CName,WACC)
                res.json("Stock Successfully Sold")
            } else {
                console.log("Stock NOT Available")
                res.json("Stock NOT Available")
            }
        }

    }
    catch (err) {
        res.send('Error:--', err)
    }
});

router.put('/:id', jsonparser, async (req, res) => {
    try {

        transaction.updateOne({ _id: req.params.id },
            {
                $set: {
                    TDate: new Date(req.body.TDate),
                    TType: req.body.TType,
                    CName: req.body.CName,
                    TQty: req.body.TQty,
                    TRate: req.body.TRate
                }
            }
        ).then((result) => {
            res.json({ "msg": "Updated Successfuly" })
        })
        // res.json(student)
    } catch (err) {
        res.send('Error:- ', err)
    }
});




router.delete('/:id', async (req, res) => {
    try {
        transaction.deleteOne({ _id: req.params.id }).then((result) => {

            res.json(result);
        })
        res.json("Deleted Success")
    } catch (err) {
        res.end("Error:-", err)
    }
})

module.exports = router