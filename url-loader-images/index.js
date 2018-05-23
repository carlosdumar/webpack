import './estilos.css'
import { firstMessage, delayedMessage } from './message.js'

import platziImg from './59446.jpg';

document.write(firstMessage);
delayedMessage();

const img = document.createElement('img');
img.setAttribute('src', platziImg);
img.setAttribute('width', 100);
img.setAttribute('height', 100);
document.body.append(img);

console.log('Hola mundo!, desde webpack en un webpack.config');