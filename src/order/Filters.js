const customerFilter = (req, res, next) => {

  if (Object.keys(req.query).length === 0) return res.error("Empty Filters");
  const filters = [
    ...("name" in req.query ? [{customerName: req.query.name}] : []),
    ...("address" in req.query ? [{customerAddress: req.query.address}] : [])
  ]
  req.filters = filters;
  next();
}

module.exports = customerFilter;
