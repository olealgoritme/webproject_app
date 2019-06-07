document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  M.Modal.init(elems, null);

  var fab = document.querySelectorAll('.btn-floating');
  M.FloatingActionButton.init(fab, {
        direction: 'top',
        hovedEnabled: false
  });


});

$(document).ready(function() {
  

    
    $(".dropdown-trigger").dropdown();
  $('.sidenav').sidenav();
});
