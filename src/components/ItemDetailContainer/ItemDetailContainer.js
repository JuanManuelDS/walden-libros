import React, {useState, useEffect} from 'react';
import Catalogo from '../../Catalogo'
import ItemDetail from './ItemDetail/ItemDetail'
import {useParams} from 'react-router-dom'
import './ItemDetailContainer.css'
import { getFirestore } from '../../firebase';

export default function ItemDetailContainer(){
    const [libro, setLibro] = useState({});
    const [loading, setLoading] = useState(false)
    const {id} = useParams();

    useEffect(()=>{
        setLoading(true);
        const db = getFirestore();
        const itemcollection = db.collection('items');
        itemcollection.get().then(qs => {
            qs.docs.forEach(doc=>{
                if(doc.id === id){
                    setLibro(doc.data());
                }
            });
            setLoading(false)
        });
        
        /* const task = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(Catalogo())
            }, 500)
        }) */

        /* task. then(resolved => setLibro(resolved[id])) */
    }, []);

    return (
        <div className='ItemDetailContainer'>
            {!loading ? <ItemDetail libro={libro}/> : <img className='loadingGIF' src='https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621455574/WaldenLibros/GIF/loading_l3xcfl.gif' />}
        </div>
    )

}