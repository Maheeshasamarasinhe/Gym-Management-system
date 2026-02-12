package com.gymlife.workout;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleDTO {

    private Integer id;

    @NotNull(message = "member_id is required")
    @JsonProperty("member_id")
    private Integer memberId;

    @NotBlank(message = "exercise_name is required")
    @JsonProperty("exercise_name")
    private String exerciseName;

    private Integer steps;

    private Integer rounds;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("video_url")
    private String videoUrl;
}
