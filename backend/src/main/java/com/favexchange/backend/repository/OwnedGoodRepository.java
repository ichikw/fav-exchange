package com.favexchange.backend.repository;

import com.favexchange.backend.entity.OwnedGood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OwnedGoodRepository extends JpaRepository<OwnedGood, Long> {

    List<OwnedGood> findByUserId(Long userId);

}