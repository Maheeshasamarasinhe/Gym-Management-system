package com.gymlife.nutrition;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NutritionRepository extends JpaRepository<NutritionPlan, Integer> {

    List<NutritionPlan> findByMemberId(Integer memberId);

    void deleteByMemberId(Integer memberId);
}
