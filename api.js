'use strict';
var cofapi = {
  cof: 'localhost:3000',

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
};

$(document).ready(function(){


});
