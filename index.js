const express = require("express");
const mongoose = require("mongoose");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const handlebars = expressHandlebars.create({
	defaultLayout: 'main', 
	extname: 'hbs',
  helpers: {
    format: function(str) {
      let date = new Date(str);
      
      function getZero(num) {
        if (num >= 1 && num <= 9) {
          return num = "0" + num; 
        } else {
          return num;
        }
      }

      let day = getZero(date.getDate());
      let month = getZero(date.getMonth() + 1);

      return `${day}.${month}.${date.getFullYear()}`;
    }
  }
});

const app = express();

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public/'))

app.use("/forum/", require("./routes"));

app.get("/", function(req, res) {
  res.render("index");
})

app.use(function(req, res) {
	res.status(404).render('404');
});

async function start() {
    try {
      mongoose.connect("mongodb://localhost:27017/forum", { 
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  
      app.listen(3000, () => console.log('running'));
    } catch (error) {
      console.log(error.message);
    }
}
  
start();