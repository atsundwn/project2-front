$(document).ready(function(){

  $('#registerbutton').on('click', function(){
    $('.navbutton').removeClass('active');
    $('.login').css('display','none');
    $('.register').css('display','block');
    $('#registerbuttonli').addClass('active');
  });

  $('#loginbutton').on('click', function(){
    $('.navbutton').removeClass('active');
    $('.register').css('display','none');
    $('.login').css('display','block');
    $('#loginbuttonli').addClass('active');
  });

  $('#logoutbutton').on('click', function(){
    $('.navbutton').removeClass('active');
    $('.register').css('display','none');
    $('.login').css('display','none');
    $('#logoutbuttonli').addClass('active');
  });

  $('#loginHere').on('click', function(){
    $('.navbutton').removeClass('active');
    $('.register').css('display','none');
    $('.login').css('display','block');
    $('#loginbuttonli').addClass('active');
  });



});
