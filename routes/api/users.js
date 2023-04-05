const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/user.model');
const { createToken } = require('../../helpers/utils');
const { checkToken } = require('../../helpers/middlewares');

router.get('/buy/:productoId', checkToken, async (req, res) => {
    const { productoId } = req.params

    // Esto es solo para mongo db, en mysql tendriamos que hacerlo de otra forma
    req.user.cart.push(productoId);
    await req.user.save();

    res.json({ success: 'Producto agregado' })
});

router.get('/cart', checkToken, (req, res) => {
    res.json(req.user.cart);
});

router.post('/register', async (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 8);

    try {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.post('/login', async (req, res) => {
    // Comprobamos si el email esta registrado
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.json({ fatal: 'Error en usuario y/o contraseña' });
    }

    const iguales = bcrypt.compareSync(req.body.password, user.password);
    if (!iguales) {
        return res.json({ fatal: 'Error en usuario y/o contraseña' });
    }
    res.json({
        success: 'Login correcto!! 👍👍👍',
        token: createToken(user)
    })

});

module.exports = router