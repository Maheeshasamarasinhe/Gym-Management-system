package com.gymlife.nutrition;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manage/nutrition")
@RequiredArgsConstructor
public class NutritionController {

    private final NutritionService nutritionService;

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<NutritionPlanDTO>> getByMember(@PathVariable Integer memberId) {
        return ResponseEntity.ok(nutritionService.getByMember(memberId));
    }

    @PostMapping
    public ResponseEntity<NutritionPlanDTO> create(@Valid @RequestBody NutritionPlanDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(nutritionService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NutritionPlanDTO> update(@PathVariable Integer id,
                                                   @Valid @RequestBody NutritionPlanDTO dto) {
        return ResponseEntity.ok(nutritionService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        nutritionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
