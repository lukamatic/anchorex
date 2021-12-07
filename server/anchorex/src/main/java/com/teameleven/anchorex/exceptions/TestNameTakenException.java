package com.teameleven.anchorex.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Name is already taken.")
public class TestNameTakenException extends RuntimeException {
}
