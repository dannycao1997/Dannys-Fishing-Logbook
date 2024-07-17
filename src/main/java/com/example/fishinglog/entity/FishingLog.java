package com.example.fishinglog.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data //lombok annotation to generate getters and setters, toString, equals and hashcode
public class FishingLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fishSpecies;
    private String location;
    private String bait;
    private LocalDate date;

    private String imageUrl; // experimenting with new field for storing image url







}
