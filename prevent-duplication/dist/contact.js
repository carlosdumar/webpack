webpackJsonp([1],{

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);

var _message = __webpack_require__(9);

var _ = __webpack_require__(10);

var _2 = _interopRequireDefault(_);

var _teachers = __webpack_require__(11);

var _teachers2 = _interopRequireDefault(_teachers);

var _renderToDom = __webpack_require__(6);

var _renderToDom2 = _interopRequireDefault(_renderToDom);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(13);

var _teachers3 = __webpack_require__(18);

var _teachers4 = _interopRequireDefault(_teachers3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_teachers4.default, { data: _teachers2.default }), document.getElementById('container'));

// console.log(data);

// data.teachers.forEach((teacher) => {
//     const element = document.createElement('li');
//     element.textContent = teacher.Nombre;
//     renderToDom(element);
// })

document.write(_message.firstMessage);
(0, _message.delayedMessage)();

var img = document.createElement('img');
img.setAttribute('src', _2.default);
img.setAttribute('width', 100);
img.setAttribute('height', 100);
document.body.append(img);

console.log('Hola mundo!, desde webpack en un webpack.config');

/***/ })

},[35]);