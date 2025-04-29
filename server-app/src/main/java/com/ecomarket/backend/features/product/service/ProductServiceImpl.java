package com.ecomarket.backend.features.product.service;

import com.ecomarket.backend.features.product.dto.ProductDetailDTO;
import com.ecomarket.backend.features.product.dto.ProductListDTO;
import com.ecomarket.backend.features.product.exception.ProductNotFoundException;
import com.ecomarket.backend.features.product.mapper.ProductMapper;
import com.ecomarket.backend.features.product.model.Product;
import com.ecomarket.backend.features.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

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
                .orElseThrow(() -> new ProductNotFoundException(id));
        return productMapper.toDetailDTO(product);
    }

    @Override
    public ProductDetailDTO createProduct(ProductDetailDTO dto) {
        Product product = productMapper.toEntity(dto);
        return productMapper.toDetailDTO(productRepository.save(product));
    }

    @Override
    public ProductDetailDTO updateProduct(Long id, ProductDetailDTO dto) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        productMapper.updateEntity(existing, dto);
        return productMapper.toDetailDTO(productRepository.save(existing));
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }
        productRepository.deleteById(id);
    }

    @Override
    public List<ProductListDTO> getSimilarProducts(Long id) {
        Product base = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        return productRepository
                .findTop4ByCategoryAndIdNot(base.getCategory(), id)
                .stream()
                .map(productMapper::toListDTO)
                .toList();
    }
}