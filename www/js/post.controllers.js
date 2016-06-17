app.controller('PostCtrl', function($scope, $ionicModal, EventFactory, $state) {
  $ionicModal.fromTemplateUrl('templates/post-modal.html', {
     scope: $scope,
     animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.modal = modal;
   });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  
  $scope.closeModal = function() {
   $scope.modal.hide();
  };
  
  $scope.newEvent = {}

  $scope.postEvent = function(newEvent) {
    EventFactory.postEvent(newEvent).then(function(event) {
      $scope.closeModal()
      $state.go('app.singleEvent', {eventId: event.id})   
    })
  }

  $scope.categories = ['shopping', 'music', 'drinks', 'fitness', 'nature']

});

