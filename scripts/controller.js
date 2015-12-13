function Controller($scope){
	$scope.bank = [0];
	
	$scope.debugMode = false;
	
	$scope.unitTest = function(){
		$scope.bank = [0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15];
		$scope.start();
	}

	$scope.start = function(){
		var bank = angular.copy($scope.bank);
		var hasDupe = checkDupe(bank);
		if(hasDupe){
			alert("Southern Bank has duplicated nodes.")
		}
		else{
			var t1, t2, result, logs = [];
			bank = angular.copy($scope.bank);
			t1 = performance.now();
			result = bruteForce(bank);
			t2 = performance.now();
			logs.push({type: "Brute Force", result: result, time: Math.ceil(t2-t1) });
			$scope.logs = logs;
			//t1 = performance.now();
			//result = divideAndConquer(bank);
			//t2 = performance.now();
			//logs.push({type: "Divide & Conquer", result: result, time: t1-t2 });
			//t1 = performance.now();
			//result = dynamic(bank);
			//t2 = performance.now();
			//logs.push({type: "Dynamic Programming", result: result, time: t1-t2 });
		}
	}
}
function checkDupe(arr) {
	var sortedBank = arr.sort(function(a,b){
		return a-b;
	});
	var hasDupe = false;
	console.log(sortedBank);
	sortedBank.forEach(function(element,index){
		if(element != index) hasDupe = true;
	})
	return hasDupe;
	
}

function bruteForce(bank) {
	var allSubsets = subsets(bank, 1);
	console.log(allSubsets);
	allSubsets.forEach(function(s1,index){
		var prevNode = 0;
		s1.forEach(function(s2){
			if(s2 >= prevNode)
				prevNode = s2;
			else{
				allSubsets.splice(index, 1);
			}
		})
	})
	return findLongest(allSubsets);
}

function subsets(a, min) {
    var fn = function(n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    for (var i = min; i < a.length; i++) {
        fn(i, a, [], all);
    }
    all.push(a);
    return all;
}


function findLongest(a){
	var maxwidth = 0, result;
	a.forEach(function(element){
		if(element.length >= maxwidth){
			maxwidth = element.length;
			result = element;
		}
	})
	return result;
}
