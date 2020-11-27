const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const studentdata = require("./Models/student");
const tutorList = require("./data");
const router = require("./Routes/routes");

dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
    // } else {
    //   console.log("Connection Successfull!");
    //   studentdata
    //     .insertMany(tutorList)
    //     .then(() => console.log("Inserted SuccessFully!"))
    //     .catch((err) => console.log(err));
    // }
  }
);

app.use("/", router);

app.listen(9000, () => {
  console.log("Server is up and running at port 9000!");
});
