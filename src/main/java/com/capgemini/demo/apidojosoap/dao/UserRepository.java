package com.capgemini.demo.apidojosoap.dao;

import com.capgemini.demo.apidojosoap.entities.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Usuario, Long> {
}
