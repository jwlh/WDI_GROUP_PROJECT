angular.module('wdi-project-3').controller('registerCtrl', registerCtrl);

registerCtrl.$inject = [
  '$auth',
  '$state',
  'currentUserService',
  '$window',
  '$scope',
  '$rootScope'
];
function registerCtrl(
  $auth,
  $state,
  currentUserService,
  $window,
  $scope,
  $rootScope
) {
  const vm = this;

  vm.showModal = false;
  vm.submitForm = register;
  vm.user = {};

  if (!$scope.$parent.main.showRegisterModal) {
    $scope.$parent.main.showRegisterModal = true;
  }

  vm.pickFile = e => {
    e.preventDefault();
    $window.filepicker.pick({ mimetype: 'image/*' }, Blob => {
      if (Blob && Blob.url) {
        vm.user.image = Blob.url;
        $scope.$apply();
      }
    });
  };

  function register() {
    if (!vm.user.image) {
      vm.user.image = 'images/avatar_white.png';
    }

    $auth
      .signup(vm.user)
      .then(res => {
        if (res.status === 201) {
          $auth.login(vm.user).then(() => {
            currentUserService.getUser();
            $state.go('map');
          });
        }
      })
      .catch(() => {
        $rootScope.$broadcast('displayMessage', {
          type: 'warning',
          content: 'Incorrect Credentials.'
        });
      });
  }
}
