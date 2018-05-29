import renderToDom from './render-to-dom.js';
import makeMessage from './make-message.js';

const waitTime = new Promise((todoOk, todoMal) => {
    setTimeout(() => {
        todoOk('Han pasado 3 segs, omg');
    }, 3000)
})
module.exports = {
    firstMessage: 'hola mundo desde un moduloooo',
    delayedMessage: async() => {
        const message = await waitTime;
        console.log(message);
        //const element = document.createElement('p');
        //element.textContent = message;
        renderToDom(makeMessage(message));
    }
}