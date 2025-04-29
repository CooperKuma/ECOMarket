package com.ecomarket.backend.features.product.mapper;

import com.ecomarket.backend.features.product.dto.ProductDetailDTO;
import com.ecomarket.backend.features.product.dto.ProductListDTO;
import com.ecomarket.backend.features.product.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
    public ProductListDTO toListDTO(Product product) {
        return new ProductListDTO(
            product.getId(), product.getName(), product.getDescription(),
            product.getPrice(), product.getOriginalPrice(),
            product.getRating(), product.getReviews(),
            product.getImages().isEmpty() ? null : product.getImages().get(0),
            product.getFreeShipping(), product.getStock(),
            product.getSeller().getFirstName() + " " + product.getSeller().getLastName(),
            product.getCategory()
        );
    }

    public ProductDetailDTO toDetailDTO(Product product) {
        return new ProductDetailDTO(
            product.getId(), product.getName(), product.getDescription(),
            product.getPrice(), product.getOriginalPrice(),
            product.getRating(), product.getReviews(),
            product.getImages(), product.getFreeShipping(), product.getStock(),
            new ProductDetailDTO.SellerDTO(
                product.getSeller().getFirstName() + " " + product.getSeller().getLastName(),
                4.9, 1245
            ),
            product.getCategory(), product.getSubcategory(),
            product.getFeatures(), product.getSpecifications().toMap(),
            product.getColors(), product.getWarranty()
        );
    }
}