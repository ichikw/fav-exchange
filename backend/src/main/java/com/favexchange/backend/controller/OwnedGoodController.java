package com.favexchange.backend.controller;

import com.favexchange.backend.entity.OwnedGood;
import com.favexchange.backend.repository.OwnedGoodRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goods")
@CrossOrigin(origins = "http://localhost:5173")
public class OwnedGoodController {

    private final OwnedGoodRepository repository;

    public OwnedGoodController(OwnedGoodRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<OwnedGood> getAll() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OwnedGood create(@RequestBody OwnedGood good) {
        return repository.save(good);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}