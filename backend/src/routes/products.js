const router  = require('express').Router()
const auth    = require('../middleware/auth')
const admin   = require('../middleware/admin')
const upload = require('../middleware/upload')
const { getAll, getOne, create, update, remove } = require('../controllers/productController')

router.get('/',      getAll)
router.get('/:id',   getOne)
router.post('/',auth,admin,upload.single('image'),create)
router.put('/:id',auth,admin,upload.single('image'),update)
router.delete('/:id',auth, admin, remove)


module.exports = router
