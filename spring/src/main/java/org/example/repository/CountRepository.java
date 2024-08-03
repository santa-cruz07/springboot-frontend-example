package org.example.repository;

import org.example.entity.Count;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CountRepository extends JpaRepository<Count, UUID> {
}
