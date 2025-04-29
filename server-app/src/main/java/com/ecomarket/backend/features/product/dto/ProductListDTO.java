package com.ecomarket.backend.features.product.dto;

public record ProductListDTO(
    Long id,
    String name,
    String description,
    Integer price,
    Integer originalPrice,
    Double rating,
    Integer reviews,
    String image,
    Boolean freeShipping,
    Integer stock,
    String seller,
    String category
) {}