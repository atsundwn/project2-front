# Click of Five

The back-end repository can be found here: https://github.com/atsundwn/project2-api

This app was inspired by GA's use of 'fist of five,' a way for an instructor to gauge students current level of understanding on a topic.

###User Stories

As a user ...

  * I can register/login/logout.
  * I can create/update my profile.
  * I can view questions for me to rate.
  * I can rate questions by creating fists.
  * I can create questions for others to rate.
  * I can delete my fists.
  * I can delete my questions which will delete all fists associated with the question.
  * I can view results of the survey.

###Stretch goals

  * Get better and more interesting ways to view results.
  * Responsive design for the entire site.
  * Add more ways to rate.
  * Sortable tables.
  * All questions should list with most recently created at the top.

###Initial wireframe and data modeling
http://imgur.com/WM5RL0y

###Data Structure

  * A user has one profile.
  * A user has many fists.
  * A user has many questions.
  * A question has many fists.

###Challenges and lessons

  * Putting clickhandlers on handlerbars generated templates.
  * Learned to use handlebars to edit inside html tags.
  * It's difficult to keep DRY principle.
  * UX is difficult.  My first submission failed because my UX failed to guide the user to make a profile when user doesn't have one.
  * Getting the results view was tough and feels jerry-rigged.
