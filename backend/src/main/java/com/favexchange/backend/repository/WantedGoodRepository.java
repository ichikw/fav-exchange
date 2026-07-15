package com.favexchange.backend.repository;

import com.favexchange.backend.entity.WantedGood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WantedGoodRepository extends JpaRepository<WantedGood, Long> {

    List<WantedGood> findByUserId(Long userId);
}