# Casos de Uso

Este documento reúne los 16 casos de uso definidos en el informe del proyecto.


## CU-01 — Iniciar sesión

**Actor:** Usuario.

**Descripción:** Permite al usuario autenticarse para acceder al sistema.

**Precondiciones:** El usuario debe tener una cuenta registrada y habilitada.


### Flujo principal

1. El usuario accede a la pantalla de inicio de sesión.
2. El sistema solicita las credenciales del usuario.
3. El usuario ingresa su nombre de usuario o correo electrónico y contraseña.
4. El sistema valida las credenciales ingresadas.
5. El sistema autentica al usuario.
6. El sistema permite el acceso a las funcionalidades correspondientes.

### Flujo alternativo / excepciones

- 4.1. El sistema verifica que las credenciales ingresadas sean incorrectas o que falten datos obligatorios.

- 4.2. El sistema emite un mensaje de error.
- 4.3. Ir al paso 2.
- 4.4. Si ocurre un error técnico durante la autenticación, el sistema informa que no fue posible iniciar sesión y finaliza el caso de uso.

**Postcondición:** El usuario queda autenticado si el flujo principal finaliza exitosamente.


## CU-02 — Registrar proveedor

**Actor:** Usuario.

**Descripción:** Permite registrar un proveedor para asociarlo con las compras de mercadería.

**Precondiciones:** El usuario debe haber iniciado sesión.


### Flujo principal

1. El usuario selecciona la opción «Registrar proveedor».
2. El sistema solicita los datos del proveedor.
3. El usuario ingresa los datos requeridos del proveedor.
4. El sistema valida los datos ingresados.
5. El sistema registra al proveedor con estado activo.
6. El sistema informa que el proveedor fue registrado correctamente.

### Flujo alternativo / excepciones

- 5.1. El sistema detecta que faltan datos obligatorios o que alguno de los datos ingresados no es válido.

- 5.2. El sistema emite un mensaje indicando los errores encontrados.
- 5.3. Ir al paso 3.
- 5.4. Si ocurre un error al guardar la información, el sistema informa que no se pudo registrar el proveedor y finaliza el caso de uso.

**Postcondición:** El proveedor queda registrado y disponible para asociarlo con nuevas compras.


## CU-03 — Consultar proveedores

**Actor:** Usuario.

**Descripción:** Permite consultar los proveedores registrados y sus datos.

**Precondiciones:** El usuario debe haber iniciado sesión.


### Flujo principal

1. El usuario selecciona la opción «Consultar proveedores».
2. El sistema muestra el listado de proveedores registrados.
3. El usuario selecciona un proveedor.
4. El sistema muestra los datos del proveedor seleccionado, incluido su estado.

### Flujo alternativo / excepciones

- 3.1. El sistema verifica que no existen proveedores registrados.
- 3.2. El sistema informa que no hay proveedores para mostrar y finaliza el caso de uso.

- 4.1. El sistema no encuentra el proveedor seleccionado.
- 4.2. El sistema informa que el proveedor no se encuentra disponible y vuelve al paso 3.

**Postcondición:** La información de los proveedores queda disponible para su consulta. No se modifica información del sistema.


## CU-04 — Modificar proveedor

**Actor:** Usuario.

**Descripción:** Permite modificar los datos de un proveedor registrado.

**Precondiciones:** El usuario debe haber iniciado sesión y el proveedor debe existir.


### Flujo principal

1. El usuario selecciona la opción «Consultar proveedores».
2. El sistema muestra el listado de proveedores.
3. El usuario selecciona el proveedor que desea modificar.
4. El sistema muestra los datos actuales del proveedor.
5. El usuario modifica los datos correspondientes.
6. El usuario confirma los cambios.
7. El sistema valida los datos ingresados.
8. El sistema guarda los cambios.
9. El sistema informa que el proveedor fue modificado correctamente.

### Flujo alternativo / excepciones

- 4.1. El sistema no encuentra el proveedor seleccionado.
- 4.2. El sistema informa que el proveedor no existe y finaliza el caso de uso.
- 8.1. El sistema detecta datos obligatorios faltantes o valores inválidos.
- 8.2. El sistema informa los errores encontrados.
- 8.3. Ir al paso 6.
- 9.1. Ocurre un error al guardar los cambios.
- 9.2. El sistema informa que no se pudo modificar el proveedor y conserva los datos anteriores.

