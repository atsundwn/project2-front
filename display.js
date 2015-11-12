var visual = {
  clear: function () {
  $('.navbutton').removeClass('active');
  $('.register').css('display','none');
  $('.login').css('display','none');
  $('.profile').css('display','none');
  }
};

$(document).ready(function(){

  $('#homeButton').on('click', function(){
    visual.clear();
    $('#homebuttonli').addClass('active');
  });

  $('#registerbutton').on('click', function(){
    visual.clear();
    $('.register').css('display','block');
    $('#registerbuttonli').addClass('active');
  });

  $('#loginbutton').on('click', function(){
    visual.clear();
    $('.login').css('display','block');
    $('#loginbuttonli').addClass('active');
  });

  $('#logoutbutton').on('click', function(){
    visual.clear();
    $('#logoutbuttonli').addClass('active');
  });

  $('#loginHere').on('click', function(){
    visual.clear();
    $('.login').css('display','block');
    $('#loginbuttonli').addClass('active');
  });

  $('#profilebutton').on('click', function(){
    visual.clear();
    $('.profile').css('display','block');
    $('#profilebuttonli').addClass('active');
  });

});
