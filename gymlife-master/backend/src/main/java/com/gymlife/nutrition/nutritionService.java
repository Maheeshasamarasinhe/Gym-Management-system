package com.gymlife.nutrition;

import com.gymlife.member.Member;
import com.gymlife.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NutritionService {

    private final NutritionRepository nutritionRepository;
    private final MemberRepository memberRepository;

    // ── Get all nutrition plans for a member ──
    public List<NutritionPlanDTO> getByMember(Integer memberId) {
        return nutritionRepository.findByMemberId(memberId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ── Create a new nutrition plan ──
    public NutritionPlanDTO create(NutritionPlanDTO dto) {
        Member member = memberRepository.findById(dto.getMemberId())
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + dto.getMemberId()));

        NutritionPlan plan = NutritionPlan.builder()
                .member(member)
                .protein(dto.getProtein())
                .carbs(dto.getCarbs())
                .fiber(dto.getFiber())
                .waterLiters(dto.getWaterLiters())
                .build();

        return toDTO(nutritionRepository.save(plan));
    }

    // ── Update an existing nutrition plan ──
    public NutritionPlanDTO update(Integer id, NutritionPlanDTO dto) {
        NutritionPlan plan = nutritionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nutrition plan not found with id: " + id));

        if (dto.getProtein() != null) plan.setProtein(dto.getProtein());
        if (dto.getCarbs() != null) plan.setCarbs(dto.getCarbs());
        if (dto.getFiber() != null) plan.setFiber(dto.getFiber());
        if (dto.getWaterLiters() != null) plan.setWaterLiters(dto.getWaterLiters());

        return toDTO(nutritionRepository.save(plan));
    }

    // ── Delete a nutrition plan ──
    @Transactional
    public void delete(Integer id) {
        if (!nutritionRepository.existsById(id)) {
            throw new RuntimeException("Nutrition plan not found with id: " + id);
        }
        nutritionRepository.deleteById(id);
    }

    // ── Entity → DTO ──
    private NutritionPlanDTO toDTO(NutritionPlan plan) {
        return NutritionPlanDTO.builder()
                .id(plan.getId())
                .memberId(plan.getMember().getId())
                .protein(plan.getProtein())
                .carbs(plan.getCarbs())
                .fiber(plan.getFiber())
                .waterLiters(plan.getWaterLiters())
                .build();
    }
}
