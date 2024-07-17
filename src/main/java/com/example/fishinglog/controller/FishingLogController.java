package com.example.fishinglog.controller;

import com.example.fishinglog.entity.FishingLog;
import com.example.fishinglog.service.FishingLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/logs")
public class FishingLogController {

    @Autowired
    private FishingLogService fishingLogService;

    @GetMapping
    public List<FishingLog> getAllLogs(){
        return fishingLogService.getAllLogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FishingLog> getLogById(@PathVariable Long id) {
        Optional<FishingLog> log = fishingLogService.getLogById(id);
        return log.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public FishingLog createLog(@RequestBody FishingLog fishingLog) {
        return fishingLogService.createLog(fishingLog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FishingLog> updateLog (@PathVariable Long id, @RequestBody FishingLog fishingLog) {
        FishingLog updateLog = fishingLogService.updateLog(id, fishingLog);
        return updateLog != null ? ResponseEntity.ok(updateLog) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable Long id){
        fishingLogService.deleteLog(id);
        return ResponseEntity.noContent().build();

    }
}
