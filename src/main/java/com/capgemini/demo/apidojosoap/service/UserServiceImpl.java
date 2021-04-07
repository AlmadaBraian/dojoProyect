package com.capgemini.demo.apidojosoap.service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

import com.capgemini.demo.apidojosoap.dto.EventRequest;
import com.capgemini.demo.apidojosoap.dto.EventResponse;
import com.capgemini.demo.apidojosoap.entities.Usuario;

import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private EntityManagerFactory entityManagerFactory;

    public UserServiceImpl(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    @Override
    public EventResponse getEventInfo(EventRequest request) {
        String email = request.getUserEmail();

        EntityManager entityManager = entityManagerFactory.createEntityManager();

        entityManager.getTransaction().begin();
        Query query = entityManager.createQuery("SELECT u FROM Usuario u WHERE u.email=:emailValue", Usuario.class);
        query.setParameter("emailValue", email).getSingleResult();

        Usuario usuario = (Usuario) query.getSingleResult();
        entityManager.getTransaction().commit();

        EventResponse response = new EventResponse();
        response.setUsuario(usuario);
        return response;
    }

    @Override
    public EventResponse setUser(EventRequest request) {
        String email = request.getUserEmail();
        String password = request.getUserPassword();
        String name = request.getUserName();

        Usuario usuario = new Usuario();

        usuario.setEmail(email);
        usuario.setName(name);
        usuario.setPassword(password);

        EntityManager entityManager = entityManagerFactory.createEntityManager();

        entityManager.getTransaction().begin();
        entityManager.persist(usuario);

        entityManager.getTransaction().commit();

        EventResponse response = new EventResponse();
        response.setUsuario(usuario);
        return response;
    }

}
