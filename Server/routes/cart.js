const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/sync', async (req, res) => {
  const { userId, cartItems } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: cartItems, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
    res.status(200).json(cart.items);
  } catch (err) {
    res.status(500).json({ message: "Error saving cart", error: err });
  }
});

module.exports = router;