// Test / driver code (temporary). Eventually will get this from the server.

//Prevent Events
function validations(){
    $('#btn').attr('disabled',true);
    $('#txarea').keyup(function(){
        if(($(this).val().length !=0) && ($(this).val().length < 141)){
          $('#btn').attr('disabled', false);
          $('#errMessage').text('');
        }
        else{
          $('#btn').attr('disabled',true);
          if ($('#txarea').val().length > 140) {
    			$('#errMessage').text('Your tweet is too long!');
    		}
      }
    })
}
//Preventing XSS with Escaping
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

var $tweet,
	status = false,
	post_time;

function renderTweets (data){
	$('#tweets-container').empty();
	data.reverse().forEach(function(obj){
		$tweet = createTweetElement(obj);
		$('#tweets-container').append($tweet); 
	});
	return $('#tweets-container');
}

//Calculate the time of footer
function check_date(tweetData) {
	post_time = moment.unix(tweetData.created_at / 1000).fromNow();
	return post_time;
}
//Generate tweet's template
function createTweetElement (tweetData){
	var $tweet = $('<article>').addClass("tweet");
	
	$tweet = '<div class="tweet">' +
				'<header>' +
					'<div class="new_title">' +
             			'<img class="tw_logo" src="' + tweetData.user.avatars.regular +'">' +
             			'<label class="tweet_title">' + tweetData.user.name + '</label>' +	
             			'<label class="tweet_id">' + tweetData.user.handle +' </label>' +
          			'</div>' +
          		'</header>' +
          	 		'<div class="comment">' +
          	 			'<p>' + escape(tweetData.content.text) + '</p>' +
          	 		'</div>' +
          	 	'<footer>' +
          	 		'<label>' + check_date(tweetData) + '</label>' +
          	 			'<i class="fas fa-heart"></i>' +
          	 			'<i class="fas fa-retweet"></i>' +
          	 			'<i class="fas fa-flag"></i>' +
          	 	'</footer>' +
          	 '</div>'
	return $tweet;
}

function loadTweets (){
	$.ajax({
    url: '/tweets',
    method: 'GET',
    success: renderTweets
  });
}

$(document).ready(function(){
	validations();
	loadTweets();
	
  //toggle textarea via compose button
  $(function() {
  $("#compose").on("click", function(){
    $(".new-tweet").slideToggle( "normal", function() {
      var status = $(this).is(":hidden");
      if(!status){
        $("#txarea").focus();
      }
    });
    });
  });

  if(status){
		$('#art').hide();
	}

	$("#idForm").submit(function(e) {
		e.preventDefault();
		
    var inputTweet =  $( this ).serialize();
     	$.ajax({
     	type: "POST",
     	url: '/tweets',
     	data: inputTweet,
     	success: loadTweets
    });
    $('#txarea').val("");
    $('#tweets-container').val("");
  })
});