**Postcondición:** Los datos del proveedor quedan actualizados. Se conserva el historial de compras asociado.


## CU-05 — Desactivar proveedor

**Actor:** Usuario.

**Descripción:** Permite desactivar un proveedor sin eliminar su información ni su historial de compras.

**Precondiciones:** El usuario debe haber iniciado sesión y el proveedor debe existir.


### Flujo principal

1. El usuario selecciona la opción «Consultar proveedores».
2. El sistema muestra el listado de proveedores.
3. El usuario selecciona el proveedor que desea desactivar.
4. El sistema muestra los datos del proveedor y solicita confirmación.
5. El usuario confirma la desactivación.
6. El sistema cambia el estado del proveedor a inactivo.
7. El sistema informa que el proveedor fue desactivado correctamente.

### Flujo alternativo / excepciones

- 4.1. El sistema no encuentra el proveedor seleccionado.
- 4.2. El sistema informa que el proveedor no existe y finaliza el caso de uso.
- 6.1. El usuario cancela la operación.
- 6.2. El sistema conserva el estado actual del proveedor y finaliza el caso de uso.
- 6.3. El proveedor ya se encuentra desactivado.
- 6.4. El sistema informa que el proveedor ya está inactivo y finaliza el caso de uso.

- 7.1. Ocurre un error al guardar el cambio de estado.
- 7.2. El sistema informa que no se pudo desactivar el proveedor.
**Postcondición:** El proveedor queda inactivo y conserva sus datos y compras históricas. No puede utilizarse en nuevas compras.


## CU-06 — Consultar stock de productos

**Actor:** Usuario.

**Descripción:** Permite consultar los productos registrados, sus existencias y su situación respecto del stock mínimo.

**Precondiciones:** El usuario debe haber iniciado sesión.


### Flujo principal

1. El usuario selecciona la opción «Consultar stock de productos».
2. El sistema muestra el listado de productos con su código, nombre, stock actual y stock mínimo.

3. El usuario selecciona un producto o realiza una búsqueda por código o nombre.
4. El sistema muestra la información del producto seleccionado.
5. El sistema indica si el stock actual está por debajo del stock mínimo establecido.


### Flujo alternativo / excepciones

- 3.1. El sistema verifica que no existen productos registrados.
- 3.2. El sistema informa que no hay productos para mostrar y finaliza el caso de uso.

- 4.1. El sistema no encuentra productos que coincidan con la búsqueda.
- 4.2. El sistema informa que no se encontraron resultados y vuelve al paso 3.
**Postcondición:** El usuario obtiene la información del stock sin modificar los datos del sistema.


## CU-07 — Registrar producto

**Actor:** Usuario.

**Descripción:** Permite registrar un producto con un código único, sus datos comerciales y un stock mínimo obligatorio.

**Precondiciones:** El usuario debe haber iniciado sesión.


### Flujo principal

1. El usuario selecciona la opción «Registrar producto».
2. El sistema solicita los datos del producto.
3. El usuario ingresa el nombre, el precio de venta y el stock mínimo.
4. El sistema valida los datos ingresados.
5. El sistema genera un código único para identificar el producto.
6. El sistema registra el producto con stock inicial igual a cero.
7. El sistema informa que el producto fue registrado correctamente y muestra su código.


### Flujo alternativo / excepciones

- 5.1. El sistema detecta que faltan datos obligatorios o que el precio de venta o el stock mínimo contienen valores inválidos.

- 5.2. El sistema informa los errores encontrados.
- 5.3. Ir al paso 3.
- 6.1. Ocurre un error al generar el código o guardar el producto.
- 6.2. El sistema informa que no se pudo registrar el producto y finaliza el caso de uso.

**Postcondición:** El producto queda registrado con un código único, un stock mínimo definido y un stock inicial de cero.


## CU-08 — Modificar producto

**Actor:** Usuario.

**Descripción:** Permite modificar los datos de un producto registrado, conservando su código identificador y su historial.

**Precondiciones:** El usuario debe haber iniciado sesión y el producto debe existir.


### Flujo principal

