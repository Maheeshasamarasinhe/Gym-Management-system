package com.gymlife.nutrition;

import com.gymlife.member.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "nutrition_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NutritionPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false)
    @Builder.Default
    private Float protein = 0f;

    @Column(nullable = false)
    @Builder.Default
    private Float carbs = 0f;

    @Column(nullable = false)
    @Builder.Default
    private Float fiber = 0f;

    @Column(name = "water_liters", nullable = false)
    @Builder.Default
    private Float waterLiters = 0f;
}
