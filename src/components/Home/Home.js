import React from 'react';
import './Home.css'
import {Link} from 'react-router-dom';
import Catalogo from '../../Catalogo';

export default function Home(){

    const catalogo = Catalogo();
    
    return (
        <main className='home'>
            <div className='bgDiv'>
                <p className='tituloHome'>LA BÚSQUEDA DE TU LIBRERÍA PREFERIDA TERMINA ACÁ, <br/>EN WALDEN LIBROS</p>
                <div className='favoritos'>
                    <p className='favoritos-titulo'>Más vendidos del mes</p>
                        
                    <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                       <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src={catalogo[1].imagen} class="d-block" />
                                <div>
                                    <p className='titulo'>{catalogo[1].titulo}</p>
                                    <p className='autor'>{catalogo[1].autor}</p>
                                    <button className='link'><Link to={`/detail/${catalogo[1].id}`} style={{textDecoration: 'none', color: 'white'}}><span className='text'>Ver libro</span><span className='arrow'>&#8594; </span></Link></button>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src={catalogo[3].imagen} class="d-block" />
                                <div>
                                    <p className='titulo'>{catalogo[3].titulo}</p>
                                    <p className='autor'>{catalogo[3].autor}</p>
                                    <button className='link'><Link to={`/detail/${catalogo[3].id}`} style={{textDecoration: 'none', color: 'white'}}><span className='text'>Ver libro</span><span className='arrow'>&#8594; </span></Link></button>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src={catalogo[5].imagen}class="d-block" />
                                <div>
                                    <p className='titulo'>{catalogo[5].titulo}</p>
                                    <p className='autor'>{catalogo[5].autor}</p>
                                    <button className='link'><Link to={`/detail/${catalogo[5].id}`} style={{textDecoration: 'none', color: 'white'}}><span className='text'>Ver libro</span><span className='arrow'>&#8594; </span></Link></button>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>

                </div> 
            </div>  
        </main>
    )
}