1. El usuario selecciona la opción «Consultar stock de productos».
2. El sistema muestra el listado de productos.
3. El usuario selecciona el producto que desea modificar.
4. El sistema muestra los datos actuales del producto.
5. El usuario modifica los datos permitidos, como el nombre, el precio de venta o el stock mínimo.

6. El usuario confirma los cambios.
7. El sistema valida los datos ingresados.
8. El sistema guarda los cambios.
9. El sistema informa que el producto fue modificado correctamente.

### Flujo alternativo / excepciones

- 4.1. El sistema no encuentra el producto seleccionado.
- 4.2. El sistema informa que el producto no existe y finaliza el caso de uso.
- 8.1. El sistema detecta datos inválidos o campos obligatorios sin completar.
- 8.2. El sistema informa los errores encontrados.
- 8.3. Ir al paso 6.
- 9.1. Ocurre un error al guardar los cambios.
- 9.2. El sistema informa que no se pudo modificar el producto y conserva los datos anteriores.

**Postcondición:** Los datos del producto quedan actualizados. El código identificador y el historial de movimientos se conservan.


## CU-09 — Desactivar producto

**Actor:** Usuario.

**Descripción:** Permite desactivar un producto para impedir su utilización en nuevas operaciones, conservando su historial.

**Precondiciones:** El usuario debe haber iniciado sesión y el producto debe existir.


### Flujo principal

1. El usuario selecciona la opción «Consultar stock de productos».
2. El sistema muestra el listado de productos.
3. El usuario selecciona el producto que desea desactivar.
4. El sistema muestra los datos del producto y solicita confirmación.
5. El usuario confirma la desactivación.
6. El sistema cambia el estado del producto a inactivo.
7. El sistema informa que el producto fue desactivado correctamente.

### Flujo alternativo / excepciones

- 4.1. El sistema no encuentra el producto seleccionado.
- 4.2. El sistema informa que el producto no existe y finaliza el caso de uso.
- 6.1. El usuario cancela la operación.
- 6.2. El sistema conserva el estado actual del producto y finaliza el caso de uso.
- 6.3. El producto ya se encuentra desactivado.
- 6.4. El sistema informa que el producto ya está inactivo y finaliza el caso de uso.
- 7.1. Ocurre un error al guardar el cambio de estado.
- 7.2. El sistema informa que no se pudo desactivar el producto.
**Postcondición:** El producto queda inactivo y conserva su historial. No puede incluirse en nuevas ventas ni compras que requieran productos activos.


## CU-10 — Registrar venta

**Actor:** Usuario.

**Descripción:** Permite registrar una venta de uno o más productos, calcular su importe total y actualizar el stock.

**Precondiciones:** El usuario debe haber iniciado sesión y deben existir productos activos disponibles para vender.


### Flujo principal

1. El usuario selecciona la opción «Registrar venta».
2. El sistema permite seleccionar los productos que integrarán la venta.
3. El usuario selecciona los productos e ingresa las cantidades correspondientes.
4. El sistema valida que los productos estén activos y que exista stock suficiente.
5. El sistema calcula los importes de los productos y el total de la venta.
6. El sistema muestra el detalle de la venta para su revisión.
7. El usuario confirma la venta.
8. El sistema registra la venta y sus detalles.
9. El sistema descuenta del stock las cantidades vendidas.
10. El sistema informa que la venta fue registrada correctamente.

### Flujo alternativo / excepciones

- 4.1. El usuario ingresa cantidades inválidas.
- 4.2. El sistema informa el error y solicita corregir las cantidades.
- 4.3. Ir al paso 4.
- 5.1. El sistema detecta que la cantidad solicitada de un producto supera el stock disponible.

- 5.2. El sistema informa qué producto presenta el problema.
- 5.3. El usuario modifica la cantidad solicitada.
- 5.4. Ir al paso 5.
- 5.5. Si el usuario decide cancelar la venta, el sistema finaliza el caso de uso sin registrar la operación.

- 5.6. El sistema detecta que uno de los productos seleccionados está inactivo o no existe.

- 5.7. El sistema informa que el producto no puede incluirse en la venta y permite modificar la selección.

