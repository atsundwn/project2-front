'use strict';
var visual = {
  clear: function () {
    $('.navbutton').removeClass('active');
    $('.register').css('display','none');
    $('.login').css('display','none');
    $('.profile').css('display','none');
    $('.myfistview').css('display','none');
    $('.questionview').css('display','none');
    $('.resultview').css('display','none');
    $('.myquestionview').css('display','none');
  },

  home: function () {
    visual.clear();
    $('#homebuttonli').addClass('active');
    $('.questionview').show();
  },

  result: function () {
    visual.clear();
    $('.resultview').show();
  },

  register: function () {
    visual.clear();
    $('.register').css('display','block');
    $('#registerbuttonli').addClass('active');
  },

  login: function () {
    visual.clear();
    $('.login').css('display','block');
    $('#loginbuttonli').addClass('active');
  },

  logout: function () {
    visual.clear();
    $('#logoutbuttonli').addClass('active');
    $('#profilebutton').css('display','none');
    $('#fistbutton').css('display','none');
    $('#questionbutton').css('display', 'none');
  },

  profileform: function () {
    visual.clear();
    $('.profile').css('display','block');
    $('#profilebuttonli').addClass('active');
    profileExist();
  },

  myfists: function () {
    visual.clear();
    $('.myfistview').show();
    $('#fistbuttonli').addClass('active');
  },

  myquestions: function () {
    visual.clear();
    $('.myquestionview').show();
    $('#questionbuttonli').addClass('active');
  }
};

$(document).ready(function () {

  $('#homeButton').on('click', visual.home);

  $('#registerbutton').on('click', visual.register);

  $('#loginbutton').on('click', visual.login);

  $('#logoutbutton').on('click', visual.logout);

  $('#loginHere').on('click', visual.login); //register screen

  $('#profilebutton').on('click', visual.profileform);

  $('#fistbutton').on('click', visual.myfists);

  $('#questionbutton').on('click', visual.myquestions);
});
