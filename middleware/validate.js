const moment = require('moment');

module.exports = (req,res,next)=>{
    try {
        let {startDate, endDate, minCount, maxCount} = req.body;
        console.log(startDate, endDate, minCount, maxCount); 
        
        if(!startDate || !endDate || !minCount || !maxCount){
            return res.status(400).json({code: 1, msg : "Request parameter missing"})           
        }

        if(!moment(startDate, 'YYYY-MM-DD',true).isValid() || !moment(endDate, 'YYYY-MM-DD',true).isValid()){
            return res.status(400).json({code: 1, msg : "Date format wrong, should be YYYY-MM-DD"})
        }
        
        if(new Date(endDate) < new Date(startDate)){
            return res.status(400).json({code: 1, msg : "endDate should be after startDate"})
        }

        if(new Date(endDate) < new Date(startDate)){
            return res.status(400).json({code: 1, msg : "endDate should be after startDate"})
        }

        if(typeof minCount != 'number' || typeof maxCount != 'number' || maxCount < minCount){
            return res.status(400).json({code: 1, msg : "minCount and maxCount must be numbers and maxCount should be greater than minCount"})
        }

        next();
    } catch (error) {
        res.status(500).json({code: 2, msg : "Something went wrong"})
    }
}