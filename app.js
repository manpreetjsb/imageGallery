angular.module('imagesApp', ['angularUtils.directives.dirPagination','ui.bootstrap']);
angular.module('imagesApp').controller('imageController', ['$scope','$uibModal','$http',function ($scope, $uibModal,$http) {

	$scope.images = [];


	$http.get('https://jsonplaceholder.typicode.com/photos').success(function(data){
		$scope.images = data;
	}).error(function(error,status){
		$scope.data.error = {message:error, status:status};
		console.log($scope.data.error.status);
	});

	$scope.open = function (titlename) {
		//console.log(titlename);
		var modalInstance = $uibModal.open({
			  controller: 'PopupCont',
			templateUrl: 'popup.html',
			scope: $scope,
			resolve: {
			 editId: function () {
			   return titlename;
			 }
		   }
		});
	}
}]);

angular.module('imagesApp').controller('PopupCont', ['$scope','$uibModalInstance','editId', function ($scope, $uibModalInstance,editId) {
	$scope.title = $scope.images[editId].title;
	$scope.imageUrl = $scope.images[editId].url;
	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};
}]);