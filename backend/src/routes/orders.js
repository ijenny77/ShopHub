const router = require('express').Router()
const auth   = require('../middleware/auth')
const { createOrder, getMyOrders, getOrder } = require('../controllers/orderController')

router.post('/',     auth, createOrder)
router.get('/my',    auth, getMyOrders)
router.get('/:id',   auth, getOrder)

module.exports = router
