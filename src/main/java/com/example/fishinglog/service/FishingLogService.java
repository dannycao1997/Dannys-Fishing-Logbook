package com.example.fishinglog.service;

import com.example.fishinglog.entity.FishingLog;

import com.example.fishinglog.repository.FishingLogRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class FishingLogService {

    @Autowired
    private FishingLogRepository fishingLogRepository;

    // directory where uploaded files will be saved
    private final String UPLOAD_DIR = "uploads/";

    // get all fishing logs
    public List<FishingLog> getAllLogs() {
        return fishingLogRepository.findAll();
    }

    // get a fishing log by its id
    public Optional<FishingLog> getLogById(Long id) {
        return fishingLogRepository.findById(id);
    }

    // delete a fishing log by its id
    public void deleteLog(Long id) {
        fishingLogRepository.deleteById(id);
    }

    // save uploaded file and return its new file name
    private String saveFile(MultipartFile file) throws IOException {
        // makes the upload directory exists
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // create a unique file name using the current timestamp
        String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        // copy the uploaded file to the target location
        Files.copy(file.getInputStream(), filePath);
        return fileName;
    }

    // create a new fishing log with an optional file upload
    public FishingLog createLog(FishingLog fishingLog, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            // Save the uploaded file and set the file URL in the log
            String fileName = saveFile(file);
            fishingLog.setImageUrl("/logs/images/" + fileName);
        }
        return fishingLogRepository.save(fishingLog);
    }

    // update an existing fishing log with an optional file upload
    public FishingLog updateLog(Long id, FishingLog fishingLog, MultipartFile file) throws IOException {
        Optional<FishingLog> existingLog = fishingLogRepository.findById(id);

        if (existingLog.isPresent()) {
            FishingLog logToUpdate = existingLog.get();

            // update log details
            logToUpdate.setFishSpecies(fishingLog.getFishSpecies());
            logToUpdate.setDate(fishingLog.getDate());
            logToUpdate.setLocation(fishingLog.getLocation());
            logToUpdate.setBait(fishingLog.getBait());

            // if a new file is uploaded, save it and update the file URL
            if (file != null && !file.isEmpty()) {
                String fileName = saveFile(file);
                logToUpdate.setImageUrl("/logs/images/" + fileName);
            }
            return fishingLogRepository.save(logToUpdate);
        }
        return null;
    }
}
