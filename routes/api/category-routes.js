const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const catData = await Category.findAll({
    include: [
      {model: Product},
    ]
  });
  return res.json(catData);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const specCat = await Category.findByPk(req.params.id, {
    include: [
      {model: Product}
    ]
  });
  return res.json(specCat);   
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCat) => {
    res.json(newCat);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    { where: {
        id: req.params.id,
      }
    }
  )
    .then((upCat) => {
      res.json(upCat);
    })
    .catch((err) => res.json(err));
  });

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((catDel) => {
        res.json(catDel);
      })
      .catch((err) => res.json(err));
});

module.exports = router;
