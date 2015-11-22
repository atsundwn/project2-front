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

$(document).ready(function(){

  var questionIndexTemplate = Handlebars.compile($("#questions-index").html());
  var fistIndexTemplate = Handlebars.compile($("#fists-index").html());

  var questionGet = function () {
    $.ajax({
      method: 'GET',
      url: cofapi.cof + "/questions"
    }).done(function(data){
      var questionHTML = questionIndexTemplate({questions: data.questions});
      $("#allQuestions").html(questionHTML);
    }).fail(function(data){
      console.error(data);
    });
  };

  questionGet();

  $('#fistbutton').on('click', function() {
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
    };
    e.preventDefault();
    cofapi.login(credentials, cb);
    $('.login').css('display','none');
    $('#loginForm').children('input').val('');
    $('#profilebutton').css('display','block');
    $('#fistbutton').css('display','block');
    $('#questionbutton').css('display', 'block');
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




  $("#allQuestions").on('click', function(event){
    var buttonClicked = $(event.target);
    // HTML 5 gives all element the ability to store data on them
    // need <p data-foo="hello"></p>
    // elementForP.data('foo') // return the string "hello"
    var idClicked = buttonClicked.data('id');
    console.log(idClicked);
    console.log("You clicked on id "+ idClicked);

    var newRequest = {
        borrow_request: {
        book_id: idClicked,
        user_id: cUser.user.id
        //date: Date.now
      }
    };

    api.requestBook(cUser.user.token, newRequest, bookFuncs.newRequestCB);
    //$(event.target).attr("class").text("btn btn-warning");
    $('*[data-delete-id=idClicked]').html("requested");
    event.preventDefault();
  });
});
