import React from 'react';
import soliLogo from '../../assets/img/dona.svg';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Cards = () => {
    return (
        <>
        <br />
            <h2 className='h2Comunidades'>¿Quieres Donar?</h2>

            <div className='container' style={{ marginTop: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <figure style={{ marginBottom: "20px" }}>
                    <img src={soliLogo} alt="Donaciones" className='imagenDonaciones'  />
                </figure>
                <div className='divDonaciones'>
                    <h4 className='h4Donaciones'>Dona los recursos que ya no utilices de una manera fácil y rápida 
                    y ayuda a las instituciones asociadas.</h4>
                    <p className='pDonaciones'>¿Nos quieres ayudar?</p>
                    <Link to="/registro" className="registroBoton mb-2">Registrate Aqui</Link>

                </div>
            </div>
        </>
    );
}
