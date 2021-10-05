const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
    key: String
},
{ 
    timestamps: true 
}
);


module.exports = mongoose.model('record', RecordSchema);

