const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    text: {type: String, required: true},
    nickname: {type: String, required: true},
    date: {type: Date, default: Date.now()},
    owner: {type: Types.ObjectId, ref: "Topic"}
});

module.exports = model("Post", schema);