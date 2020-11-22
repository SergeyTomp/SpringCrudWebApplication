package com.javamaster.demo.service;

import com.javamaster.demo.dto.UsersDto;
import com.javamaster.demo.exception.ValidationException;

import java.util.List;

public interface UsersService {

    UsersDto saveUser(UsersDto usersDto) throws ValidationException;

    void deleteUser(Integer userId);

    UsersDto findByLogin(String login);

    List<UsersDto> findAll();
}
