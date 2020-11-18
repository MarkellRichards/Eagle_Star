import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { AuthRoute, UserRoute } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", AuthRoute);
app.use("/users", UserRoute);

// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

createConnection()
  .then(() => {
    app.listen(5000, () => console.log("Server up at http://localhost:5000"));
  })
  .catch((error) => console.log(error));
