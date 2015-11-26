'use strict';
// Some Useful functions to use multiple times

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

// Button handlers

$(document).ready(function() {

  var questionIndexTemplate = Handlebars.compile($("#questions-index").html());
  var fistIndexTemplate = Handlebars.compile($("#fists-index").html());
  var myQuestionIndexTemplate = Handlebars.compile($("#myquestions-index").html());
  var userprofileIndexTemplate = Handlebars.compile($("#userprofile-index").html());

  var questionGet = function () {
    $.ajax({
      method: 'GET',
      url: cofapi.cof + "/questions"
    }).done(function (data){
      var questionHTML = questionIndexTemplate({questions: data.questions});
      $("#allQuestions").html(questionHTML);
    }).fail(function (data){
      console.error(data);
    });
  };

  questionGet(); // As soon as all DOM loads get all the questions fo view.

  var userProfileGet = function () {
    var query = '?user_id=' + cofapi.id;

    $.ajax({
      method: 'GET',
      url: cofapi.cof + "/profiles" + query
    }).done(function (data){
      var userProfileHTML = userprofileIndexTemplate({profiles: data.profiles});
      $("#userprofile").html(userProfileHTML);
    }).fail(function (data){
      console.error(data);
    });
  };

  var myQuestionsGet = function() {
    var query = '?profile_id=' + cofapi.id;

    $.ajax({
      method: 'GET',
      url: cofapi.cof + "/questions" + query
    }).done(function (data){
      var myQuestionHTML = myQuestionIndexTemplate({questions: data.questions});
      $("#myQuestions").html(myQuestionHTML);
    }).fail(function (data){
      console.error(data);
    });
  };

  var myFistsGet = function() {
    var query = '?profile_id=' + cofapi.id;

    $.ajax({
      method: 'GET',
      url: cofapi.cof + "/fists" + query
    }).done(function (data){
      var fistHTML = fistIndexTemplate({fists: data.fists});
      $("#myFists").html(fistHTML);
    }).fail(function (data){
      console.error(data);
    });
  };

  var resultGet = function() {
    var id = $(event.target).data('question-id');
    var query = '?question_id=' + id;
    $('#resultQuestion').text('');
    $('#five').text('0');
    $('#four').text('0');
    $('#three').text('0');
    $('#two').text('0');
    $('#one').text('0');

    $.ajax({
      method: 'GET',
      url: cofapi.cof + "/questions/" + id
    }).done(function (data) {
      $('#resultQuestion').text(data.topic);
      visual.result();
    }).fail(function (data) {
      console.error(data);
    });

    $.ajax({
      method: 'GET',
      url: cofapi.cof + "/fists" + query
    }).done(function (data){
      $('#result').text(JSON.stringify(data, null, 4));
      $('#five').text(data['5']);
      $('#four').text(data['4']);
      $('#three').text(data['3']);
      $('#two').text(data['2']);
      $('#one').text(data['1']);
      visual.result();
    }).fail(function (data){
      console.error(data);
    });
  };

  $('#fistbutton').on('click', myFistsGet);

  $('#questionbutton').on('click', myQuestionsGet);

  var questionId;

  $('#allQuestions').on('click', function () {
    var button = $(event.target).data('button');
    var token = cofapi.token;

    if (button === 'rate' && cofapi.token !== "") {
      $('#rateMsg').text('Rate');
      $('.rateButton').show();
      visual.rate();
      questionId = $(event.target).data('question-id');
    } else if (button === 'rate' && cofapi.token === "") {
      $('#rateMsg').text('Please Login First');
      $('.rateButton').hide();
      visual.rate();
      setTimeout(visual.home, 1500);
    }
    if (button === 'result') {
      resultGet();
    }
  });

  $('.rateButton').on('click', function () {
    var profileId = cofapi.id;
    var value = $(event.target).data('val');
    var token = cofapi.token;
    var data = { "fist": {
                          "value": value,
                          "profile_id": profileId,
                          "question_id": questionId
                          }};
    cofapi.createFist(data, token, callback);
    questionGet();
    $('#rateMsg').text('Submitted');
    $('.rateButton').hide();
    setTimeout(visual.home, 1500);
  });

  $('#myQuestions').on('click', function () {
    var id = $(event.target).data('question-id');
    var button = $(event.target).data('button');
    var token = cofapi.token;
    if (button === 'delete') {
      cofapi.destroyQuestion(id, token, function (error, data) {
        if (error) {
          console.error(error);
          $('#result').val('status: ' + error.status + ', error: ' + error.error);
          return;
        }
        $('#result').text(JSON.stringify(data, null, 4));
        myQuestionsGet();
        questionGet();
      });
      console.log('Question deleted');
    } else if (button === 'result') {
      resultGet();
    }
  });

  $('#questionForm').on('submit', function(e) {
    var token = cofapi.token;
    var data = wrap('question', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      questionGet();
      callback(null, data);
    };
    e.preventDefault();
    $('#questionForm').children('input').val('');
    cofapi.createQuestion(data, token, cb);
  });

  $('#questionDeleteForm').on('submit', function(e) {
    var token = cofapi.token;
    var id = $('#deleteQuestion').val();
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      questionGet();
      callback(null, data);
    };
    e.preventDefault();
    $('#questionForm').children('input').val('');
    cofapi.destroyQuestion(id, token, cb);
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
      $('#profilebutton').text(data.user.email);
    };
    e.preventDefault();
    cofapi.login(credentials, cb);
    $('#loginForm').children('input').val('');
    setTimeout(visual.home, 900);
    setTimeout(profileExist, 1000);
    setTimeout(function() {
      if (cofapi.profile === false && cofapi.token !== "") {
        $('.profile').show();
      }
    }, 1500);
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
      visual.home();
      cofapi.profile = true;
    } else if (cofapi.profile === false) {
      cofapi.createProfile(data, token, cb);
      visual.home();
      cofapi.profile = true;
    } else {
      console.log('Didn\'t Work');
      return;
    }
  });

  $('#logoutbutton').on('click', function() {
    var id = cofapi.id;
    var token = cofapi.token;
    cofapi.logout(id, token, callback);
    $('#profilebutton').text('My Profile');
    $('#questionInput').hide();
    console.log('logged out');
    setTimeout(function () {
      cofapi.id = null;
      cofapi.token = '';
      cofapi.email = null;
      cofapi.profile = null;
    }, 500);
  });

  $('#myFists').on('click', function() {
    var id = $(event.target).data('fist-id');
    var button = $(event.target).data('button');
    var token = cofapi.token;
    if (button === 'delete') {
      cofapi.destroyFist(id, token, function (error, data) {
        if (error) {
          console.error(error);
          $('#result').val('status: ' + error.status + ', error: ' +error.error);
          return;
        }
        $('#result').text(JSON.stringify(data, null, 4));
        myFistsGet();
      });
      console.log('Fist deleted');
    } else if (button === 'result') {
      resultGet();
    }
  });

  $('#profilebutton').on('click', function () {
    if (cofapi.profile === true) {
      visual.profileform();
      $('.profileview').show();
      userProfileGet();
    } else {
      visual.profileform();
    }
  });
});
