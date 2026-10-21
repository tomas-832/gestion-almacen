package com.almacen.gestion_almacen.controller;

import java.util.List;

import com.almacen.gestion_almacen.repository.ProductoRepository;
import com.almacen.gestion_almacen.model.Producto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoRepository productoRepository;

    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    //Este metodo atiende las solicitudes GET (HTTP) dirigidas a "/productos"
    @GetMapping
    public List<Producto> listar() {
        return productoRepository.encontrarProductos();
    }
}

