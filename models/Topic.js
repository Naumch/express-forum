const { Schema, model, Types} = require("mongoose");

const schema = new Schema({
    topic_name: {type: String, required: true, unique: true},
    nickname: {type: String, required: true},
    date: {type: Date, default: Date.now()},
    posts: [{type: Types.ObjectId, ref: "Post"}]
});

module.exports = model("Topic", schema);