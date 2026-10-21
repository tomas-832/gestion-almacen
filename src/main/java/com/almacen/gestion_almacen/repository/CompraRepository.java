package com.almacen.gestion_almacen.repository;

import java.util.List;

import com.almacen.gestion_almacen.model.Compra;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

//Accede a los datos almacenados
@Repository 
public class CompraRepository {
    private final JdbcTemplate jdbcTemplate;

    public CompraRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //Consulta de compras
    public List<Compra> encontrarCompras(){

        //Consulta SQL
        String consultaSql = """
        SELECT *
        FROM compras;
        """;

        //Arma las compras con el resultado de cada consulta
        return jdbcTemplate.query(consultaSql, (resultadoConsulta, numeroFila) -> {
            Compra compra = new Compra();

            compra.setFecha(resultadoConsulta.getDate("fecha").toLocalDate());
            compra.setIdProveedor(resultadoConsulta.getInt("id_proveedor"));
            compra.setIdUsuario(resultadoConsulta.getInt("id_usuario"));

            return compra;
            }
        );
    }

}
