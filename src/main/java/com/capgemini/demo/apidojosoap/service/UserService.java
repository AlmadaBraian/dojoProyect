package com.capgemini.demo.apidojosoap.service;

import javax.jws.WebService;
import javax.xml.bind.annotation.XmlElement;

import com.capgemini.demo.apidojosoap.dto.EventRequest;
import com.capgemini.demo.apidojosoap.dto.EventResponse;

@WebService(name = "UserService")
public interface UserService {

    public EventResponse getEventInfo(@XmlElement(required = true) EventRequest request);

    public EventResponse setUser(@XmlElement(required = true) EventRequest request);
}
