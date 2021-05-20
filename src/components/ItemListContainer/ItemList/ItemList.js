import React from 'react';
import './ItemList.css';
import Item from './Item/Item';


export default function ItemList ({items}) {

    return (
        <div id='ItemListLibros'>
            {items.map((libro, index) => <Item key={index} libro={libro} />)}
        </div>
    );
}