import React, {useState, useEffect} from 'react';
import ItemDetail from './ItemDetail/ItemDetail'
import {useParams} from 'react-router-dom'
import './ItemDetailContainer.css'
import { getFirestore } from '../../firebase';

export default function ItemDetailContainer(){
    const [libro, setLibro] = useState({});
    const [loading, setLoading] = useState(true)
    const {id} = useParams();

    useEffect(()=>{
        const db = getFirestore();
        const itemcollection = db.collection('items').doc(`${id}`);
        itemcollection.get().then(qs => {
            setLibro({id: qs.id, ...qs.data()})
        })
        .finally(()=>setLoading(false)); 
    }, []);

    

    return (
        <div className='ItemDetailContainer'>
            {!loading ? <ItemDetail libro={libro}/> : <img className='loadingGIF' src='https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621455574/WaldenLibros/GIF/loading_l3xcfl.gif' />}
        </div>
    )

}