import React,{useState, useEffect} from 'react';
import './Home.css'
import {Link} from 'react-router-dom';
import {getFirestore} from '../../firebase'

export default function Home(){
    
    const [loading, setLoading] = useState(false);
    const [top3, setTop3] = useState([])

    useEffect(()=>{
        setLoading(true)
        const dataBase = getFirestore();
        const top3Collection = dataBase.collection('items').where('top3', '==', true);

        top3Collection.get()
        .then(qs => {
            const top3 = qs.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            setTop3(top3)
        })
        .catch(err => console.log(err))
        .finally(()=>setLoading(false))
    }, [])
    
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
                           {!loading ? 
                           <>{top3.map((libro, ind) => <div class={`carousel-item ${ind===0 && 'active'}`}>
                                <img src={libro.imagen} class="d-block" />
                                <div>
                                    <p className='titulo'>{libro.titulo}</p>
                                    <p className='autor'>{libro.autor}</p>
                                    <button className='link'><Link to={`/detail/${libro.id}`} style={{textDecoration: 'none', color: 'white'}}><span className='text'>Ver libro</span><span className='arrow'>&#8594; </span></Link></button>
                                </div>
                            </div>)}
                            </>
                            :
                            <></>
                            }
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