const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
    key: String
},
{ 
    timestamps: true 
}
);

RecordSchema.statics.filterByDateAndCount = async function (startDate, endDate, minCount, maxCount) {
    try{
        const records = await this.aggregate([
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
        
        return records;
        
    }catch(mongoErr){
        throw mongoErr;
    }
}


module.exports = mongoose.model('record', RecordSchema);

