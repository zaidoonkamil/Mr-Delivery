const express = require('express');
const router = express.Router();
const AddOrder = require('../models/add_order');
const User = require('../models/user');
const multer = require("multer");
const upload = multer();
const provincePrices = {
  "بغداد": 4000,
  "البصرة": 5000,
  "نينوى": 5000,
  "أربيل": 5000,
  "الأنبار": 5000,
  "كربلاء": 5000,
  "النجف": 5000,
  "ذي قار": 5000,
  "السليمانية": 5000,
  "ديالى": 4000,
  "صلاح الدين": 5000,
  "واسط": 5000,
  "ميسان": 5000,
  "بابل": 5000,
  "دهوك": 5000,
  "المثنى": 5000,
  "القادسية": 5000,
  "كركوك": 5000
};

router.post("/addOrder",upload.none() , async (req, res) => {
    try {
    const { userId, customerName, phoneNumber, province, address, price } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const numericPrice = parseFloat(price);
    const deliveryPrice = provincePrices[province] || 0;
    const totalPrice = numericPrice + deliveryPrice;

    const newOrder = await AddOrder.create({
      customerName,
      phoneNumber,
      status: 'pending',
      province,
      address,
      price,
      deliveryPrice,
      totalPrice,
      userId,
    });

    res.status(201).json({ message: 'Order added successfully!', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add order', error: error.message });
  }
});

router.get('/provinces', (req, res) => {
  res.json(provincePrices);
});

module.exports = router;