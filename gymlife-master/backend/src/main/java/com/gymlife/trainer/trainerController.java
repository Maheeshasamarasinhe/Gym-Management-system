package com.gymlife.trainer;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/manage/trainers")
@RequiredArgsConstructor
public class TrainerController {

    private final TrainerService trainerService;

    @GetMapping
    public ResponseEntity<List<TrainerDTO>> getAll() {
        return ResponseEntity.ok(trainerService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainerDTO> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(trainerService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrainerDTO> update(@PathVariable Integer id,
                                             @Valid @RequestBody TrainerDTO dto) {
        return ResponseEntity.ok(trainerService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Integer id) {
        trainerService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Trainer deleted successfully"));
    }
}
