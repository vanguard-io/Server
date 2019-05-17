const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cpuUsageSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

const DataSchema = new Schema({
	user: {
		type: String,
        required: true
	},
	cpuUsage: [cpuUsageSchema]
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
