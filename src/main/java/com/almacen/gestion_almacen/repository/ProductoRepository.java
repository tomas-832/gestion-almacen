package com.almacen.gestion_almacen.repository;

import java.util.List;

import com.almacen.gestion_almacen.model.Producto;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

//Accede a los datos almacenados
@Repository
public class ProductoRepository {

    private final JdbcTemplate jdbcTemplate;

    public ProductoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //Consulta de productos
    public List<Producto> encontrarProductos() {

        //Consulta SQL
        String consultaSql = """
        SELECT id_producto, codigo, nombre, precio_venta, stock_actual, stock_minimo, activo
        FROM productos
        ORDER BY activo DESC;
        """;

        //Arma los producto con el resultado de cada consulta
        return jdbcTemplate.query(consultaSql, (resultadoConsulta, numeroFila) -> {
            Producto producto = new Producto();

            producto.setIdProducto(resultadoConsulta.getInt("id_producto"));
            producto.setCodigo(resultadoConsulta.getString("codigo"));
            producto.setNombre(resultadoConsulta.getString("nombre"));
            producto.setPrecioVenta(resultadoConsulta.getBigDecimal("precio_venta"));
            producto.setStockActual(resultadoConsulta.getInt("stock_actual"));
            producto.setStockMinimo(resultadoConsulta.getInt("stock_minimo"));
            producto.setActivo(resultadoConsulta.getBoolean("activo"));

            return producto;
            }
        );
    }

    //Agregar un nuevo producto
    public Producto registrarProducto(Producto producto){
        //Consulta SQL
        String consultaSql = """
        INSERT INTO productos (codigo, nombre, precio_venta, stock_actual, stock_minimo)
        VALUES (?, ?, ?, 0, ?);
        """;

        jdbcTemplate.update(consultaSql, producto.getCodigo(), producto.getNombre(), producto.getPrecioVenta(), producto.getStockMinimo());

        return producto;
    }

    //Desctivar o activar producto 
    public void cambiarEstadoProducto(Producto producto){
        //Consutla SQL
        String consultaSql = """ 
        UPDATE productos
        SET activo = ?
        WHERE id_producto = ?;
        """;

        jdbcTemplate.update(consultaSql, producto.getActivo(), producto.getIdProducto());
    }
}

