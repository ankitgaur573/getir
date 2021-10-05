const express = require('express');
const router = express.Router();
const recordModel = require('../models/recordModel');

router.post('/', async (req,res)=>{
    try {

        let {startDate, endDate, minCount, maxCount} = req.body;

        const records = await recordModel.aggregate([
            {$match: 
                {createdAt: {
                    $gte: new Date(startDate),
                    $lt: new Date(endDate) 
                }}},
            {
                $addFields: {
                  totalCount: {
                    $sum: "$counts"
                  }
                }
              },
              {
                $match: {
                  totalCount: {
                    $gte: minCount,
                    $lte: maxCount
                  }
                }
              },
              { $unset: [ "_id", "counts", "value" ] }
        ]);

        res.send({code: 0, msg: "Success", records: records})

    } catch (error) {
        console.log("Error in division create ", error);
        res.status(500).json({code: 2, msg : "Something went wrong"})
    }
});


module.exports = router;