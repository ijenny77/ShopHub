const router = require('express').Router()
const auth   = require('../middleware/auth')
const admin  = require('../middleware/admin')
const { getAllOrders, updateOrderStatus } = require('../controllers/orderController')

router.get('/orders',        auth, admin, getAllOrders)
router.put('/orders/:id',    auth, admin, updateOrderStatus)

module.exports = router
