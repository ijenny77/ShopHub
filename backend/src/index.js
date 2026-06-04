require('dotenv').config()
const express  = require('express')
const cors     = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

// ── Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth',       require('./routes/auth'))
app.use('/api/products',   require('./routes/products'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/cart',       require('./routes/cart'))
app.use('/api/orders',     require('./routes/orders'))
app.use('/api/admin',      require('./routes/admin'))

app.get('/', (req, res) => res.json({ message: 'ShopHub API running ✅' }))

// ── Connect to MongoDB & start server ─────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server running on port ${process.env.PORT || 3000}`)
    )
  })
  .catch(err => { console.error('DB connection failed:', err); process.exit(1) })
