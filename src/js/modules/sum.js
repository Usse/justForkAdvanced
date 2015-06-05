
var math = {
	adder : 10000,

	sum: function(a,b) {
		return a+b+math.adder;
	},
	sub : function(a,b) {
		return a-b+math.adder;
	}
};

exports.sum = math.sum;
exports.sub = math.sub;