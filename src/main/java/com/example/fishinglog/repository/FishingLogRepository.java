package com.example.fishinglog.repository;

import com.example.fishinglog.entity.FishingLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FishingLogRepository extends JpaRepository<FishingLog, Long> {

}
