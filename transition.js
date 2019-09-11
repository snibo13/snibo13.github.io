if (localStorage.getItem('bc') == null)
  localStorage.setItem('bc',"#C4CFD1");
var i = 0;
$('document').ready(
  function() {
    $('.button').click(transitionColors);
    function transitionColors() {
      var bc;
      console.log("Yuh");
      var previousPage = window.location.pathname;
      console.log("previousPage");
      console.log(previousPage);
      i++;
      switch(previousPage) {
        case '/indexn.html':
          bc = "#C4CFD1";
          break;
        case '/about.html':
          bc = "#008855";
          break;
        default 
      }
      console.log(bc);
      localStorage.setItem('bc',bc);
    }
  }
)
