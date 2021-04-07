package com.capgemini.demo.apidojosoap.dto;

import javax.xml.bind.annotation.XmlType;

import com.capgemini.demo.apidojosoap.entities.Usuario;

@XmlType(name = "EventResponse")
public class EventResponse {

    private Usuario usuario;

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
