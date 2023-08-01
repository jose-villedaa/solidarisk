import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import emailConfig from './Email/emailConfig';
import { animateScroll as scroll } from 'react-scroll';

export const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendEmail(formData);
        setFormData({
            nombre: '',
            apellido: '',
            correo: '',
            telefono: '',
            mensaje: ''
        });
    };



    const sendEmail = (formData) => {
        const templateParams = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            correo: formData.correo,
            telefono: formData.telefono,
            mensaje: formData.mensaje,
            to_email: 'dquinonez-2021045@kinal.edu.gt', // Dirección de correo electrónico de destino
        };

        emailjs
            .send(
                emailConfig.serviceID,
                emailConfig.templateID,
                templateParams,
                emailConfig.userID
            )
            .then((response) => {
                console.log('Email sent!', response);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    return (
        <div>
            <div style={{ backgroundColor: '#ecccc9', padding: '25px', margin: '25px 0px 25px 0px' }}>
                <h2 className="text-center contactSeccionSolidarisk">¿Quieres más información?
                </h2>
            </div>

            <div className="container">
                <section className="mb-4">
                    <p className="text-center w-responsive mx-auto mb-5 " style={{ color: "black" }}>
                        Si tienes alguna pregunta o quieres que te ampliemos la información sobre alguno de nuestros servicios contactanos.
                    </p>
                    <div className="row">
                        <div className="col-md-9 mb-md-0 mb-5">
                            <form id="contact-form" name="contact-form" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="md-form mb-4">
                                            <input
                                                type="text"
                                                id="nombre"
                                                className="form-control"
                                                placeholder="Nombre"
                                                value={formData.nombre}
                                                name="nombre"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="md-form mb-4">
                                            <input
                                                required
                                                type="text"
                                                id="apellido"
                                                className="form-control"
                                                placeholder="Apellido"
                                                value={formData.apellido}
                                                name="apellido"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="md-form mb-4">
                                            <input
                                                required
                                                type="email"
                                                id="correo"
                                                className="form-control"
                                                placeholder="Correo electrónico"
                                                value={formData.correo}
                                                name="correo"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="md-form mb-4">
                                            <input
                                                required
                                                type="text"
                                                id="telefono"
                                                className="form-control"
                                                placeholder="Número Telefónico"
                                                value={formData.telefono}
                                                name="telefono"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="md-form">
                                            <textarea
                                                required
                                                id="mensaje"
                                                name="mensaje"
                                                rows="2"
                                                className="form-control md-textarea"
                                                placeholder="Motivo de tu mensaje"
                                                value={formData.mensaje}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <br /><br />
                                <div className="text-center text-md-left">
                                    <button type="submit" className="btnOpciones btn-primary"> <i className="fa fa-send mx-2"></i>Enviar</button>
                                </div>
                                <div className="status"></div>
                            </form>
                        </div>
                        <div className="col-md-3 text-center">
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <i className="fas fa-phone mt-4 fa-2x" style={{ color: "#e74c3c" }}></i>
                                    <p style={{ marginTop: '10px' }}>+502 3381-4801
                                    </p>
                                </li>
                                <li>
                                    <i className="fas fa-envelope mt-4 fa-2x" style={{ color: "#e74c3c" }}></i>
                                    <p style={{ marginTop: '10px' }}>solidarisk2023@gmail.com</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
