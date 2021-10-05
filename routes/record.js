const express = require('express');
const router = express.Router();
const recordModel = require('../models/recordModel');

router.post('/', async (req,res)=>{
    try {

        let {startDate, endDate, minCount, maxCount} = req.body;

        let filteredRecords = await recordModel.filterByDateAndCount(startDate, endDate, minCount, maxCount);

        res.send({code: 0, msg: "Success", records: filteredRecords})

    } catch(error) {
        console.log("Error getting filtered records ", error);
        res.status(500).json({code: 2, msg : "Something went wrong"})
    }
});


module.exports = router;