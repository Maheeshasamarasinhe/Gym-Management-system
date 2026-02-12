package com.gymlife.workout;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface scheduleRepository extends JpaRepository<schedule, Integer> {

    List<schedule> findByMemberId(Integer memberId);

    void deleteByMemberId(Integer memberId);
}
