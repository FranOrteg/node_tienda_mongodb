const router = require('express').Router();


const Product = require('../../models/product.model');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.get('/price/:minPrice', async (req, res) => {
    const { minPrice } = req.params;

    try {
        const products = await Product.find({
            // estamos filtrando (gte) = Greater than or equal
            price: { $gte: minPrice }, // $gt, $gte, $lt, $lte, $eq, $neq, $in, $nin
            available: true
        });
        res.json(products)
    } catch (error) {
        res.json({ fatal: error.mesage })
    }
});

router.get('/department/:departamento', async (req, res) => {
    const { departamento } = req.params
    try {
        const products = await Product.find({
            department: { $eq: departamento }
        });
        res.json(products)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});


router.get('/:productoId', async (req, res) => {
    const { productoId } = req.params
    try {
        const product = await Product.findById(productoId);
        res.json(product)
    } catch (error) {
        res.json({ fatal: error.mesage })
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct)
    } catch (error) {
        res.json({ fatal: error.mesage })
    }
});

// pongo por encima del la ruta put de abajo xk la de abajo al ser dinamica podria pisar la que estoy escribiendo ahora si estuviese por encima ya que la ruta es la misma, solo que una dinamica y otra no
router.put('/stock', async (req, res) => {
    try {
        const result = await Product.updateMany(
            {
                available: true,
                stock: { $lte: 10 }
            },
            { available: false }
        );
        res.json(result)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.put('/:productoId', async (req, res) => {
    const { productoId } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productoId, req.body, { new: true });
        res.json(updatedProduct)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.delete('/:productoId', async (req, res) => {
    const { productoId } = req.params;
    try {
        const productoBorrado = await Product.findByIdAndDelete(productoId)
        res.json(productoBorrado)
    } catch (error) {
        res.json({ fatal: error.mesage })
    }
})


module.exports = router;