const express = require("express");
const sequelize = require("./config/db");

const usersRouter = require("./routes/user");
const addOrdersRouter = require("./routes/add_order");
const orderRouter = require('./routes/order');

const app = express();
app.use(express.json());
app.use("/uploads", express.static("./" + "uploads"));

sequelize.sync({ force: false })
    .then(() => console.log("✅ Database & User table synced!"))
    .catch(err => console.error("❌ Error syncing database:", err));


app.use("/", usersRouter);
app.use("/", addOrdersRouter);
app.use("/", orderRouter);


app.listen( 3000 , () => {
    console.log(`🚀 Server running on http://localhost:3000`);
});
