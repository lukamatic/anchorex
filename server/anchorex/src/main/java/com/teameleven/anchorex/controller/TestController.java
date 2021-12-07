package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Test;
import com.teameleven.anchorex.dto.TestDto;
import com.teameleven.anchorex.mapper.TestMapper;
import com.teameleven.anchorex.service.TestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<TestDto> create(@Valid @RequestBody Test test) throws Exception {
        var savedTest = testService.create(test);
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
        var testDto = TestMapper.TestToTestDto(test);
        return new ResponseEntity<>(testDto, HttpStatus.OK);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TestDto> findOneByName(@RequestParam("name") String name) {
        var test = testService.findOneByName(name);
        var testDto = TestMapper.TestToTestDto(test);
        return new ResponseEntity<>(testDto, HttpStatus.OK);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TestDto> update(@RequestBody Test test) throws Exception {
        var updatedTest = testService.update(test);
        var testDto = TestMapper.TestToTestDto(updatedTest);
        return new ResponseEntity<>(testDto, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Test> delete(@PathVariable("id") Long id) {
        testService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
