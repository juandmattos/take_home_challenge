const { Router } = require('express')
const {
  getParts,
  getPartById,
  createPart,
  updatePart,
  deletePart,
  getCommonWords
} = require('./controller')

// Create a new router
const router = Router()

// REST API + Common words Endpoint
router.get('/', getParts)
router.get('/commonWords', getCommonWords)
router.get('/:partId', getPartById)
router.post('/', createPart)
router.patch('/:partId', updatePart)
router.delete('/:partId', deletePart)


module.exports = router
