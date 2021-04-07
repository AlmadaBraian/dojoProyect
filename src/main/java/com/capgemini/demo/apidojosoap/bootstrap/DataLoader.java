package com.capgemini.demo.apidojosoap.bootstrap;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import com.capgemini.demo.apidojosoap.entities.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();

        entityManager.getTransaction().begin();

        Usuario us = new Usuario();

        us.setEmail("email@gmail.com");
        us.setName("name");
        us.setPassword("password");

        entityManager.persist(us);

        entityManager.getTransaction().commit();
    }

}
