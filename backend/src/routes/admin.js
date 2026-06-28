const router = require('express').Router()
const auth   = require('../middleware/auth')
const admin  = require('../middleware/admin')
const { getAllOrders, updateOrderStatus } = require('../controllers/orderController')
const User   = require('../models/User')

router.get('/orders',        auth, admin, getAllOrders)
router.put('/orders/:id',    auth, admin, updateOrderStatus)

router.get('/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/users/:id/role', auth, admin, async (req, res) => {
  try {
    const { role } = req.body
    if (!['user', 'admin'].includes(role))
      return res.status(400).json({ message: 'Invalid role' })
    if (req.params.id === req.user.id)
      return res.status(400).json({ message: 'You cannot change your own role' })
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
