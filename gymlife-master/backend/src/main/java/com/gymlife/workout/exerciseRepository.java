package com.gymlife.workout;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface exerciseRepository extends JpaRepository<exercise, Integer> {
}