- 8.1. El usuario cancela la operación antes de confirmar.
- 8.2. El sistema no registra la venta ni modifica el stock y finaliza el caso de uso.
- 9.1. Ocurre un error al registrar la venta o actualizar el stock.
- 9.2. El sistema revierte los cambios de la operación e informa que la venta no pudo registrarse.

**Postcondición:** La venta queda registrada con sus detalles e importe total y el stock disminuye según las cantidades vendidas. No se requiere asociar la venta a un cliente.


## CU-11 — Consultar ventas

**Actor:** Usuario.

**Descripción:** Permite consultar las ventas registradas y sus detalles.

**Precondiciones:** El usuario debe haber iniciado sesión.


### Flujo principal

1. El usuario selecciona la opción «Consultar ventas».
2. El sistema muestra el listado de ventas registradas.
3. El usuario puede indicar un período para filtrar las ventas.
4. El sistema muestra las ventas que cumplen con los criterios seleccionados.
5. El usuario selecciona una venta.
6. El sistema muestra la fecha, los productos, las cantidades, los precios registrados y el importe total.


### Flujo alternativo / excepciones

- 3.1. El sistema verifica que no existen ventas registradas.
- 3.2. El sistema informa que no hay ventas para mostrar y finaliza el caso de uso.
- 5.1. El sistema verifica que no existen ventas que coincidan con los filtros seleccionados.

- 5.2. El sistema informa que no se encontraron resultados y vuelve al paso 4.
**Postcondición:** La información de las ventas queda disponible para su consulta. No se modifica información del sistema.


## CU-12 — Consultar compras

**Actor:** Usuario.

**Descripción:** Permite consultar las compras de mercadería registradas y sus detalles.

**Precondiciones:** El usuario debe haber iniciado sesión.


### Flujo principal

1. El usuario selecciona la opción «Consultar compras».
2. El sistema muestra el listado de compras registradas.
3. El usuario puede filtrar las compras por período o proveedor.
4. El sistema muestra las compras que cumplen con los criterios seleccionados.
5. El usuario selecciona una compra.
6. El sistema muestra el proveedor, la fecha, los productos, las cantidades, los costos unitarios y el importe total.


### Flujo alternativo / excepciones

- 3.1. El sistema verifica que no existen compras registradas.
- 3.2. El sistema informa que no hay compras para mostrar y finaliza el caso de uso.

- 5.1. El sistema verifica que no existen compras que coincidan con los filtros seleccionados.

- 5.2. El sistema informa que no se encontraron resultados y vuelve al paso 4.
**Postcondición:** La información de las compras queda disponible para su consulta. No se modifica información del sistema.


## CU-13 — Registrar gasto

**Actor:** Usuario.

**Descripción:** Permite registrar gastos operativos del almacén, como servicios, alquiler y mantenimiento.

**Precondiciones:** El usuario debe haber iniciado sesión.


### Flujo principal

1. El usuario selecciona la opción «Registrar gasto».
2. El sistema solicita los datos del gasto.
3. El usuario ingresa el concepto, la fecha, el importe y la categoría del gasto.
4. El usuario confirma el registro.
5. El sistema valida los datos ingresados.
6. El sistema registra el gasto.
7. El sistema informa que el gasto fue registrado correctamente.

### Flujo alternativo / excepciones

- 6.1. El sistema detecta que faltan datos obligatorios o que el importe es inválido o negativo.

- 6.2. El sistema informa los errores encontrados.
- 6.3. Ir al paso 3.
- 6.4. El sistema detecta que la fecha o la categoría no cumplen las reglas establecidas.

- 6.5. El sistema informa el error y permite corregir los datos.
- 6.6. Ir al paso 3.
- 7.1. Ocurre un error al guardar la información.
- 7.2. El sistema informa que el gasto no pudo registrarse y finaliza el caso de uso.
**Postcondición:** El gasto queda registrado y disponible para su consulta y para la elaboración del resumen de ingresos y gastos.


## CU-14 — Consultar gastos

**Actor:** Usuario.

**Descripción:** Permite consultar los gastos registrados y sus detalles.

**Precondiciones:** El usuario debe haber iniciado sesión.


### Flujo principal

1. El usuario selecciona la opción «Consultar gastos».
2. El sistema muestra el listado de gastos registrados.
3. El usuario puede filtrar los gastos por período o categoría.
4. El sistema muestra los gastos que cumplen con los criterios seleccionados.
5. El usuario selecciona un gasto.
6. El sistema muestra la fecha, el concepto, la categoría y el importe del gasto.

