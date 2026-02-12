package com.gymlife.trainer;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainerService {

    private final TrainerRepository trainerRepository;

    public List<TrainerDTO> getAll() {
        return trainerRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public TrainerDTO getById(Integer id) {
        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found with id: " + id));
        return toDTO(trainer);
    }

    public TrainerDTO update(Integer id, TrainerDTO dto) {
        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found with id: " + id));

        if (dto.getName() != null) trainer.setName(dto.getName());
        if (dto.getExperience() != null) trainer.setExperience(dto.getExperience());
        if (dto.getPhone() != null) trainer.setPhone(dto.getPhone());
        if (dto.getEmail() != null) trainer.setEmail(dto.getEmail());
        if (dto.getInstagram() != null) trainer.setInstagram(dto.getInstagram());
        if (dto.getFacebook() != null) trainer.setFacebook(dto.getFacebook());
        if (dto.getProfilePicture() != null) trainer.setProfilePicture(dto.getProfilePicture());
        if (dto.getStatus() != null) trainer.setStatus(dto.getStatus());

        return toDTO(trainerRepository.save(trainer));
    }

    public void delete(Integer id) {
        if (!trainerRepository.existsById(id)) {
            throw new RuntimeException("Trainer not found with id: " + id);
        }
        trainerRepository.deleteById(id);
    }

    private TrainerDTO toDTO(Trainer trainer) {
        return TrainerDTO.builder()
                .id(trainer.getId())
                .userId(trainer.getUser().getId())
                .name(trainer.getName())
                .experience(trainer.getExperience())
                .phone(trainer.getPhone())
                .email(trainer.getEmail())
                .instagram(trainer.getInstagram())
                .facebook(trainer.getFacebook())
                .profilePicture(trainer.getProfilePicture())
                .status(trainer.getStatus())
                .build();
    }
}
