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

        next();
    } catch (error) {
        res.status(500).json({code: 2, msg : "Something went wrong"})
    }
}