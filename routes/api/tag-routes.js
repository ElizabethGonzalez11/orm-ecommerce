const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tData = await Tag.findAll({
    include: [
      {model: Product}
    ]
  });
  return res.json(tData);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const oneTag = await Tag.findByPk(req.params.id, {
    include: [
      { model: Product}
    ]
  });
  return res.json(oneTag);
});

router.post('/', (req, res) => {
  // create a new tag
   Tag.create(req.body)
      .then((newTag) => {
        res.json(newTag);
      })
      .catch((err) => {
        res.json(err);
      })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {tag_name: req.params.tag_name,},
    {where: {
      id: req.params.id,
    }}
  )
  .then((upTag) =>{
    res.json(upTag);
  }) 
  .catch((err) => res.json(err));
});

router.delete('/:id',(req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(tagDelete => {
        res.json(tagDelete);
      })
      .catch((err) => res.json(err));
});

module.exports = router;
