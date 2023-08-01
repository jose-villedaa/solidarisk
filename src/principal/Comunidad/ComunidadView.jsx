import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Form } from "react-bootstrap";
import soliLogo from '../../assets/img/soli.png';
import { getComunidad } from './api/apiComunidad';

export const ComunidadView = () => {
    const [listaComunidad, setListaComunidad] = useState([]);

    const viewComunidad = async () => {
        const comunidadList = await getComunidad();
        setListaComunidad(comunidadList);
    };

    useEffect(() => {
        viewComunidad();
    }, []);

    
   

    
    return (
        <div>
            <div style={{
            textAlign: "center",
            opacity: "100%",
            marginBottom: "10px",
            paddingTop: "05px",
            backgroundColor: "#d14639",
            color: "#FFFFFF",
            paddingBottom: "1px",
            width: "100%",
            marginLeft:"0px"
          }}>
            <h2 className='h2Comunidades' >Comunidades</h2>
            </div>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-md-4' style={{ marginBottom: '20px' }}>
                        <figure>
                            <img src='https://donaronline.org/assets/illustrations/team-7982bd9fbcb25390ca6c5cc5ba00a714b002e798258d4a8995c74e54457f467b.svg' alt='Donaciones' className='imagenDonaciones img-fluid' />
                        </figure>
                    </div>
                    <div className='col-md-8'>
                        <div className='divComunidad'>
                            <h4 className='h2Comunidades'>¿Quieres ayudar a una comunidad?</h4>
                            <p className='pComunidad'>
                                Registrate o pide información sobre cómo puedes ser parte de una comunidad para que puedas ayudar a todas las personas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className='h2Comunidades'>Listado de comunidades</h3>
            <div className='card-container d-flex justify-content-center' style={{ display: 'flex', flexWrap: 'wrap' }}>
                {listaComunidad.map((c) => (
                    <section className="donations-section">

                        <div className='card-wrapper col-md-4' key={c._id} style={{ marginBottom: '20px' }}>
                            <div className="donations-grid">
                                <div className="donation-item" >
                                    <img src={c.img} alt='Comunidad sin imagen' />
                                    <h3>{c.nombre}
                                    </h3>
                                    <p> {c.correo}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
           
        </div>
    );
};
