package com.example.awesome.controller;

import com.example.awesome.model.Product;
import com.example.awesome.repository.ProductRepository;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ProductController {
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    @QueryMapping
    public List<Product> findAllProducts(){
        return productRepository.findAll();
    }
}
