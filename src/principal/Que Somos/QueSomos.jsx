import React from 'react';
import { Container } from 'react-bootstrap';

export const QueSomos = () => {
    
    return (
        <>
            <div className="header-section">
                <Container>
                    <div className="text-container">
                        <h1 className='h1QueSomos'>¿Quienes Somos?</h1>
                        <p className='pQueSomosSoli'>
                            Solidarisk es una organización sin fines de lucro dedicada a ayudar a comunidades y
                            instituciones que necesitan apoyo.
                            <br />
                            Con tu donación, podemos marcar la diferencia
                            y mejorar la vida de muchas personas.
                        </p>
                        <a class="instagram-button" href="https://www.instagram.com/solidarisk_gt/" target="_blank">
                            <i class="fab fa-instagram"></i> Síguenos en Instagram

                        </a>
                        <a class="facebook-button" href="https://www.facebook.com/tu_pagina_de_facebook" target="_blank">
                            <i class="fab fa-facebook-f"></i> Síguenos en Facebook
                        </a>
                    </div>
                </Container>
                <div className="curved-image"></div>

                

             
            </div>
        </>
    );
};

