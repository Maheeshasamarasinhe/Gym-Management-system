package com.gymlife.nutrition;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NutritionPlanDTO {

    private Integer id;

    @NotNull(message = "member_id is required")
    @JsonProperty("member_id")
    private Integer memberId;

    private Float protein;

    private Float carbs;

    private Float fiber;

    @JsonProperty("water_liters")
    private Float waterLiters;
}
