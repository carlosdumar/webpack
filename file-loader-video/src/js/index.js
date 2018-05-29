import '../css/estilos.css'
import { firstMessage, delayedMessage } from './message.js'

import platziImg from '../images/59446.jpg';
import videoPlatzi from '../video/que-es-core.mp4';

document.write(firstMessage);
delayedMessage();

const img = document.createElement('img');
img.setAttribute('src', platziImg);
img.setAttribute('width', 100);
img.setAttribute('height', 100);
document.body.append(img);

const video = document.createElement('video');
video.setAttribute('src', videoPlatzi);
video.setAttribute('width', 480);
video.setAttribute('autoplay', true);
video.setAttribute('controls', true);
document.body.append(video);

console.log('Hola mundo!, desde webpack en un webpack.config');