import React from 'react';
import soliLogo from '../../assets/img/solidarisk-largo.png';

export const Footer = () => {
    return (
        <div className="footer" style={{backgroundColor: "#FADBD8"}}>
            <footer>
                <div className="social">
                    <h3 className="principal">Solidarisk</h3>

                    <p>Derechos Reservados Solidarisk</p>
                    <div className="redes">

                        <a href="https://www.instagram.com/solidarisk_gt/" target="_blank"><i class="fab fa-facebook " style={{ width: "35px" }}>

                        </i></a>
                        <a href=""><i class="fab fa-instagram " style={{ width: "35px" }}>

                        </i></a>

                    </div>
                </div>
                <div className="informacion">
                    <h3 className="principal">Nosotros</h3>
                    <a href="#">Comunidades</a>
                    <a href="#">Instituciones</a>
                </div>
                <div className="informacion">
                    <h3 className="principal">Informacion General</h3>
                    <p href="#">Ubicacion: Colonia Landivar</p>
                    <p href="#">Numero: <strong>3381-4801</strong></p>
                    
                </div>
                <div className="informacion">
                    <img src={soliLogo} alt="" style={{ width: "100%", maxWidth: "350px", marginTop: "55px" }} />
                </div>
            </footer>
        </div>
    );
};
