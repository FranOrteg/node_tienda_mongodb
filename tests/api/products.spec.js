const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const Producto = require('../../models/product.model')

describe('Api de products', () => {

    beforeAll(async () => {
        // Cuando empiezen los tests me conecto a la base de datos.
        await mongoose.connect('mongodb://127.0.0.1/tienda_online');
    });

    afterAll(async () => {
        // Cuando Termminen los tests me desconecto de la base de datos.
        await mongoose.disconnect();
    });

    describe('Pruebas de GET api/products', () => {

        let response;

        beforeAll(async () => {
            response = await request(app).get('/api/products').send();
        });

        test('debería funcionar la Petición', () => {
            // voy a lanzar una peticion a apiProducts y comprobar que funcione
            expect(response.statusCode).toBe(200);
        });

        test('debería responder con un JSON', () => {
            expect(response.headers['content-type']).toContain('application/json');
        });

        test('debería responder con un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });

    });

    describe('Pruebas de POST /api/products', () => {

        let response;
        const body = { name: 'Test', description: 'This is for test', price: 98, department: 'test', available: true, stock: 21 };
        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body);
        });

        afterAll(async () => {
            // Como a los tests les he puesto a todos el mismo departamento , les puedo borrar por departamento 'test'
            await Producto.deleteMany({ department: 'test' })
        });

        test('La url debería funcionar', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        // En la respuesta debería venir definido el campo _id

        test('debería devolver el campo _id', () => {
            expect(response.body._id).toBeDefined();
        })

        // La respuesta deberia tener los mismos valores que el objeto que inserto

        test('La respuesta debería tener los mismos datos que el objeto que inserto', () => {
            expect(response.body.name).toBe(body.name)
        });
    });

    describe('Pruebas de PUT api/products', () => {

        let response;
        let newProduct;
        const body = { name: 'Test', description: 'This is for test', price: 98, department: 'test', available: true, stock: 21 };
        beforeAll(async () => {
            // Creo un nuevo producto especifico para las pruebas
            newProduct = await Producto.create(body);
            // Lanzo la petición
            response = await request(app)
                .put(`/api/products/${newProduct._id}`)
                .send({ name: 'Producto Nuevo', stock: 338 });
        });

        afterAll(async () => {
            await Producto.findByIdAndDelete(newProduct._id);
        });

        test('La url debe existir y devolver un JSON', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('Deberiamos recibir el producto con los datos modificados', () => {
            expect(response.body.name).toBe('Producto Nuevo');
            expect(response.body.stock).toBe(338);
        });

    });

    describe('Pruebas de DELETE /api/products', () => {

        let response;
        let newProduct;
        const body = { name: 'Test', description: 'This is for test', price: 98, department: 'test', available: true, stock: 21 };
        beforeAll(async () => {
            newProduct = await Producto.create(body);
            response = await request(app)
                .delete(`/api/products/${newProduct._id}`)
                .send();
        });

        test('debería existir la url y nos devuelve un JSON', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('debería borrar el producto de la base de datos', async () => {
            const productFound = await Producto.findById(newProduct._id);
            expect(productFound).toBeNull();
        });
    })
});