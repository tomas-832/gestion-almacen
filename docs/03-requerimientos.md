# Requerimientos del Sistema

## Requerimientos funcionales

### Gestión de productos

- **RF-01:** El sistema deberá permitir registrar productos con un código único generado automáticamente, nombre, precio de venta, stock inicial y stock mínimo obligatorio.
- **RF-02:** El sistema deberá permitir consultar el listado de productos, sus datos principales y su stock actual.
- **RF-03:** El sistema deberá permitir modificar los datos de los productos registrados, incluyendo su nombre, precio de venta y stock mínimo.
- **RF-04:** El sistema deberá permitir desactivar productos sin eliminar su historial de movimientos.
- **RF-05:** El sistema deberá permitir consultar los productos cuyo stock actual sea inferior a su stock mínimo.

### Gestión de proveedores

- **RF-06:** El sistema deberá permitir registrar proveedores con sus datos identificatorios y de contacto.
- **RF-07:** El sistema deberá permitir consultar el listado y los datos de los proveedores registrados.
- **RF-08:** El sistema deberá permitir modificar los datos de los proveedores registrados.
- **RF-09:** El sistema deberá permitir desactivar proveedores sin eliminar el historial de compras asociado.

### Gestión de compras

- **RF-10:** El sistema deberá permitir registrar compras de mercadería asociadas a un proveedor activo.
- **RF-11:** El sistema deberá permitir registrar los productos, las cantidades y los costos unitarios correspondientes a cada compra.
- **RF-12:** El sistema deberá calcular el importe total de cada compra a partir de sus productos, cantidades y costos unitarios.
- **RF-13:** El sistema deberá incrementar automáticamente el stock de los productos al registrar una compra correctamente.
- **RF-14:** El sistema deberá permitir consultar las compras registradas, sus datos principales y el detalle de los productos incluidos.

### Gestión de ventas

- **RF-15:** El sistema deberá permitir registrar ventas que incluyan uno o más productos, sus cantidades y los precios de venta aplicados.
- **RF-16:** El sistema deberá calcular el importe total de cada venta a partir de los productos, las cantidades y los precios correspondientes.
- **RF-17:** El sistema deberá disminuir automáticamente el stock de los productos al registrar una venta correctamente.
- **RF-18:** El sistema deberá impedir que se registre una venta si la cantidad solicitada de algún producto supera su stock disponible.
- **RF-19:** El sistema deberá permitir consultar las ventas registradas y el detalle de los productos incluidos.

### Gestión de gastos e informes

- **RF-20:** El sistema deberá permitir registrar gastos operativos del negocio, indicando su concepto, fecha, importe y categoría.
- **RF-21:** El sistema deberá permitir consultar los gastos registrados, tanto individualmente como mediante filtros por período y categoría.
- **RF-22:** El sistema deberá permitir consultar un resumen de los ingresos por ventas, las compras de mercadería y los gastos operativos para un período determinado, presentando los importes por separado.

### Autenticación

- **RF-23:** El sistema deberá permitir que un usuario inicie sesión mediante sus credenciales para acceder a las funcionalidades habilitadas.

### Conservación del historial

- **RF-24:** El sistema no deberá permitir la eliminación física de compras y ventas confirmadas. Si se incorpora una funcionalidad de anulación, deberá conservar el registro de la operación y mantener la consistencia del stock.
- **RF-25:** El sistema deberá conservar los precios de venta y los costos unitarios aplicados en cada operación, independientemente de los cambios posteriores en los datos del producto.

## Requerimientos no funcionales

- **RNF-01:** El sistema deberá utilizar una base de datos relacional para almacenar y gestionar la información.
- **RNF-02:** El acceso a las operaciones que modifiquen información deberá estar restringido a usuarios autenticados.
- **RNF-03:** Las operaciones que involucren múltiples modificaciones relacionadas deberán garantizar que los datos permanezcan consistentes ante errores.
- **RNF-04:** El sistema deberá validar los datos ingresados antes de almacenarlos y comunicar los errores de forma comprensible.
- **RNF-05:** La API deberá utilizar HTTP para la comunicación y JSON como formato de intercambio de datos.
