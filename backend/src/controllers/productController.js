const Product = require('../models/Product')

exports.getAll = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10, sort, minPrice, maxPrice } = req.query
    const filter = {}
    if (category) filter.category = category
    if (search) filter.name = { $regex: search, $options: 'i' }
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }
    let sortObj = {}
    if (sort === 'price_asc') sortObj = { price: 1 }
    else if (sort === 'price_desc') sortObj = { price: -1 }
    else if (sort === 'name_asc') sortObj = { name: 1 }
    else if (sort === 'name_desc') sortObj = { name: -1 }
    
    const total = await Product.countDocuments(filter)
    const totalPages = Math.ceil(total / limit)
    const products = await Product.find(filter)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(Number(limit))
    res.json({ products, total, totalPages, currentPage: page })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const data = {...req.body}
    if(req.file) data.image = `/uploads/${req.file.filename}`
    res.status(201).json(await Product.create(data))
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    const data = {...req.body}
    if(req.file) data.image = `/uploads/${req.file.filename}`
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
