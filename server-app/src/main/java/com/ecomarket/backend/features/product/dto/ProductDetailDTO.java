package com.ecomarket.backend.features.product.dto;

import java.util.List;
import java.util.Map;

public record ProductDetailDTO(
    Long id,
    String name,
    String description,
    Integer price,
    Integer originalPrice,
    Double rating,
    Integer reviews,
    List<String> images,
    Boolean freeShipping,
    Integer stock,
    SellerDTO seller,
    String category,
    String subcategory,
    List<String> features,
    Map<String, String> specifications,
    List<String> colors,
    String warranty
) {
    public record SellerDTO(String name, double rating, int sales) {}
}