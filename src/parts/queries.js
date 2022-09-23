// Get all parts
const getPartsQuery = `select * from part`

// Get a part by id
const getPartQuery = `select * from part where id = $1`

// Get part by name and sku
const checkPartExistsQuery = `select p from part p where p.name = $1 and p.sku = $2`

// Insert part
const addPartQuery = `
  insert into part 
  (name, sku, description, weight_ounces, is_active)
  values ($1, $2, $3, $4, $5)
`

// Update part (COALESCE handles null cases)
const updatePartQuery = `
  update part SET 
  name = COALESCE($2, name),
  sku = COALESCE($3, sku), 
  description = COALESCE($4, description), 
  weight_ounces = COALESCE($5, weight_ounces), 
  is_active = COALESCE($6, is_active) 
  where id = $1
`

// Delete a part
const deletePartQuery = `delete from part where id = $1`

// Get all parts descriptions
const getPartDescription = `select description from part`

module.exports = {
  getPartsQuery,
  getPartQuery,
  checkPartExistsQuery,
  addPartQuery,
  updatePartQuery,
  deletePartQuery,
  getPartDescription
}
