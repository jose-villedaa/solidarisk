import React from 'react';
import soliLogo from '../../assets/img/dona.svg';
import { Button, Container, Row, Col } from 'react-bootstrap';

export const CardInfo = () => {
    return (
        <>
            <Container fluid="md">
                <br />

                <h2 className='h2Comunidades'>Comunidades</h2>

                <div className='container userComunidad' style={{ marginTop: '100px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Col md={6} className='order-md-1'>
                        <figure style={{ marginRight: '20px' }}>
                            <img src={soliLogo} alt='Donaciones' className='imagenDonacionesComunidadCLientes' style={{ maxWidth: '100%' }} />
                        </figure>
                    </Col>
                    <Col md={6} className='order-md-2' style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
                        <div className='divComunidad'>
                            <h4 className='h4Comunidad'>¿QUIERES DONAR?</h4>
                            <p className='pComunidad'>
                                Presiona el botón donar que tienes a tu derecha y dona todos los recursos que tengas a tu disposición.
                            </p>
                        </div>
                    </Col>
                </div>
            </Container>

            <h2 className='h2Comunidades' style={{ marginTop: "55px", backgroundImage: "url(https://static.vecteezy.com/system/resources/previews/008/552/477/original/abstract-banner-background-with-lines-pattern-illustration-free-vector.jpg)", padding: "55px", backgroundSize: "cover", opacity: 0.7 }}>Seguridad</h2>
            <Container fluid="md">
                <div className='container userComunidad' style={{ marginTop: '', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Col md={6} className='order-md-2'>
                        <figure style={{ marginRight: '20px' }}>
                            <img src='https://media.istockphoto.com/id/1239968395/es/vector/conjunto-de-hombre-de-seguridad-en-diferentes-poses-y-emociones-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=VIrXYMPcYsE1YIVpbbK6QS5yDmaKoGblQbCcI_fUevE=' alt='Donaciones' className='imagenDonacionesComunidadCLientes' style={{ maxWidth: '100%' }} />
                        </figure>
                    </Col>
                    <Col md={6} className='order-md-1' style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
                        <div className='divComunidad'>
                            <h4 className='h4Comunidad'>🛡️ Seguridad en Solidarisk</h4>
                            <p className='pComunidad'>
                                Con la seguridad de Solidarisk podrás tener atención en el momento para cualquier emergencia.
                                Puedes denunciar cualquier delito que veas o puedes pedir seguridad personal o para una localidad en específico.
                            </p>
                        </div>
                    </Col>
                </div>
            </Container>
        </>
    );
}
    