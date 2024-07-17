package com.example.fishinglog.service;

import com.example.fishinglog.entity.FishingLog;
import com.example.fishinglog.repository.FishingLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FishingLogService {

    @Autowired
    private FishingLogRepository fishingLogRepository;

    public List<FishingLog> getAllLogs(){
        return fishingLogRepository.findAll();
    }

    public Optional<FishingLog> getLogById(Long id){
        return fishingLogRepository.findById(id);
    }

    public FishingLog createLog(FishingLog fishingLog){
        return fishingLogRepository.save(fishingLog);
    }

    public FishingLog updateLog(Long id, FishingLog fishingLog) {
        Optional<FishingLog> existingLog = fishingLogRepository.findById(id);
        if (existingLog.isPresent()) {
            FishingLog logToUpdate = existingLog.get();

            logToUpdate.setFishSpecies(fishingLog.getFishSpecies());
            logToUpdate.setDate(fishingLog.getDate());
            logToUpdate.setLocation(fishingLog.getLocation());
            logToUpdate.setBait(fishingLog.getBait());

            return fishingLogRepository.save(logToUpdate);
        }
        return null;
    }

    public void deleteLog(Long id){
        fishingLogRepository.deleteById(id);
    }
}
