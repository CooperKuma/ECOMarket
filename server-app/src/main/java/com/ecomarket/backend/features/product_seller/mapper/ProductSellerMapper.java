package com.ecomarket.backend.features.product_seller.mapper;

import com.ecomarket.backend.features.product.model.Product;
import com.ecomarket.backend.features.product_seller.dto.ProductSellerDTO;
import org.springframework.stereotype.Component;

@Component
public class ProductSellerMapper {

    public ProductSellerDTO toDTO(Product p) {
        return new ProductSellerDTO(
            p.getId(), p.getName(), p.getDescription(),
            p.getPrice(), p.getOriginalPrice(), p.getImages(),
            p.getFreeShipping(), p.getStock(),
            p.getCategory(), p.getSubcategory(),
            p.getFeatures(), p.getColors(), p.getWarranty()
        );
    }

    public void updateEntity(Product p, ProductSellerDTO dto) {
        p.setName(dto.name());
        p.setDescription(dto.description());
        p.setPrice(dto.price());
        p.setOriginalPrice(dto.originalPrice());
        p.setImages(dto.images());
        p.setFreeShipping(dto.freeShipping());
        p.setStock(dto.stock());
        p.setCategory(dto.category());
        p.setSubcategory(dto.subcategory());
        p.setFeatures(dto.features());
        p.setColors(dto.colors());
        p.setWarranty(dto.warranty());
    }
}