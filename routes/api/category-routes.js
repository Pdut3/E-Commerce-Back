const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, as: 'products' }],
    });
    res.status(200).json(categoryData); // successful status
  } catch (err) {
    res.status(500).json(err); // failed status
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id.' })
      return;
    }

    res.status(200).json(categoryData); // successful status
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body); //intakes what's in body for post route

    res.status(201).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update({
      category_name: req.body.category_name,
    }, {
      where: {
        id: req.params.id
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(categoryData); // successful status
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" }); // also returns if another attempt is made with the same id after a successful status
      return;
    }
    res.status(200).json(categoryData); // successful status
  } catch (err) {
    res.status(500).json(err); // failed status
  }
});

module.exports = router;

