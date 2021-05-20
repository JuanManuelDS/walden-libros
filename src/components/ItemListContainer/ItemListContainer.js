import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import './ItemListContainer.css';
import ItemList from './ItemList/ItemList';
import Catalogo from '../../Catalogo';
import {getFirestore} from '../../firebase';

export default function ItemListContainer () {
    const {category} = useParams();
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        const dataBase = getFirestore();
        const itemCollection = dataBase.collection('items');
        //para aplicarle un filtro a la búsqueda
        /* const highPrice = itemCollection.where('precio', '>', 500);
        //Para aplicar más de dos filtros 
        const ficcionFilter = itemCollection.where('catogira', '===', 'ficcion').where('precio', '>', 1500);

        //También se le puede aplicar un límite a la cantidad de resultados
        const ensayoFilter = itemCollection.where('catogira', '===', 'ensayo').limit(20) */

        itemCollection.get()
            .then(querySnapshot=>{
                querySnapshot.size === 0 && console.log('No hay items');
                querySnapshot.size !== 0 && console.log(`Hay ${querySnapshot.size} items`);

                //querySnapShot.docs nos da acceso a los 'documentos' de la colección
                const documentos = querySnapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
                setItems(documentos)
            })
            .catch(error => console.log(`Hay ocurrido un error: ${error}`))
            .finally(()=>setLoading(false));
    }, [])

    return (
        <div className='ItemListContainer'>
            {!loading > 0 ? 
            <React.Fragment>
                <div id='ItemListContainerFiltros'>
                    <p>Filtros:</p>
                    <ul>
                        <li><Link to={'/categories/ficcion'} style={{color: 'black', textDecoration: 'none'}}>Ficción</Link></li>
                        <li><Link to={'/categories/ensayos'} style={{color: 'black', textDecoration: 'none'}}>Ensayos</Link></li>
                    </ul>
                </div>
                <div id='ItemListContainerProductos'>
                    <ItemList items={items} />
                </div>
            </React.Fragment>  
            :
            <img className='loadingGIF' src='https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621455574/WaldenLibros/GIF/loading_l3xcfl.gif' />}
        </div>
    )

    
}
