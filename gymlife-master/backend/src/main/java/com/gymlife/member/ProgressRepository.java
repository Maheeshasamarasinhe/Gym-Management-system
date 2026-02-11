package com.gymlife.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Integer> {

    List<Progress> findByMemberIdOrderByIdDesc(Integer memberId);

    List<Progress> findByMemberId(Integer memberId);
}
