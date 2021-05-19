import React from 'react';
import './ItemList.css';
import Item from './Item/Item';


export default function ItemList ({props}) {

    return (
        <div id='ItemListLibros'>
            {props.map((libro, index) => <Item key={index} libro={libro} />)}
        </div>
    );
}