
var math = require('./modules/sum.js');

//var $ = require('./libs/jquery.js');

$(document).ready(function() {

  console.log(math.sum(3, 4));

  //$('body').append("<h3>" + math.sum(3,4) + "</h3>");
  //$('body').append("<h3>" + math.sub(3,4) + "</h3>");
});
