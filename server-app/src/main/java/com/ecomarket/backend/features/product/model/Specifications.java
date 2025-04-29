package com.ecomarket.backend.features.product.model;

import jakarta.persistence.Embeddable;
import java.util.HashMap;
import java.util.Map;

@Embeddable
public class Specifications {
    private String marca;
    private String modelo;
    private String sistemaOperativo;
    private String tamañoDePantalla;
    private String resolucion;
    private String procesador;
    private String memoriaRAM;
    private String almacenamiento;
    private String camaraPrincipal;
    private String camaraFrontal;
    private String bateria;
    private String dimensiones;
    private String peso;

    public Map<String, String> toMap() {
        Map<String, String> map = new HashMap<>();
        map.put("Marca", marca);
        map.put("Modelo", modelo);
        map.put("Sistema Operativo", sistemaOperativo);
        map.put("Tamaño de pantalla", tamañoDePantalla);
        map.put("Resolución", resolucion);
        map.put("Procesador", procesador);
        map.put("Memoria RAM", memoriaRAM);
        map.put("Almacenamiento", almacenamiento);
        map.put("Cámara principal", camaraPrincipal);
        map.put("Cámara frontal", camaraFrontal);
        map.put("Batería", bateria);
        map.put("Dimensiones", dimensiones);
        map.put("Peso", peso);
        return map;
    }
}