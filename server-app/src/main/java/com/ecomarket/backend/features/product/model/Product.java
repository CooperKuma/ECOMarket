package com.ecomarket.backend.features.product.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Product {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private Integer price;
    private Integer originalPrice;
    private Double rating;
    private Integer reviews;
    private Boolean freeShipping;
    private Integer stock;

    @ElementCollection
    private List<String> images;

    @ManyToOne
    private Seller seller;

    private String category;
    private String subcategory;

    @ElementCollection
    private List<String> features;

    @Embedded
    private Specifications specifications;

    @ElementCollection
    private List<String> colors;

    private String warranty;
}