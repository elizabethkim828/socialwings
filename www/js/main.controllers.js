app.controller('AppCtrl', function($scope, $ionicNavBarDelegate, $ionicModal, $ionicHistory, $ionicActionSheet, $ionicPopup, $timeout, UserFactory, $state, EventFactory) {

  // SIGNUP MODAL
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.signupModal = modal;
  });

  $scope.signup = function() {
    $scope.signupModal.show();
  };

  $scope.closeSignup = function() {
    $scope.signupModal.hide();
  };

  $scope.signupData = {};
  $scope.doSignup = function(signupData) {
    return UserFactory.signup(signupData).then(function(user) {
      $scope.currUser = user
      $state.go('app.profile', {}, {reload:true})
      $timeout(function() {
        $scope.closeSignup();
      }, 500);
    })
  };

  // LOGIN MODAL
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  $scope.login = function() {
    $scope.loginModal.show();
  };

  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  $scope.loginData = {};
  $scope.doLogin = function(loginData) {
    UserFactory.logIn(loginData).then(function(user) {
      if (user) {
        $scope.currUser = user
        $state.go('app.profile', {}, {reload:true})
        $timeout(function() {
          $scope.closeLogin();
        }, 500);
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

  // LOGOUT ACTIONSHEET
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

  // POST EVENT MODAL
  $ionicModal.fromTemplateUrl('templates/post-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.postModal = modal;
  });

  $scope.openPostModal = function() {
    $scope.postModal.show();
  };

  $scope.closePostModal = function() {
    $scope.postModal.hide();
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