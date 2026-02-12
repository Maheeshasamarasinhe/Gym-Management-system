package com.gymlife.workout;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/manage/exercises")
@RequiredArgsConstructor
public class exerciseController {

    private final workoutService workoutService;

    @GetMapping
    public ResponseEntity<List<ExerciseDTO>> getAll() {
        return ResponseEntity.ok(workoutService.getAllExercises());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExerciseDTO> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(workoutService.getExerciseById(id));
    }

    @PostMapping
    public ResponseEntity<ExerciseDTO> create(@Valid @RequestBody ExerciseDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workoutService.createExercise(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExerciseDTO> update(@PathVariable Integer id,
                                              @Valid @RequestBody ExerciseDTO dto) {
        return ResponseEntity.ok(workoutService.updateExercise(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Integer id) {
        workoutService.deleteExercise(id);
        return ResponseEntity.ok(Map.of("message", "Exercise deleted successfully"));
    }
}
