const router  = require('express').Router()
const Product = require('../models/Product')

router.get('/', async (req, res) => {
  try {
    const categories = await Product.distinct('category')
    res.json(categories.filter(Boolean))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
