import React from 'react';
import './Footer.css';

export default function Footer(){
    
    return(
        <div className='footer'>
            <div className='row'>
                <div className='col'>
                    <p className='direccion'><img src='https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453635/WaldenLibros/Logos/Logo_qd4gu1.png'/><br/>Av. Siempre Viva 742<br/>Springfield, EEUU</p>          
                </div>
                <div className='col redes'>
                    <p>Seguinos en redes</p>
                    <div><img src='https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453634/WaldenLibros/Logos/facebook_fmplv7.png' /><img src='https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453634/WaldenLibros/Logos/twitter_ly5e2k.png' /><img src='https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453634/WaldenLibros/Logos/instagram_lcghhm.png' /></div>
                </div>
                <div className='col contacto' >
                    <p>
                        <img src= 'https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453634/WaldenLibros/Logos/email_yxxa2x.png' alt="email logo" />walden@ejemplo.com
                    </p>
                    <p>
                        <img src='https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453635/WaldenLibros/Logos/leaf_dtzaxo.png' alt="teléfono" />+54 9 11555-4444
                    </p>
                    <p>
                        <img src='https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453635/WaldenLibros/Logos/leaf_dtzaxo.png' alt="hojas" />Contactanos
                    </p>
                </div>
                <div className='col-12 copyright'>&copy; 2021 Walden Libros </div>
            </div>
        </div>
    )
}