package com.gymlife.member;

import com.gymlife.auth.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "members")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String name;

    private Integer age;

    @Column(length = 10)
    private String sex;

    @Column(length = 500)
    private String address;

    @Column(name = "contact_number", length = 20)
    private String contactNumber;

    @Column(name = "played_before")
    private Boolean playedBefore;

    private String goal;

    private Boolean vegetarian;

    @Column(name = "registered_date", nullable = false)
    private LocalDate registeredDate;

    @Column(name = "membership_status", nullable = false, length = 20)
    @Builder.Default
    private String membershipStatus = "ACTIVE";

    @Column(name = "payment_package", length = 100)
    private String paymentPackage;

    private Float height;

    @Column(name = "current_weight")
    private Float currentWeight;

    @Column(name = "chest_size")
    private Float chestSize;

    @PrePersist
    protected void onCreate() {
        if (registeredDate == null) {
            registeredDate = LocalDate.now();
        }
        if (membershipStatus == null) {
            membershipStatus = "ACTIVE";
        }
    }
}
