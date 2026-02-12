package com.gymlife.trainer;

import com.gymlife.auth.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trainers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String name;

    private String experience;

    @Column(length = 20)
    private String phone;

    private String email;

    private String instagram;

    private String facebook;

    @Column(name = "profile_picture", length = 500)
    private String profilePicture;

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String status = "ACTIVE";
}


