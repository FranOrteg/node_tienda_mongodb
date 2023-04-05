# API

## Modelo de productos

- Recuperar todos los productos
    - GET /api/products
    PRUEBAS:
        - Que la url funcione (que el status sea 200)
        - Que la respuesta sea en formato JSON
        - Que la respuesta sea un array con productos

- Crear un producto
    - POST /api/products
    - En el body de la peticion recibimos todos los datos del nuevo producto
    PRUEBAS:
        - Que la url funcione y nos devuelva un json
        - Que la respuesta disponga de la propiedad _id
        - Que la respuesta tenga los mismos datos que yo inserto

- Editar un producto
    - PUT /api/products/PRODUCTid
    - En el body recibimos todos los datos a editar
    PRUEBAS:
        - Que la Url funcione y nos devuelva un JSON
        - Comprobar que la respuesta se vea reflejada en los cambios

- Borrar un producto
    - DELETE /api/products/PRODUCTOID
    PRUEBAS:
        - Que la Url funcione y nos devuelva un JSON
        - Comprobar si el producto se ha borrado de la base de datos

- Recuperar un unico producto a partir de su id
    - GET /api/products/IDPRODUCTO (findById)

- Recuperar una lista de Productos por precio
    - GET /api/products/price/PRICE

- Recuperar una lista de productos por departamento
    - GET /api/products/department/DEPARTAMENTO

- Colocar como no disponibles a todos aquellos productos que estén disponibles y su stock sea menor de 10
    - PUT /api/products/stock

- Url para registrar usuarios
    - POST /api/users/register
    - Dentro del body recibimos todos los datos del usuario
    - Insertamos un documento nuevo por cada petición (create)