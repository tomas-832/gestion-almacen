package com.almacen.gestion_almacen.controller;

import java.util.List;

import com.almacen.gestion_almacen.repository.ProductoRepository;
import com.almacen.gestion_almacen.model.Producto;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.dao.DuplicateKeyException;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoRepository productoRepository;

    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    //Este metodo atiende las solicitudes GET (HTTP)
    @GetMapping
    public List<Producto> listarProductos() {
        return productoRepository.encontrarProductos();
    }

    //Este metodo atiende las solicitudes POST (HTTP)
    @PostMapping
    public Producto registrarProducto(@RequestBody Producto producto) {

        //Verifica que el formato del codigo sea valido
        if (producto.getCodigo() == null || !producto.getCodigo().matches("PROD_[0-9]{4,}")){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El código debe tener el formato PROD_0001.");
        }

        //Verifica que el codigo ingresado no exista
        try{
            return productoRepository.registrarProducto(producto);
        } 
        catch(DuplicateKeyException e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un producto con ese código.");
        }
    }

    //Este metodo atiende las solicitudes PATCH (HTTP)
    @PatchMapping("/{id}/activo")
    public void cambiarEstadoProducto(@PathVariable int id, @RequestBody boolean activo){

        Producto producto = new Producto();
        producto.setIdProducto(id);
        producto.setActivo(activo);
        productoRepository.cambiarEstadoProducto(producto);
    }
}

