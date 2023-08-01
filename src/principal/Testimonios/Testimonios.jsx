import React from 'react'
import soliLogo from '../../assets/img/soli.png';


export const Testimonios = () => {
    const testimonios = [
        {
            id: 1,
            nombre: 'Jose Villeda',
            testimonio: '¡Solidarisk es increíble! Es muy fácil de usar y me permite apoyar a instituciones benéficas en las que creo. He donado varias veces y siempre me siento bien sabiendo que estoy haciendo una diferencia en la vida de otras personas',
            foto: 'https://i.ibb.co/JK9vLtj/profilepicturev2.jpg',
        },
        {
            id: 2,
            nombre: 'Octavio Corzo',
            testimonio: 'Graciaas! Gracias a todos los usuarios de Solidarisk por dar un apoyo a mi comunidad me permitieron tener un mejor estilo de vida y ayudaron a el desarrollo de mi comunidad',
            foto: 'https://i.ibb.co/KG46Z1z/profilepicturev2-1.jpg',
        },
        {
            id: 3,
            nombre: 'Fernando Archila',
            testimonio: 'Increible, siento que soy parte de Solidarisk ya que gracias a esta aplicacion he logrado mejorar mi estilo de vida y ademas con la comunidad hemos logrado acabar con la delicuencia gracias a la seguridad que ofrece Solidarisk',
            foto: 'https://i.ibb.co/kKVB1bG/profilepicturev2-2.jpg',
        },
        {
            id: 4,
            nombre: 'Comunidad "Kinalitos"',
            testimonio: 'Gracias a Solidarisk y las donaciones de los usuarios logramos comprar muchas cosas nuevas para el mejoramiento de nuestra comunidad y para lograr mejorar la educacion de cada uno de los niños de la comunidad',
            foto: 'https://i.ibb.co/KsfMbrL/83e93d5f-cde4-430f-8073-460b2fab7e13.jpg',
        },
        {
            id: 5,
            nombre: 'Jorgito Canto',
            testimonio: 'En un momento difícil de mi vida, mi comunidad tubo un incendio. Pero gracias a Solidarisk, recibimos un increíble apoyo y aliento. Las donaciones nos ayudaron a cubrir nuestras necesidades básicas y empezar a reconstruir nuestras vidas. Estoy agradecida por la generosidad de cada persona que donó.',
            foto: 'https://i.ibb.co/yNpd1wG/profilepicturev2-3.jpg',
        },
        {
            id: 6,
            nombre: 'Comunidad "El Bosque"',
            testimonio: '¡Pudimos vender la delicuencia! Gracias a la seguridad de Solidarisk pudimos contratar a mucha seguridad para que nuestra comunidad fuera mas segura, Gracias comunidad de Solidarisk',
            foto: 'https://digessp.gob.gt/wp-content/uploads/2021/12/puesto-08Noviembre.jpg',
        },
    ];
    return (
        <div>
            <div className="testimonials-container " style={{ backgroundColor: "#FDEDEC" }}>
                <h2 className='h2Comunidades' style={{marginBottom:"25px"}}>Testimonios de usuarios</h2>

                <div className="testimonials-list">
                    {testimonios.map((testimonio) => (
                        <div key={testimonio.id} className="testimony">
                            <div className="testimony-photo">
                                <img src={testimonio.foto} alt={testimonio.nombre} />
                            </div>
                            <div className="testimony-content">
                                <h3>{testimonio.nombre}</h3>
                                <p>{testimonio.testimonio}</p>
                            </div>
                            <img className="logo" src={soliLogo} alt="Logo" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
