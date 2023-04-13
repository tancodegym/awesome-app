package com.example.awesome;

import com.example.awesome.model.Book;
import com.example.awesome.model.Product;
import com.example.awesome.model.Review;
import com.example.awesome.repository.BookRepository;
import com.example.awesome.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;


@SpringBootApplication
public class AwesomeApplication {

	public static void main(String[] args) {
		SpringApplication.run(AwesomeApplication.class, args);
	}
//	@Bean
//	CommandLineRunner commandLineRunner(BookRepository bookRepository){
//		return args -> {
//			Book reativeSpring = new Book( "Spring",484,"Josh Longh");
//			Review review = new Review("Great book","I really enjoy this book");
//			List<Review> reviews = new ArrayList<>();
//			reviews.add(review);
//			reativeSpring.setReviews(reviews);
//			bookRepository.save(reativeSpring);
//		};
//	}
//	@Bean
//	CommandLineRunner commandLineRunner(ProductRepository productRepository){
//		return args -> {
//			List<Product> products = new ArrayList<>();
//			products.add(new Product("Product1",true,1.99F));
//			products.add(new Product("Product2", false, 2.99F));
//			products.add(new Product("Product3",true, 3.2F));
//			products.add(new Product("Product4",true, 1.0F));
//			products.add(new Product("Product5",false, 0.5F));
//			productRepository.saveAll(products);
//			productRepository.findAll().forEach(System.out::println);
//		};
//	}

}
