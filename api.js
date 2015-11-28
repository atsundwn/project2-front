'use strict';
var cofapi = {
  cof: 'http://localhost:3000',
  // cof: 'https://shielded-hollows-9246.herokuapp.com',
  id: null,
  token: '',
  email: null,
  profile: null,
  profile_id: null,
  fists: [],
  given_name: null,
  surname: null,
  group: null,

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

  listProfiles: function listProfiles(query, callback) {
    this.ajax({
      methosd: 'GET',
      url: this.cof + '/profiles' + query,
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
    }, callback);
  },

  createProfile: function (data, token, callback) {
    this.ajax({
      method: 'POST',
      url: this.cof + '/profiles',
      headers: {
        Authorization: 'Token token=' + token
      },
      data: data,
      dataType: 'json'
    }, callback);
  },

  updateProfile: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.cof + '/profiles/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      data: data,
      dataType: 'json'
    }, callback);
  },

  createQuestion: function (data, token, callback) {
    this.ajax({
      method: 'POST',
      url: this.cof + '/questions',
      headers: {
        Authorization: 'Token token=' + token
      },
      data: data,
      dataType: 'json'
    }, callback);
  },

  destroyQuestion: function (id, token, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.cof + '/questions/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  createFist: function (data, token, callback) {
    this.ajax({
      method: 'POST',
      url: this.cof + '/fists',
      headers: {
        Authorization: 'Token token=' + token
      },
      data: data,
      dataType: 'json'
    }, callback);
  },

  updateFist: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.cof + '/fists/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      data: data,
      dataType: 'json'
    }, callback);
  },

  destroyFist: function (id, token, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.cof + '/fists/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },
};
