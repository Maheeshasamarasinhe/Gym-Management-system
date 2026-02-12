package com.gymlife.workout;

import com.gymlife.member.Member;
import com.gymlife.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class workoutService {

    private final exerciseRepository exerciseRepo;
    private final scheduleRepository scheduleRepo;
    private final MemberRepository memberRepository;

    // ══════════════════ EXERCISES ══════════════════

    public List<ExerciseDTO> getAllExercises() {
        return exerciseRepo.findAll().stream().map(this::toExerciseDTO).collect(Collectors.toList());
    }

    public ExerciseDTO getExerciseById(Integer id) {
        exercise ex = exerciseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found with id: " + id));
        return toExerciseDTO(ex);
    }

    public ExerciseDTO createExercise(ExerciseDTO dto) {
        exercise ex = exercise.builder()
                .name(dto.getName())
                .steps(dto.getSteps() != null ? dto.getSteps() : 0)
                .rounds(dto.getRounds() != null ? dto.getRounds() : 0)
                .imageUrl(dto.getImageUrl())
                .videoUrl(dto.getVideoUrl())
                .build();
        return toExerciseDTO(exerciseRepo.save(ex));
    }

    public ExerciseDTO updateExercise(Integer id, ExerciseDTO dto) {
        exercise ex = exerciseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found with id: " + id));

        if (dto.getName() != null) ex.setName(dto.getName());
        if (dto.getSteps() != null) ex.setSteps(dto.getSteps());
        if (dto.getRounds() != null) ex.setRounds(dto.getRounds());
        if (dto.getImageUrl() != null) ex.setImageUrl(dto.getImageUrl());
        if (dto.getVideoUrl() != null) ex.setVideoUrl(dto.getVideoUrl());

        return toExerciseDTO(exerciseRepo.save(ex));
    }

    public void deleteExercise(Integer id) {
        if (!exerciseRepo.existsById(id)) {
            throw new RuntimeException("Exercise not found with id: " + id);
        }
        exerciseRepo.deleteById(id);
    }

    // ══════════════════ SCHEDULES ══════════════════

    public List<ScheduleDTO> getSchedulesByMember(Integer memberId) {
        return scheduleRepo.findByMemberId(memberId)
                .stream().map(this::toScheduleDTO).collect(Collectors.toList());
    }

    public ScheduleDTO createSchedule(ScheduleDTO dto) {
        Member member = memberRepository.findById(dto.getMemberId())
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + dto.getMemberId()));

        schedule s = schedule.builder()
                .member(member)
                .exerciseName(dto.getExerciseName())
                .steps(dto.getSteps() != null ? dto.getSteps() : 0)
                .rounds(dto.getRounds() != null ? dto.getRounds() : 0)
                .imageUrl(dto.getImageUrl())
                .videoUrl(dto.getVideoUrl())
                .build();

        return toScheduleDTO(scheduleRepo.save(s));
    }

    public ScheduleDTO updateSchedule(Integer id, ScheduleDTO dto) {
        schedule s = scheduleRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));

        if (dto.getExerciseName() != null) s.setExerciseName(dto.getExerciseName());
        if (dto.getSteps() != null) s.setSteps(dto.getSteps());
        if (dto.getRounds() != null) s.setRounds(dto.getRounds());
        if (dto.getImageUrl() != null) s.setImageUrl(dto.getImageUrl());
        if (dto.getVideoUrl() != null) s.setVideoUrl(dto.getVideoUrl());

        return toScheduleDTO(scheduleRepo.save(s));
    }

    @Transactional
    public void deleteSchedule(Integer id) {
        if (!scheduleRepo.existsById(id)) {
            throw new RuntimeException("Schedule not found with id: " + id);
        }
        scheduleRepo.deleteById(id);
    }

    // ══════════════════ MAPPERS ══════════════════

    private ExerciseDTO toExerciseDTO(exercise ex) {
        return ExerciseDTO.builder()
                .id(ex.getId())
                .name(ex.getName())
                .steps(ex.getSteps())
                .rounds(ex.getRounds())
                .imageUrl(ex.getImageUrl())
                .videoUrl(ex.getVideoUrl())
                .build();
    }

    private ScheduleDTO toScheduleDTO(schedule s) {
        return ScheduleDTO.builder()
                .id(s.getId())
                .memberId(s.getMember().getId())
                .exerciseName(s.getExerciseName())
                .steps(s.getSteps())
                .rounds(s.getRounds())
                .imageUrl(s.getImageUrl())
                .videoUrl(s.getVideoUrl())
                .build();
    }
}
