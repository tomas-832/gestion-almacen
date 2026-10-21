package com.almacen.gestion_almacen.controller;

import java.util.List;

import com.almacen.gestion_almacen.repository.CompraRepository;
import com.almacen.gestion_almacen.model.Compra;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/compras")
public class CompraController {

    private final CompraRepository compraRepository;

    public CompraController(CompraRepository compraRepository) {
        this.compraRepository = compraRepository;
    }

    //Este metodo atiende las solicitudes GET (HTTP) dirigidas a "/compras"
    @GetMapping
    public List<Compra> listar() {
        return compraRepository.encontrarCompras();
    }
}
