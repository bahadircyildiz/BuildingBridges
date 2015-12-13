Array.prototype.modeNode = function(amount)	{
	if(amount == 1) this.push(1);
	else this.splice(this.length-1 , 1);
}
Array.prototype.findIncrementing = function(){
	this.forEach(function(s1, index){
		var prevNode = 0;
		s1.forEach(function(s2){
			if(s2 >= prevNode)
				prevNode = s2;
			else{
				this.splice(index, 1);
			}
		})
	})
}

var app = angular.module('buildingBridges', []);

app.controller('global', Controller);