### Flujo alternativo / excepciones

- 3.1. El sistema verifica que no existen gastos registrados.
- 3.2. El sistema informa que no hay gastos para mostrar y finaliza el caso de uso.
- 5.1. El sistema verifica que no existen gastos que coincidan con los filtros seleccionados.

- 5.2. El sistema informa que no se encontraron resultados y vuelve al paso 4.
**Postcondición:** La información de los gastos queda disponible para su consulta. No se modifica información del sistema.


## CU-15 — Registrar compra de mercadería

**Actor:** Usuario.

**Descripción:** Permite registrar una compra a un proveedor, especificando los productos adquiridos, sus cantidades y costos unitarios, y actualizando el stock.

**Precondiciones:** El usuario debe haber iniciado sesión y deben existir al menos un proveedor activo y los productos correspondientes en el sistema.


### Flujo principal

1. El usuario selecciona la opción «Registrar compra de mercadería».
2. El sistema permite seleccionar un proveedor activo.
3. El usuario selecciona el proveedor.
4. El sistema permite agregar productos a la compra.
5. El usuario selecciona los productos e ingresa las cantidades y los costos unitarios.

6. El sistema valida los datos y calcula el importe total de la compra.
7. El sistema muestra el detalle de la compra para su revisión.
8. El usuario confirma la compra.
9. El sistema registra la compra y sus detalles.
10. El sistema incrementa el stock según las cantidades adquiridas.
11. El sistema informa que la compra fue registrada correctamente.

### Flujo alternativo / excepciones

- 3.1. El sistema verifica que no existen proveedores activos.
- 3.2. El sistema informa que no es posible registrar la compra sin un proveedor activo y finaliza el caso de uso.

- 4.1. El proveedor seleccionado no existe o se encuentra inactivo.
- 4.2. El sistema informa que el proveedor no puede utilizarse y vuelve al paso 3.
- 6.1. El sistema detecta que un producto no existe, está inactivo o tiene una cantidad o costo unitario inválido.

- 6.2. El sistema informa el problema y permite corregir el detalle.
- 6.3. Ir al paso 5.
- 9.1. El usuario cancela la operación antes de confirmarla.
- 9.2. El sistema no registra la compra ni modifica el stock y finaliza el caso de uso.

- 10.1. Ocurre un error al registrar la compra o actualizar el stock.
- 10.2. El sistema revierte los cambios de la operación e informa que la compra no pudo registrarse.

**Postcondición:** La compra queda registrada con su proveedor y detalle, y el stock aumenta según las cantidades adquiridas.


## CU-16 — Consultar resumen de ingresos y gastos

**Actor:** Usuario.

**Descripción:** Permite consultar los ingresos por ventas, las compras de mercadería y los gastos operativos de un período determinado, presentados por separado.

**Precondiciones:** El usuario debe haber iniciado sesión.


### Flujo principal

1. El usuario selecciona la opción «Consultar resumen de ingresos y gastos».
2. El sistema solicita el período que se desea consultar.
3. El usuario ingresa las fechas de inicio y fin.
4. El sistema valida el período ingresado.
5. El sistema recupera las ventas, las compras de mercadería y los gastos operativos registrados durante el período.

6. El sistema calcula los totales correspondientes a cada categoría.
7. El sistema muestra el total de ingresos por ventas, el total de compras de mercadería y el total de gastos operativos.


### Flujo alternativo / excepciones

- 5.1. El sistema detecta que las fechas son inválidas o que la fecha de inicio es posterior a la fecha de fin.

- 5.2. El sistema informa el error y solicita corregir el período.
- 5.3. Ir al paso 3.
- 6.1. El sistema verifica que no existen movimientos registrados durante el período seleccionado.

- 6.2. El sistema informa que no hay movimientos para mostrar y presenta los totales en cero.

- 6.3. Fin del caso de uso.
- 6.4. Ocurre un error al recuperar o procesar la información.
- 6.5. El sistema informa que no pudo generar el resumen y finaliza el caso de uso.
**Postcondición:** El resumen queda disponible para su consulta, sin modificar la información registrada.