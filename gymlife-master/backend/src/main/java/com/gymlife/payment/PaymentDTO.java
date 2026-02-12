package com.gymlife.payment;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDTO {

    private Integer id;

    @NotNull(message = "member_id is required")
    @JsonProperty("member_id")
    private Integer memberId;

    @NotNull(message = "payment_date is required")
    @JsonProperty("payment_date")
    private LocalDate paymentDate;

    @NotNull(message = "payment_month is required")
    @JsonProperty("payment_month")
    private String paymentMonth;

    private String status;
}
