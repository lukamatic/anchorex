package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Test;
import com.teameleven.anchorex.dto.CreateTestDto;
import com.teameleven.anchorex.dto.TestDto;
import com.teameleven.anchorex.dto.UpdateTestDto;
import com.teameleven.anchorex.mapper.TestMapper;
import com.teameleven.anchorex.service.TestService;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api/tests")
public class TestController {
    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TestDto> create(@Valid @RequestBody CreateTestDto createTestDto) throws Exception {
        var savedTest = testService.create(createTestDto);
        var testDto = TestMapper.TestToTestDto(savedTest);
        return new ResponseEntity<>(testDto, HttpStatus.CREATED);
    }

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<TestDto>> findAll() {
        var tests = testService.findAll();
        var testDtos = TestMapper.TestsToTestDtos(tests);
        return new ResponseEntity<>(testDtos, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TestDto> findOneById(@PathVariable("id") Long id) {
        var test = testService.findOneById(id);

        if (test == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Test with id %d doesn't exist.", id));
        }

        var testDto = TestMapper.TestToTestDto(test);
        return new ResponseEntity<>(testDto, HttpStatus.OK);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TestDto> findOneByName(@RequestParam("name") String name) {
        var test = testService.findOneByName(name);

        if (test == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Test with name %s doesn't exist.", name));
        }

        var testDto = TestMapper.TestToTestDto(test);
        return new ResponseEntity<>(testDto, HttpStatus.OK);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TestDto> update(@Valid @RequestBody UpdateTestDto updateTestDto) throws Exception {
        var updatedTest = testService.update(updateTestDto);
        var testDto = TestMapper.TestToTestDto(updatedTest);
        return new ResponseEntity<>(testDto, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Test> delete(@PathVariable("id") Long id) {
        try {
            testService.delete(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Test with id %d doesn't exist.", id));
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
