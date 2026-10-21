package com.almacen.gestion_almacen.model;

import java.time.LocalDate;

public class Compra {

    private LocalDate fecha;
    private Integer idProveedor; 
    private Integer idUsuario;

    public Compra() {

    }

    public Compra(LocalDate fecha, Integer idProveedor, Integer idUsuario) {
        this.fecha = fecha;
        this.idProveedor = idProveedor;
        this.idUsuario = idUsuario;
    }

    //Setters y Getters
    public LocalDate getFecha(){
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Integer getIdProveedor(){
        return idProveedor;
    }

    public void setIdProveedor(Integer idProveedor) {
        this.idProveedor = idProveedor;
    }

    public Integer getIdUsuario(){
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }
}
