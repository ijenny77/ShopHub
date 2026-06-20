const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')
const User   = require('../models/User')

const sign = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (await User.findOne({ email }))
      return res.status(400).json({ message: 'Email already in use' })
    const user = await User.create({ name, email, password })
    res.status(201).json({ token: sign(user), user: { id: user._id, name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Invalid email or password' })
    res.json({ token: sign(user), user: { id: user._id, name: user.name, email: user.email,role:user.role } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({user:{id:user._id,name:user.name,email:user.email,role:user.role}})
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
exports.updateMe = async (req,res) => {
  try{
    const{ name,email,password } = req.body
    const user = await User.findById(req.user.id)
    if(name) user.name = name
    if(email) user.email = email
    if(password) user.password = password
    await user.save()
    res.json({user: {id:user._id, name:user.name, email:user.email, role:user.role } })
  }catch(err){
    res.status(500).json({ message: err.message })
  }
}
