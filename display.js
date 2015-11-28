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
    $('.profileview').css('display','none');
    $('.logout').css('display','none');
    $('.rate').css('display','none');
  },

  home: function () {
    visual.clear();
    $('#homebuttonli').addClass('active');
    $('.questionview').show();
    if (cofapi.token !== "") {
      $('#questionInput').show();
      $('#profilebutton').css('display','block');
      $('#fistbutton').css('display','block');
      $('#questionbutton').css('display','block');
    }
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
    $('.logout').show();
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
  },

  rate: function () {
    visual.clear();
    $('.rate').show();
    $('.questionview').show();
  }
};
