const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    Category.findAll({
      include: Product
    })
    .then(results => {
      res.json(results)
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({message: "There was an error!"})
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    Category.findByPk(req.params.id, {
      include: Product
    })
    .then(results => {
      res.json(results)
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({message: "There was an error!"})
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
  Category.create({
    category_name: req.body.category_name
  })
  .then(results => {
    res.json(results)})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: "There was an error!"})
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(result => {
    res.json(result)})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: "There was an error!"})
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(result => {
    res.json(result)})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: "There was an error!"})
  }
});

module.exports = router;
