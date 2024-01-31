const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
  Product.findAll({
    include: Category,
    include: Tag
  })
  .then(results => {
    res.json(results)
  })
  } catch(err){
    console.log(err)
    res.status(500).json({message: "There was an error!"})
  }
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    Product.findByPk(req.params.id, {
      include: Category,
      include: Tag
    })
    .then(results => {
      res.json(results)
    })
    } catch(err){
      console.log(err)
      res.status(500).json({message: "There was an error!"})
    }
  });

// create new product
router.post('/', (req, res) => {
  try {
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id
  })
  .then(results => {
    res.json(results);
  })
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "There was an error"});
  }
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  try {
  Product.update(
    {
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
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
  // delete one product by its `id` value
  try {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(result => {
    res.json(result)})
  } catch(err){
    console.log(err)
    res.status(500).json({message: "There was an error!"})
  }
});

module.exports = router
