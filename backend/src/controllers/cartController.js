const Cart = require('../models/Cart')

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
    res.json(cart || { items: [] })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.addItem = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body
    const Product = require('../models/Product')
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    if (quantity > product.stock) return res.status(400).json({ error: 'Not enough stock' })
    let cart = await Cart.findOne({ user: req.user.id })
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] })
    const existing = cart.items.find(i => i.product.toString() === productId)
    if (existing) {
      existing.quantity += quantity
    } else {
      cart.items.push({ product: productId, quantity: quantity })
    }
    await cart.save()
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    const item = cart?.items.find(i => i.product.toString() === req.params.productId)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    item.quantity = req.body.quantity
    await cart.save()
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.removeItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    if (cart) {
      cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId)
      await cart.save()
    }
    res.json(cart || { items: [] })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    if (cart) {
      cart.items = []
      await cart.save()
    }
    res.json({ items: [] })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
