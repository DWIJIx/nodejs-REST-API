const mongoose = require("mongoose");

const app = require("./app");
// const DB_HOST =
//   "mongodb+srv://AndriiV:Vyd6snUMNePBlSSU@cluster0.olzdku9.mongodb.net/db-contacts?retryWrites=true&w=majority";
const { DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
    console.log("Server running. Use our API on port: 3000");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
