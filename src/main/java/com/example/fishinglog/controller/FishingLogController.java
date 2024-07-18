package com.example.fishinglog.controller;

import com.example.fishinglog.entity.FishingLog;
import com.example.fishinglog.service.FishingLogService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/logs")
public class FishingLogController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final FishingLogService fishingLogService;

    public FishingLogController(FishingLogService fishingLogService) {
        this.fishingLogService = fishingLogService;
    }

    @GetMapping
    public List<FishingLog> getAllLogs() {

        return fishingLogService.getAllLogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FishingLog> getLogById(@PathVariable Long id) {

        Optional<FishingLog> log = fishingLogService.getLogById(id);
        return log.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createLog(@RequestPart("log") FishingLog fishingLog, @RequestPart("file") MultipartFile file) {

        try {
            FishingLog savedLog = fishingLogService.createLog(fishingLog, file);
            return new ResponseEntity<>(savedLog, HttpStatus.CREATED);
        } catch (IOException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable Long id) {

        fishingLogService.deleteLog(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<byte[]> getImage(@PathVariable String filename) {
        Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
        try {
            byte[] image = Files.readAllBytes(filePath);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, Files.probeContentType(filePath));
            headers.add("X-Content-Type-Options", "nosniff");
            return new ResponseEntity<>(image, headers, HttpStatus.OK);
        } catch (IOException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
