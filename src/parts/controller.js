const pool = require('../db')
const {
  getPartsQuery,
  getPartQuery,
  checkPartExistsQuery,
  addPartQuery,
  updatePartQuery,
  deletePartQuery,
  getPartDescription
} = require('./queries')

const { getTopCommonWords } = require('../utils')

// GET /parts
const getParts = (_, res) => {
  // Get all parts and return them
  pool.query(getPartsQuery, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

// GET /parts/:id
const getPartById = (req, res) => {
  const id = req.params.partId
  // Get part and return it if it does not exist
  pool.query(getPartQuery, [id], (error, results) => {
    if (error) throw error

    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'Part Not Found!'})
    }
    res.status(200).json(results.rows)
  })
}

// POST /parts
const createPart = (req, res) => {
  const {
    name, 
    sku, 
    description, 
    weight_ounces: weightOunces, 
    is_active: isActive = '0' 
  } = req.body

  // Create a part unless it does not provide name, sku or weightOunces or it already exists
  if (!name || !sku || !weightOunces) {
    return res.status(400).json({ message: 'Name, Sku and Weight Ounces are required!'})
  }

  pool.query(checkPartExistsQuery, [name, sku], (error, results) => {
    if (error) throw error

    if (results.rows.length) {
      return res.status(400).json({ message: 'Part already exists!'}) // Check if it already exists
    }

    pool.query(addPartQuery, [name, sku, description, weightOunces, isActive], (error, results) => {
      if (error) throw error
      res.status(201).json({ message: 'Part created successfully!'}) // Create part
    })
  })
}

// PATCH /parts/:id
const updatePart = (req, res) => {
  const id = req.params.partId

  // Update part unless it is not in the db
  pool.query(getPartQuery, [id], (error, results) => {
    if (error) throw error
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'Part Not Found!'})
    }
    const {
      name, 
      sku, 
      description, 
      weight_ounces: weightOunces, 
      is_active: isActive 
    } = req.body

    // You dont need to send all the data, only the updated one. That is why this is a PATCH
    pool.query(updatePartQuery, [id, name, sku, description, weightOunces, isActive], (error, _) => {
      if (error) throw error
      res.status(200).json({ message: 'Part updated successfully!'}) 
    })
  })
}

// DELETE /parts/:id
const deletePart = (req, res) => {
  const id = req.params.partId

  // Delete part unless it is not in the db
  pool.query(getPartQuery, [id], (error, results) => {
    if (error) throw error
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'Part Not Found!'})
    }

    pool.query(deletePartQuery, [id], (error, _) => {
      if (error) throw error
      res.status(200).json({ message: 'Part deleted successfully!'}) 
    })
  })
}

// API endpoint that returns the 5 most common words in part descriptions
const getCommonWords = (_, res) => {
  pool.query(getPartDescription, (error, results) => {
    if (error) throw error
    // Get descriptions
    const descriptionString = results.rows.map(ele => ele.description)
    // Get 5 most common words in part descriptions
    const topCommonWords = getTopCommonWords(descriptionString.join(' '), 5)

    // Return a message with the 5 most common words
    res.status(200).json({ message: `Top 5 Common Words: ${topCommonWords}`})
  })
}

module.exports = {
  getParts,
  getPartById,
  createPart,
  updatePart,
  deletePart,
  getCommonWords
}
