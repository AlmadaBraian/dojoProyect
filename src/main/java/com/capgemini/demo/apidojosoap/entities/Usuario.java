package com.capgemini.demo.apidojosoap.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@XmlAccessorType(XmlAccessType.NONE)
public class Usuario implements Serializable {
    /**
     *
     */
    private static final long serialVersionUID = -7079880238239168201L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @XmlElement
    private String name;
    @XmlElement
    private String email;
    @XmlElement
    private String password;

    public Usuario(String name2, String email2, String password2) {
    }

}
