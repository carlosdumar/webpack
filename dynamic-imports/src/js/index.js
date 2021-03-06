import '../css/estilos.css'
import { firstMessage, delayedMessage } from './message.js'
import platziImg from '../images/59446.jpg';
import data from './teachers.json';
import renderToDom from './render-to-dom.js';

import React from 'react';
import { render } from 'react-dom';
import Teachers from './components/teachers.js';

$button = document.getElementById('dynamic-import');

$button.addEventListener('click', async() => {
    const { default: alerta} = await import ('./alerta.js');
    alerta();
});

render(<Teachers data={data} />, document.getElementById('container'))

// console.log(data);

// data.teachers.forEach((teacher) => {
//     const element = document.createElement('li');
//     element.textContent = teacher.Nombre;
//     renderToDom(element);
// })

document.write(firstMessage);
delayedMessage();

const img = document.createElement('img');
img.setAttribute('src', platziImg);
img.setAttribute('width', 100);
img.setAttribute('height', 100);
document.body.append(img);

console.log('Hola mundo!, desde webpack en un webpack.config');