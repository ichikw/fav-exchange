package com.favexchange.backend.controller;

import com.favexchange.backend.entity.WantedGood;
import com.favexchange.backend.repository.WantedGoodRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wanted")

public class WantedGoodController {

    private final WantedGoodRepository repository;

    public WantedGoodController(WantedGoodRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<WantedGood> getAll() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WantedGood create(@RequestBody WantedGood wantedGood) {
        return repository.save(wantedGood);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}