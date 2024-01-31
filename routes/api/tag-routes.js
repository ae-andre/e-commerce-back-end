const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
  Tag.findAll({
    include: Product,
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
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    Tag.findByPk(req.params.id, {
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
  // create a new tag
  try {
    Tag.create({
      tag_name: req.body.tag_name
    })
    .then(results => {
      res.json(results)})
    } catch(err) {
      console.log(err)
      res.status(500).json({message: "There was an error!"})
    }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    Tag.update(
      {
        tag_name: req.body.tag_name
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
  // delete on tag by its `id` value
  try {
    Tag.destroy({
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
