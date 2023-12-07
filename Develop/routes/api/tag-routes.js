const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
   const tagData = await Tag.findAll({
     include: Product
   });
   res.status(200).json(tagData);
 } catch (error) {
   res.status(500).json(error);
 }
});

router.get('/:id', async (req, res) => {
  try {
   // find a single tag by its `id`
const tagData = await Tag.findByPk(req.params.id, {
  include: Product
});

if (!tagData) {
  res.status(404).json({ message: 'No tag found with that id!' });
    return;
}
res.status(200).json(tagData);
} catch (error) {
  res.status(500).json(error);
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }});
    if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!' });
          return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy(req.body, {
      where: {
        id: req.params.id
      }});
    if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!' });
          return;
    }
      res.status(200).json('Tag has been deleted'); 
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
