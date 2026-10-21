package com.almacen.gestion_almacen.model;

import java.math.BigDecimal;

public class Producto {

    private String codigo;
    private String nombre;
    private BigDecimal precioVenta;
    private Integer stockActual;
    private Integer stockMinimo;
    private Boolean activo;

    public Producto() {

    }

    public Producto(String codigo, String nombre, BigDecimal precioventa, Integer stockActual, Integer stockMinimo, Boolean activo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precioVenta = precioventa;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
        this.activo = activo;
    }

    //Setters y Getters
    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(BigDecimal precioVenta) {
        this.precioVenta = precioVenta;
    }

    public int getStockActual() {
        return stockActual;
    }

    public void setStockActual(int stockActual) {
        this.stockActual = stockActual;
    }

    public int getStockMinimo() {
        return stockMinimo;
    }

    public void setStockMinimo(int stockMinimo) {
        this.stockMinimo = stockMinimo;
    }

    public boolean getActivo() {
        return activo;
    }

    public void setActivo(boolean activo){
        this.activo = activo;
    }
}
