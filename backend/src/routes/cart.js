const router = require('express').Router()
const auth   = require('../middleware/auth')
const { getCart, addItem, updateItem, removeItem, clearCart } = require('../controllers/cartController')

router.get('/',                  auth, getCart)
router.post('/',                 auth, addItem)
router.put('/:productId',        auth, updateItem)
router.delete('/:productId',     auth, removeItem)
router.delete('/',               auth, clearCart)

module.exports = router
