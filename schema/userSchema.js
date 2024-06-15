const mongoose = require('mongoose')
const { ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    id:{type: Number, required: true},
    name:{ type: String, required: true },
    email: { type: String, required: true },
    phone: {type:Number, required: true},
    address: {type:String, required:true}

})

const userDetails = mongoose.model("students", userSchema);
module.exports = userDetails;