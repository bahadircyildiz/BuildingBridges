Array.prototype.modeNode = function(amount)	{
	if(amount == 1) this.push(0);
	else this.splice(this.length-1 , 1);
}

var app = angular.module('buildingBridges', []);

app.controller('global', Controller);