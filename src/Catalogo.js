import React from 'react';


export default function Catalogo() {
    const catalogo = [
        {
            id: 0,
            precio: [1699, 1199, 700],
            titulo: 'Walden',
            autor: 'Henry Thoreau',
            categoria: 'ensayos',
            imagen: 'https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453592/WaldenLibros/Libros/Walden-HenryThoreau_mlrjtw.jpg',
            descripcion: 'Walden es un ensayo, publicado en 1854, cuyo autor es Henry David Thoreau y constituye uno de los textos de no ficción más famosos escritos por un estadounidense. En él, el autor narra los dos años, dos meses y dos días que vivió en una cabaña construida por él mismo, cercana al lago Walden.'
        },
        {
            id: 1,
            precio: [2049, 1599, 599],
            titulo: 'Hacia un futuro vegano',
            autor: 'Tobias Leenaert',
            categoria: 'ensayos',
            imagen: 'https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453588/WaldenLibros/Libros/Hacia-un-futuro-vegano_a6jiub.jpg',
            descripcion: 'En este libro que invita a la reflexión, Tobias Leenaert se aleja de los caminos más convencionales de la defensa de los animales y aborda las estrategias, los objetivos y las herramientas comunicativas del movimiento vegano y animalista desde un nuevo prisma.'
        },
        {
            id: 2,
            precio: [1800, 1150, 699],
            titulo: 'Un mundo feliz',
            autor: 'Aldous Huxley',
            categoria: 'ficcion',
            imagen: 'https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453589/WaldenLibros/Libros/Un-mundo-feliz_rjh3vf.jpg',
            descripcion: 'Un mundo feliz es la novela más famosa del escritor británico Aldous Huxley, publicada por primera vez en 1932. La novela es una distopía que anticipa el desarrollo en tecnología reproductiva, cultivos humanos e hipnopedia, manejo de las emociones por medio de drogas que, combinadas, cambian radicalmente la sociedad.'
        },
        {
            id: 3,
            precio: [2000, 1200, 500],
            titulo: 'Hippie',
            autor: 'Paulo Coelho',
            categoria: 'ficcion',
            imagen:'https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453588/WaldenLibros/Libros/Hippie_jovzn5.jpg',
            descripcion: 'En su libro más autobiográfico, Paulo Coelho narra el encuentro entre dos jóvenes: Paulo, que sueña con ser escritor y llega a Amsterdam en busca de libertad y de un sentido para su vida, y Karla, una veinteañera de Rotterdam decidida a cambiar su forma de ver el mundo. Juntos recorrerán “la ruta Hippie” que realizaba el legendario Magic Bus, un viaje por Europa y Asia rumbo a Katmandú. Durante esta experiencia única y transformadora vivirán una gran historia de amor. Con ellos irán pasajeros de diferentes nacionalidades que a lo largo del recorrido se plantearán sus prioridades y valores vitales.'
        },
        {
            id: 4,
            precio: [2400, 1200, 600],
            titulo: 'El lobo estepario',
            autor: 'Herman Hesse',
            categoria: 'ficcion',
            imagen: 'https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453591/WaldenLibros/Libros/El-lobo-estepario_uqzfix.jpg',
            descripcion: 'Harry Haller es un hombre culto e incomprendido que está convencido de que en su interior viven un hombre y un lobo que se encuentran en conflicto. Haller ha perdido el interés en la vida, es pesimista y nada de lo que le rodea logra hacerle feliz, desprecia el mundo en el que vive y a las personas que lo habitan. Su vida no tiene sentido, hasta que se topa con un letrero luminoso que le invita a ir hacia un lugar llamado Teatro Mágico'
        },
        {
            id: 5,
            precio: [2100, 1300, 500],
            titulo: 'Nuestro hombre en la Havana',
            autor: 'Graham Greene',
            categoria: 'ficcion',
            imagen: 'https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453588/WaldenLibros/Libros/Nuestro-hombre-en-la-havana_zpvoyh.jpg',
            descripcion: 'Viudo y con una hija, Jim Wormold, vive cómodamente en Cuba, en los tiempos del dictador Batista. Es vendedor de aspiradoras, lleva una vida serena y al día, en términos económicos. Pero los deberes y obligaciones lo ponen frente a un dilema. Porque debe costearle los estudios a su hija, y debe además satisfacer ciertos caprichos de la juventud. Y hay una coyuntura política favorable: la situación de la isla es un pequeño enigma para los servicios secretos británicos y a Wormold le ofrecen convertirse en espía. Acepta, aun sin saber nada sobre el oficio. Para cumplir su rol, inventa informes que envía a sus superiores. El problema, naturalmente, es que ellos los leen como si fueran reales, y no las piezas de ficción de alguien obligado a escribirlas para no perder el ingreso extra que le ofrece su nuevo trabajo.'
        },
        {
            id: 6,
            precio: [2000, 1200, 400],
            titulo: 'El mito de Sísifo',
            autor: 'Albert Camus',
            categoria: 'ensayos',
            imagen: 'https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453589/WaldenLibros/Libros/El-mito-de-sisifo_nvmtuo.jpg',
            descripcion: 'El título del ensayo proviene de un atribulado personaje de la mitología griega. En él, Camus discute la cuestión del suicidio y el valor de la vida, presentando el mito de Sísifo como metáfora del esfuerzo inútil e incesante del hombre. De esta forma plantea la filosofía del absurdo, que mantiene que nuestras vidas son insignificantes y no tienen más valor que el de lo que creamos. Siendo el mundo tan fútil, Camus pregunta, ¿hay alternativa al suicidio? El ensayo se inicia: No hay sino un problema filosófico realmente serio: el suicidio.'
        },
        {
            id: 7,
            precio: [3100, 1800, 800],
            titulo: 'Trilogía de la fundación',
            autor: 'Isaac Asimov',
            categoria: 'ficcion',
            imagen:'https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621453588/WaldenLibros/Libros/Fundacion_i1i2pi.jpg',
            descripcion: 'El hombre se ha dispersado por toda la galaxia. La capital del imperio es Trántor, nido de nitrigas y corrupción. Gracias a su ciencia, fundada en el estudio matemático de los hechos históricos y el comportamieto de las masas, el psicohistoriador Hari Seldon prevé la caída del Imperio y el retorno a la barbarie durante varios milenios. A fin de reducir este período a mil años, Seldon decide crear una Fundación en un extremo de la galaxia.'
        }
    ];

    return catalogo;
}