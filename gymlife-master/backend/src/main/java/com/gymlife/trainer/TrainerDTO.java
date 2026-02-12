package com.gymlife.trainer;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainerDTO {

    private Integer id;

    @JsonProperty("user_id")
    private Integer userId;

    private String name;

    private String experience;

    private String phone;

    private String email;

    private String instagram;

    private String facebook;

    @JsonProperty("profile_picture")
    private String profilePicture;

    private String status;
}
