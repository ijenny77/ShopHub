const Order = require('../models/Order')
const Cart  = require('../models/Cart')
const Product = require('../models/Product')

exports.createOrder = async (req, res) => {
  try {
    const { shippedTo, payment } = req.body
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: 'Cart is empty' })

    const items = cart.items.map(i => ({
      product: i.product._id,
      name:    i.product.name,
      quantity:     i.quantity,
      price:   i.product.price * i.quantity
    }))
    const total = items.reduce((sum, i) => sum + i.price, 0)
    const order = await Order.create({ user: req.user.id, items, total, shippedTo, payment })
    for (let item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      )
    }

    cart.items = []
    await cart.save()

    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id })
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateOrderStatus = async (req, res) => {
  try {
    const allowedStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!allowedStatuses.includes(req.body.status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
