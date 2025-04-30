package com.ecomarket.backend.features.product.service;

import com.ecomarket.backend.exception.NotFoundException;
import com.ecomarket.backend.features.product.dto.ProductDetailDTO;
import com.ecomarket.backend.features.product.dto.ProductListDTO;
import com.ecomarket.backend.features.product.mapper.ProductMapper;
import com.ecomarket.backend.features.product.model.Product;
import com.ecomarket.backend.features.product.repository.ProductRepository;
import com.ecomarket.backend.features.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    public List<ProductListDTO> getProducts(String category, String search, int page) {
        return productRepository
                .findByCategoryContainingIgnoreCaseAndNameContainingIgnoreCase(
                        category != null ? category : "",
                        search != null ? search : ""
                )
                .stream()
                .map(productMapper::toListDTO)
                .toList();
    }

    @Override
    public ProductDetailDTO getProductDetail(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Producto no encontrado con id: " + id));
        return productMapper.toDetailDTO(product);
    }

    @Override
    public List<ProductListDTO> getSimilarProducts(Long id) {
        Product base = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Producto base no encontrado con id: " + id));

        return productRepository
                .findTop4ByCategoryAndIdNot(base.getCategory(), base.getId())
                .stream()
                .map(productMapper::toListDTO)
                .toList();
    }
}