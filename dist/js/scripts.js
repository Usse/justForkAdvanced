(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var math = {
  adder: 10000,

  sum: function(a, b) {
    return a + b + math.adder;
  },

  sub: function(a, b) {
    return a - b + math.adder;
  }
};

exports.sum = math.sum;
exports.sub = math.sub;

},{}],2:[function(require,module,exports){

var math = require('./modules/sum.js');

//var $ = require('./libs/jquery.js');

$(document).ready(function() {

  console.log(math.sum(3, 4));

  //$('body').append("<h3>" + math.sum(3,4) + "</h3>");
  //$('body').append("<h3>" + math.sub(3,4) + "</h3>");
});

},{"./modules/sum.js":1}]},{},[2]);
