const express = require("express");
const router = express.Router();
const AddOrder = require("../models/add_order");
const User = require("../models/user");

router.get("/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

     const page = parseInt(req.query.page) || 1;
     const limit = parseInt(req.query.limit) || 5;
     const offset = (page - 1) * limit;

        
    const userWithOrders = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
      include: [
        {
          model: AddOrder,
          as: "orders", 
          limit: limit,
          offset: offset, 
          order: [["createdAt", "DESC"]], 
        },
      ],
    });

    if (!userWithOrders) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const totalOrders = await AddOrder.count({ where: { userId } });

    res.status(200).json({
      user: userWithOrders,
      pagination: {
        totalOrders,
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
      },
    });
    } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

router.delete("/orders/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await AddOrder.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.destroy();
    res.status(200).json({ message: "Order deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
});

router.get("/ordersPending", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const pendingOrders = await AddOrder.findAndCountAll({
      where: { status: "pending" },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
         // required: true,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    res.status(200).json({
      orders: pendingOrders.rows,
      pagination: {
        totalOrders: pendingOrders.count,
        currentPage: page,
        totalPages: Math.ceil(pendingOrders.count / limit),
      },
    });
  } catch (error) {
    console.error("❌ Error fetching pending orders:", error);
    res.status(500).json({ message: "Failed to fetch pending orders", error: error.message });
  }
});

router.get("/ordersDelivery", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const pendingOrders = await AddOrder.findAndCountAll({
      where: { status: "Delivery" },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
         // required: true,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    res.status(200).json({
      orders: pendingOrders.rows,
      pagination: {
        totalOrders: pendingOrders.count,
        currentPage: page,
        totalPages: Math.ceil(pendingOrders.count / limit),
      },
    });
  } catch (error) {
    console.error("❌ Error fetching pending orders:", error);
    res.status(500).json({ message: "Failed to fetch pending orders", error: error.message });
  }
});

router.get("/ordersCompleted", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const pendingOrders = await AddOrder.findAndCountAll({
      where: { status: "completed" },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
         // required: true,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    res.status(200).json({
      orders: pendingOrders.rows,
      pagination: {
        totalOrders: pendingOrders.count,
        currentPage: page,
        totalPages: Math.ceil(pendingOrders.count / limit),
      },
    });
  } catch (error) {
    console.error("❌ Error fetching pending orders:", error);
    res.status(500).json({ message: "Failed to fetch pending orders", error: error.message });
  }
});

router.get("/ordersCanceled", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const pendingOrders = await AddOrder.findAndCountAll({
      where: { status: "canceled" },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
         // required: true,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    res.status(200).json({
      orders: pendingOrders.rows,
      pagination: {
        totalOrders: pendingOrders.count,
        currentPage: page,
        totalPages: Math.ceil(pendingOrders.count / limit),
      },
    });
  } catch (error) {
    console.error("❌ Error fetching pending orders:", error);
    res.status(500).json({ message: "Failed to fetch pending orders", error: error.message });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const allOrders = await AddOrder.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });

    res.status(200).json({
      orders: allOrders.rows,
      pagination: {
        totalOrders: allOrders.count,
        currentPage: page,
        totalPages: Math.ceil(allOrders.count / limit),
      },
    });
  } catch (error) {
    console.error("❌ Error fetching all orders:", error);
    res.status(500).json({ message: "Failed to fetch all orders", error: error.message });
  }
});

module.exports = router;