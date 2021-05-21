import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import './ItemListContainer.css';
import ItemList from './ItemList/ItemList';
import {getFirestore} from '../../firebase';

export default function ItemListContainer () {
    const {category} = useParams();
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        const dataBase = getFirestore();
        const itemCollection = dataBase.collection('items');
        const itemByCategory = itemCollection.where('categoria', '==', `${category}`)
        //para aplicarle un filtro a la búsqueda
        /* const highPrice = itemCollection.where('precio', '>', 500);
        //Para aplicar más de dos filtros 
        const ficcionFilter = itemCollection.where('catogira', '===', 'ficcion').where('precio', '>', 1500);

        //También se le puede aplicar un límite a la cantidad de resultados
        const ensayoFilter = itemCollection.where('catogira', '===', 'ensayo').limit(20) */

        if(!category){
            itemCollection.get()
            .then(querySnapshot=>{
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
        } else {
            itemByCategory.get()
            .then(qs=>{
                const documentos = qs.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
                setItems(documentos)
            })
            .catch(error => console.log(`Hay ocurrido un error: ${error}`))
            .finally(()=>setLoading(false));
        }
        
    }, [category])

    return (
        <div className='ItemListContainer'>
            {!loading > 0 ? 
            <>
                <div id='ItemListContainerFiltros'>
                    <p>Filtros:</p>
                    <ul>
                        <li><Link to={'/categories'} style={{color: 'black', textDecoration: 'none'}}>Todos</Link></li>
                        <li><Link to={'/categories/ficcion'} style={{color: 'black', textDecoration: 'none'}}>Ficción</Link></li>
                        <li><Link to={'/categories/ensayo'} style={{color: 'black', textDecoration: 'none'}}>Ensayos</Link></li>
                    </ul>
                </div>
                <div id='ItemListContainerProductos'>
                    <ItemList items={items} />
                </div>
            </>  
            :
            <img className='loadingGIF' src='https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621455574/WaldenLibros/GIF/loading_l3xcfl.gif' />}
        </div>
    )

    
}
