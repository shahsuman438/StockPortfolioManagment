const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const companyprofile = require('../models/companyprofile');
const jsonparser = bodyparser.json();



router.get('/', async (req, res) => {
    try {

        const Cprofile = await companyprofile.find()
        console.log(Cprofile)
        res.json(Cprofile)

    } catch (err) {
        res.send('Error:- ', err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        companyprofile.findById(req.params.id).then((data) => {
            res.json(data)
        })
    } catch (err) {
        res.send('Error:- ', err)
    }
});


router.post('/', async (req, res) => {
    const Cprofile = new companyprofile({
        CSymbol: req.body.CSymbol,
        CName: req.body.CName,
        CLTP: req.body.CLTP,
        CQty: req.body.CQty,
        CInvestment: req.body.CInvestment,
        CRate: req.body.CRate,
    })
    try {
        const S1 = await Cprofile.save()
        res.json({ "msg": "Data Created" })
    }
    catch (err) {
        res.send('Error', err)
    }
});

router.put('/:id', jsonparser, async (req, res) => {
    try {

        companyprofile.updateOne({ _id: req.params.id },
            {
                $set: {
                    CSymbol: req.body.CSymbol,
                    CName: req.body.CName,
                    CLTP: req.body.CLTP,
                    CQty: req.body.CQty,
                    CInvestment: req.body.CInvestment,
                    CRate: req.body.CRate
                }
            }
        ).then((result) => {
            res.json(result)
        })
        // res.json(student)
    } catch (err) {
        res.send('Error:- ', err)
    }
});


router.delete('/:id',async(req,res)=>{
    try{
        companyprofile.deleteOne({_id:req.params.id}).then((result)=>{
            
            res.json(result);
        })
        res.json({"msg":"Deleted Success"})
    }catch(err){
        res.end("Error:-",err)
    }
})

module.exports = router