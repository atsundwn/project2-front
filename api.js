'use strict';
var cofapi = {
  cof: 'http://localhost:3000',
  id: null,
  token: '',
  email: null,
  profile: null,

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

  listQuestions: function listQuestions(callback) {
    this.ajax({
      method: 'GET',
      url: this.cof + '/questions',
      dataType: 'json'
    }, callback);
  },

  listFists: function listFists(query, callback) {
    this.ajax({
      methosd: 'GET',
      url: this.cof + '/fists' + query,
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

  getProfile: function getProfile(id, callback) {
    this.ajax({
      methosd: 'GET',
      url: this.cof + '/profiles/' + id,
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

  updateQuestion: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.cof + '/questions/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      data: data,
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
  }
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
};

var wrap = function wrap(root, formData) {
  var wrapper = {};
  wrapper[root] = formData;
  return wrapper;
};

var callback = function callback(error, data) {
  if (error) {
    console.error(error);
    $('#result').val('status: ' + error.status + ', error: ' +error.error);
    return;
  }
  $('#result').text(JSON.stringify(data, null, 4));
};

var profileExist = function profileExist() {
  var query = '?user_id=' + cofapi.id;
  cofapi.listProfiles(query, function (error, data) {
    if (data.profiles[0] === undefined) {
      console.log('false');
      cofapi.profile = false;
      return;
    } else if (data.profiles[0].user_id === cofapi.id) {
      console.log('true');
      cofapi.profile = true;
     return;
    }
  });
};


$(document).ready(function(){

  var questionIndexTemplate = Handlebars.compile($("#questions-index").html());

  $.ajax({
    method: 'GET',
    url: cofapi.cof + "/questions"
  }).done(function(data){
    var questionHTML = questionIndexTemplate({questions: data.questions});
    $("#allQuestions").html(questionHTML);
  }).fail(function(data){
    console.error(data);
  });

  $('#fistbutton').on('click', function() {
    var fistIndexTemplate = Handlebars.compile($("#fists-index").html());
    var query = '?profile_id=' + cofapi.id;

    $.ajax({
      method: 'GET',
      url: cofapi.cof + "/fists" + query
    }).done(function(data){
      var fistHTML = fistIndexTemplate({fists: data.fists});
      $("#myFists").html(fistHTML);
    }).fail(function(data){
      console.error(data);
    });
  });




  $('#registerForm').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    cofapi.register(credentials, callback);
    e.preventDefault();
    $('.register').css('display','none');
    $('.login').css('display','block');
    $('#registerForm').children('input').val('');
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
      cofapi.email = data.user.email;
    };
    e.preventDefault();
    cofapi.login(credentials, cb);
    $('.login').css('display','none');
    $('#loginForm').children('input').val('');
    $('#profilebutton').css('display','block');
    $('#fistbutton').css('display','block');
  });

  $('#profileForm').on('submit', function(e) {
    var id = cofapi.id;
    var token = cofapi.token;
    var data = wrap('profile', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
    };
    e.preventDefault();
    $('#profileForm').children('input').val('');
    $('.profile').css('display','none');
    if (cofapi.profile === true) {
      cofapi.updateProfile(id, data, token, cb);
    } else if (cofapi.profile === false) {
      cofapi.createProfile(data, token, cb);
    } else {
      console.log('Didn\'t Work');
      return;
    }
  });

  $('#logoutbutton').on('click', function() {
    var id = cofapi.id;
    var token = cofapi.token;
    cofapi.logout(id, token, callback);
    console.log('Successfully logged out');
  });



  $('#defaultButton').on('click', function() {
    profileExist();
  });

});
