import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Overlay } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getRecursosInstituciones } from '../api/apiInstitucion';


export const Institucion = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount, setNotificationCount] = useState(2);
    const [notifications, setNotifications] = useState([]);
    const [recurso, setRecurso] = useState([]);
    const [peticiones, setPeticiones] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRecursosInstituciones();
                setPeticiones(data.peticiones);
                setRecurso(data.recurso);
                console.log('holamundo', data.recurso);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const target = useRef(null);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const dismissNotification = (notificationId) => {
        setNotificationCount((prevCount) => prevCount - 1);
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== notificationId)
        );
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <img src="" alt="Logo" className="logo" />
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto"> {/* Utiliza la clase 'mr-auto' para mover las opciones a la derecha */}
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Inicio
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Acerca de
                        </a>
                    </li>
                </ul>
                <div ref={target} className="dropdown ml-auto"> {/* Agrega la clase 'ml-auto' para mover las notificaciones a la derecha */}
                    <button
                        className={`btn btn-link dropdown-toggle ${showNotifications ? 'active' : ''}`}
                        onClick={toggleNotifications}
                        aria-expanded={showNotifications}
                    >
                        <FontAwesomeIcon icon={faBell} size="lg" />
                        {notificationCount > 0 && (
                            <span className="badge bg-danger notification-badge">{notificationCount}</span>
                        )}
                    </button>
                    <Overlay target={target.current} show={showNotifications} placement="bottom-end">
                        {({ placement, arrowProps, show: _show, popper, ...props }) => (
                            <div
                                {...props}
                                className={`notifications-dropdown ${showNotifications ? 'show' : ''}`}
                            >
                                {peticiones.map((r) => (
                                    <div key={r._id} className="dropdown-item">
                                        <div className="user-image"></div>
                                        <div className="notification-details">
                                            <strong style={{ textAlign: 'center' }}>{r.comunidad.nombre}</strong>
                                            {recurso ? (
                                                <p>Desea contratar el servicio de: {recurso.tipo}</p>
                                            ) : (
                                                <p>No hay recurso disponible</p>
                                            )}
                                            <p>Solicitado el {r.fecha.substring(0, 10)} a las {r.hora}</p>
                                            {/* <button
                        className="dismiss-button"
                        onClick={() => dismissNotification(r._id)}
                      >
                        Dismiss
                      </button> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Overlay>
                </div>
            </div>
        </nav>
    );
};
