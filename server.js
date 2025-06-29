const express = require("express");
const sequelize = require("./config/db");
const usersRouter = require("./routes/user");
const addOrdersRouter = require("./routes/add_order");
const orderRouter = require('./routes/order');
const adsRoutes = require("./routes/ads");
const dashboardRoutes = require("./routes/dashboard.js");

const app = express();
app.use(express.json());
app.use("/uploads", express.static("./" + "uploads"));

sequelize.sync({ force: false })
    .then(() => console.log("✅ Database & User table synced!"))
    .catch(err => console.error("❌ Error syncing database:", err));


app.use("/", usersRouter);
app.use("/", addOrdersRouter);
app.use("/", orderRouter);
app.use("/", adsRoutes);
app.use("/", dashboardRoutes);


app.listen( 6000 , () => {
    console.log(`🚀 Server running on http://localhost:3000`);
});
