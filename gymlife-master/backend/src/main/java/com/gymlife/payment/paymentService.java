package com.gymlife.payment;

import com.gymlife.member.Member;
import com.gymlife.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final MemberRepository memberRepository;

    public List<PaymentDTO> getByMember(Integer memberId) {
        return paymentRepository.findByMemberIdOrderByPaymentDateDesc(memberId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public PaymentDTO create(PaymentDTO dto) {
        Member member = memberRepository.findById(dto.getMemberId())
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + dto.getMemberId()));

        Payment payment = Payment.builder()
                .member(member)
                .paymentDate(dto.getPaymentDate())
                .paymentMonth(dto.getPaymentMonth())
                .status(dto.getStatus() != null ? dto.getStatus() : "PENDING")
                .build();

        return toDTO(paymentRepository.save(payment));
    }

    public PaymentDTO update(Integer id, PaymentDTO dto) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));

        if (dto.getPaymentDate() != null) payment.setPaymentDate(dto.getPaymentDate());
        if (dto.getPaymentMonth() != null) payment.setPaymentMonth(dto.getPaymentMonth());
        if (dto.getStatus() != null) payment.setStatus(dto.getStatus());

        return toDTO(paymentRepository.save(payment));
    }

    @Transactional
    public void delete(Integer id) {
        if (!paymentRepository.existsById(id)) {
            throw new RuntimeException("Payment not found with id: " + id);
        }
        paymentRepository.deleteById(id);
    }

    private PaymentDTO toDTO(Payment payment) {
        return PaymentDTO.builder()
                .id(payment.getId())
                .memberId(payment.getMember().getId())
                .paymentDate(payment.getPaymentDate())
                .paymentMonth(payment.getPaymentMonth())
                .status(payment.getStatus())
                .build();
    }
}
