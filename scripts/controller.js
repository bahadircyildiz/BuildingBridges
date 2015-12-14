function Controller($scope){
	$scope.bank = [0];
	
	$scope.processing = false;
	
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
			$scope.processing = true;
			var t1, t2, result, logs = [];
			bank = angular.copy($scope.bank);
/* 			t1 = performance.now();
			result = bruteForce(bank);
			t2 = performance.now();
			logs.push({type: "Brute Force", result: result, time: Math.ceil(t2-t1) }); */
/* 			t1 = performance.now();
			result = divideAndConquer(0, bank.length-1, bank);
			t2 = performance.now();
			logs.push({type: "Divide & Conquer", result: result, time: Math.ceil(t2-t1) }); */
			t1 = performance.now();
			result = dynamic(bank);
			t2 = performance.now();
			logs.push({type: "Dynamic Programming", result: result, time: Math.ceil(t2-t1) });
			$scope.logs = logs; 
			$scope.processing = false;
		}
	}
}
function checkDupe(arr) {
	var sortedBank = arr.sort(function(a,b){
		return a-b;
	});
	var hasDupe = false;
	sortedBank.forEach(function(element,index){
		if(element != index) hasDupe = true;
	})
	return hasDupe;
	
}

function bruteForce(bank) {
	var allSubsets = subsets(bank, 1);
	var targets = [];
	for(var x = 0; x<allSubsets.length; x++){
		var prevNode = 0;
		var indexPlaced = false;
		allSubsets[x].forEach(function(s2){
			if(s2 >= prevNode)
				prevNode = s2;
			else{
				if(!indexPlaced) {
					targets.push(x);
					indexPlaced = true;
				}
			}
		})
		
	}
	var counter = 0;
	targets.forEach(function(element){
		allSubsets.splice(element - counter, 1);
		counter++;
	})
	return findLongest(allSubsets);
}

function subsets(a, min) {
	var res = [];
	for (var i = 0; i < Math.pow(2, a.length); i++) {
		var bin = (i).toString(2), set = [];
		bin = new Array((a.length-bin.length)+1).join("0")+bin;
		for (var j = 0; j < bin.length; j++) {
			if (bin[j] === "1") {
				set.push(a[j]);
			}
		}
		res.push(set);
	}
	return res;
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

function divideAndConquer(start, end, arr){
	if (start >= end){
		return [arr[start]];
	}
	else{
		var q = Math.floor((start+end)/2)
		var subsets1 = divideAndConquer(start, q, arr);
		var subsets2 = divideAndConquer(q+1, end, arr);
		var result = bruteForce(subsets1).concat(bruteForce(subsets2));
		return result;
	}
}

function dynamic(arr){
	var index = 0,
      indexWalker,
    	longestIncreasingSequence,
    	i,
    	il,
    	j;
    indexWalker = [index];
	for (i = 1, il = arr.length; i < il; i++) {		
        if (arr[i] < arr[indexWalker[index]]) {
        	for (j = 0; j <= index; j++) {
                if (arr[i] < arr[indexWalker[j]] && (!j || arr[i] > arr[indexWalker[j-1]])) {
                    indexWalker[j] = i;
                    break;
                }
            }
        } else if (arr[i] > arr[indexWalker[index]] || (arr[i] === arr[indexWalker[index]] && !strict))  {
            indexWalker[++index] = i;
        }
		
    }

	longestIncreasingSequence = new Array(index + 1);
	longestIncreasingSequence[index] = arr[indexWalker[index]];
	for (i = index - 1; i >= 0; i--) {
		if (indexWalker[i] < indexWalker[i + 1]) {
            longestIncreasingSequence[i] = arr[indexWalker[i]];
        } else {
            for ( j = indexWalker[i + 1] - 1; j >= 0; j--) {
                if ((arr[j] > arr[indexWalker[i]] && arr[j] < arr[indexWalker[i + 1]]) || 
                	(arr[j] >= arr[indexWalker[i]] && arr[j] <= arr[indexWalker[i + 1]]) ){
                    longestIncreasingSequence[i] = arr[j];
                    indexWalker[i] = j;
                    break;
                }
            }
        }
    }

    return longestIncreasingSequence;
}