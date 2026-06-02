const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name:    String,
      qty:     Number,
      price:   Number
    }
  ],
  total:     { type: Number, required: true },
  status:    { type: String, enum: ['Processing', 'Shipped', 'Delivered'], default: 'Processing' },
  shippedTo: { type: String },
  payment:   { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
