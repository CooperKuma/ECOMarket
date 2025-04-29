package com.ecomarket.backend.features.product_seller.dto;

import java.util.List;

public record ProductSellerDTO(
    Long id,
    String name,
    String description,
    Integer price,
    Integer originalPrice,
    List<String> images,
    Boolean freeShipping,
    Integer stock,
    String category,
    String subcategory,
    List<String> features,
    List<String> colors,
    String warranty
) {}