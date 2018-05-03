//character count for textarea
var maxLength = 140;
$(document).ready(function(){

  $('#txarea').keyup(function() {
  	var length = $(this).val().length;
  	var length = maxLength-length;
  	$('#counter').text(length);
  	if (length < 1) {
  	  $('#counter').css({ 'color': 'red'});
  	}else{
  	  $('#counter').css({ 'color': '#244751'});
  	}
  })
});
