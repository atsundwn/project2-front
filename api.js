'use strict';
var cofapi = {
  cof: 'http://localhost:3000',
  id: null,
  token: '',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.cof + '/register',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.cof + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  listQuestions: function listQuestions(callback){
    this.ajax({
      method: 'GET',
      url: this.cof + '/questions',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json'
    }, callback);
  },

  //Authenticated api actions

  logout: function (id, token, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.cof + '/logout/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      data: JSON.stringify({}),
      dataType: 'json'
    }, callback);
  },



};

var form2object = function(form) {
  var data = {};
  $(form).children().each(function(index, element) {
    var type = $(this).attr('type');
    if ($(this).attr('name') && type !== 'submit') {
      data[$(this).attr('name')] = $(this).val();
    }
  });
  return data;
  console.log(data);
};

var wrap = function wrap(root, formData) {
  var wrapper = {};
  wrapper[root] = formData;
  return wrapper;
  console.log(wrapper);
};

var callback = function callback(error, data) {
  if (error) {
    console.error(error);
    $('#result').val('status: ' + error.status + ', error: ' +error.error);
    return;
  }
  $('#result').val(JSON.stringify(data, null, 4));
};




$(document).ready(function(){

  $('#registerForm').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    console.log(credentials);
    cofapi.register(credentials, callback);
    e.preventDefault();
    $('.register').css('display','none');
  });

  $('#loginForm').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      cofapi.token = data.user.token;
      cofapi.id = data.user.id;
    };
    e.preventDefault();
    cofapi.login(credentials, cb);
    $('.login').css('display','none');
  });

  $('#logoutbutton').on('click', function(e) {
    var id = cofapi.id;
    var token = cofapi.token;
    cofapi.logout(id, token, callback);
    console.log('Successfully logged out');
  });

});
