const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(
      req.params.id, {
        include: {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      }
    );
if(!categoryData) {
    res.status(404),json({ message: 'No category found with this id'});
    return;
}
res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category); 
  } catch (error) {
    console.log(error); 
    res.status(400).json(error); 
  }
});



router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => res.status(400).json(err));
  }
);



router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});




module.exports = router;
