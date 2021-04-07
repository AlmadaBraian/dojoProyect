package com.capgemini.demo.apidojosoap.config;

import javax.persistence.EntityManagerFactory;
import javax.xml.ws.Endpoint;

import com.capgemini.demo.apidojosoap.service.UserServiceImpl;

import org.apache.cxf.Bus;
import org.apache.cxf.jaxws.EndpointImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EventConfig {

    @Autowired
    private Bus bus;

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Bean
    public Endpoint endpoint() {
        Endpoint endpoint = new EndpointImpl(bus, new UserServiceImpl(entityManagerFactory));
        endpoint.publish("/eventservice");
        return endpoint;
    }
}
