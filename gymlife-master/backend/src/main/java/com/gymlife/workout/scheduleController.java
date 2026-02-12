package com.gymlife.workout;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/manage/schedules")
@RequiredArgsConstructor
public class scheduleController {

    private final workoutService workoutService;

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<ScheduleDTO>> getByMember(@PathVariable Integer memberId) {
        return ResponseEntity.ok(workoutService.getSchedulesByMember(memberId));
    }

    @PostMapping
    public ResponseEntity<ScheduleDTO> create(@Valid @RequestBody ScheduleDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workoutService.createSchedule(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScheduleDTO> update(@PathVariable Integer id,
                                              @Valid @RequestBody ScheduleDTO dto) {
        return ResponseEntity.ok(workoutService.updateSchedule(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Integer id) {
        workoutService.deleteSchedule(id);
        return ResponseEntity.ok(Map.of("message", "Schedule deleted successfully"));
    }
}
