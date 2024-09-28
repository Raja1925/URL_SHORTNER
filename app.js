require('dotenv').config();


const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');

const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require('./middlewares/auth');
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 8001;

// Connect TO mongoDB
connectToMongoDB(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(`error: ${err}`)
);

//  Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//Middleware
app.use(express.json()); // to support json data
app.use(express.urlencoded({ extended: false })); // to support form data
app.use(cookieParser()); // to use cookies

// Route
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        }
      },
    );
  
    if (!entry) {
      return res.status(404).send("Short URL not found");
    }
    // console.log("Redirecting to:", entry.redirectURL);
    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error fetching entry:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => console.log(`Server Started at port: ${PORT}`));
