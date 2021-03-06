/**
 * Created by y1275963 on 12/5/16.
 */
app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});
app.controller('ngTableCtrl', function ($scope, $http, $timeout) {
    $scope.list = [];
    $scope.columns = [];
    $scope.currentPage = 1; //current page
    $scope.entryLimit = 5; //max no of items to display in a page
    $scope.filteredItems = 0; //Initially for no filter
    $scope.totalItems = 0;
    $scope.errorMessage = '';

    $scope.execute_sql = function() {
        $http( {
            url: '/ngtable/test',
            method: 'GET',
            params: {SQL: $scope.sqlsentence}
        }).success(function(data){
            $scope.errorMessage = '';
            $scope.list = data;
            $scope.columns = Object.keys(data[0]);
            $scope.filteredItems = $scope.list.length; //Initially for no filter
            $scope.totalItems = $scope.list.length;
        }).error(function(data, status, header) {
            $scope.errorMessage = data;
            console.log(data);
        });
    }


    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() {
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
});