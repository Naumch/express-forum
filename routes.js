const { Router } = require("express");
const Topic = require("./models/Topic");
const Post = require("./models/Post");
const { count } = require("./models/Topic");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find();

    res.render("forum", {
      topics: topics.map(topic => topic.toJSON())
    })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
})

router.post('/', async (req, res) => {
  try {
    const {topic_name, nickname} = req.body;

    const topic = new Topic({
      topic_name, nickname
    });

    await topic.save();

    res.status(201).redirect("/forum");
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
}) 

router.get("/topic/:topic_name/", async (req, res) => {
  try {
    const name = req.params.topic_name;

    const topic = await Topic.find({topic_name: name});
    const posts = await Post.find({owner: topic[0]._id});

    res.render("topic", {
      name: name,
      posts: posts.map(post => post.toJSON()),
      length: posts.length
    })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
})

router.post('/topic/:topic_name', async (req, res) => {
  try {
    const name = req.params.topic_name;
    const {text, nickname} = req.body;

    const topic = await Topic.find({topic_name: name});

    const post = new Post({
      text, nickname, owner: topic[0]._id
    });

    await post.save();

    res.status(201).redirect(`/forum/topic/${name}`);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
}) 

module.exports = router;