app.controller('AppCtrl', function($scope, $ionicNavBarDelegate, $ionicModal, $ionicHistory, $ionicActionSheet, $ionicPopup, $timeout, UserFactory, $state, EventFactory) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.loginModal.show();
  };

  $scope.logout = function() {
    $ionicActionSheet.show({
      destructiveText: 'Yes, log me out',
      cancelText: 'Cancel',
      titleText: 'Are you sure you want to log out?',
      destructiveButtonClicked: function() {
        $ionicHistory.clearCache().then(function(){
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.events')
        })
        $scope.currUser = false
        return UserFactory.logout()
      }
    })
  }



  // Perform the login action when the user submits the login form
  $scope.doLogin = function(loginData) {
    UserFactory.logIn(loginData).then(function(user) {
      if (user) {
        $scope.currUser = user
        $state.go('app.profile', {}, {reload:true})
        $timeout(function() {
          $scope.closeLogin();
        }, 1000);
      }
      else {
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Unauthorized',
            template: 'Incorrect password!'
          });

          alertPopup.then(function(res) {
            console.log('res')
          })
        }

        $scope.showAlert()
      }
    })
  };

  // post an event modal:
  $ionicModal.fromTemplateUrl('templates/post-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.postModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closePostModal = function() {
    $scope.postModal.hide();
  };

  // Open the login modal
  $scope.openPostModal = function() {
    $scope.postModal.show();
  };

  $scope.newEvent = {}

  $scope.postEvent = function(newEvent) {
    EventFactory.postEvent(newEvent).then(function(event) {
      $scope.closePostModal()
      $state.go('app.singleEvent', {eventId: event.id})   
    })
  }

  $scope.categories = ['shopping', 'music', 'drinks', 'fitness', 'nature']

})