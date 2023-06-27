const express = require("express");
const cors = require("cors");
const { returnError } = require("./helper/errorHandler");

const userRouter = require("./routes/userRouter");
const jurusanRouter = require("./routes/jurusanRouter");
const authRouter = require("./routes/authRouter");
const beritaRouter = require("./routes/beritaRouter");
const guruRouter = require("./routes/guruRouter");
const siswaRouter = require("./routes/siswaRouter");
const kelasRouter = require("./routes/kelasRouter");
const mediaRouter = require("./routes/mediaRoutes");
const pelajaranRouter = require("./routes/pelajaranRoutes");
const nilaiRouter = require("./routes/nilaiRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(jurusanRouter);
app.use(authRouter);
app.use(beritaRouter);
app.use(guruRouter);
app.use(siswaRouter);
app.use(kelasRouter);
app.use(mediaRouter);
app.use(pelajaranRouter);
app.use(nilaiRouter);

app.use(returnError);
app.listen(5000, () => {
  console.log("server running");
});
