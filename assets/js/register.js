document.getElementById('pageDisabled').style.display='block';
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var page = 1;

$( document ).ready(function() {
	console.log( "ready!" );
	//$('form#msform').submit();
});

$(".next").click(function(){

	if(($(".form-error").length<=12&&page==1)||($(".form-error").length<=6&&page==2)||($(".form-error").length==0&&page==3)){

		if(animating) return false;
		animating = true;

		current_fs = $(this).parent();
		next_fs = $(this).parent().next();

		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

		//show the next fieldset
		next_fs.show();
		page++;
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'transform': 'scale('+scale+')'});
				next_fs.css({'left': left, 'opacity': opacity});
			},
			duration: 800,
			complete: function(){
				current_fs.hide();
				animating = false;
			},
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	}
	else{
		$("#error").modal("show");
	}
});

$(".previous").click(function(){
	page--;
	if(animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

// Bind this keypress function to all of the input tags
$("input").keypress(function (evt) {
  //Deterime where our character code is coming from within the event
  var charCode = evt.charCode || evt.keyCode;
  if (charCode  == 13) { //Enter key's keycode
  return false;
  }
});

// submit form #msform
$(".submit").click(function(){
	// submits form via ajax
	var $contactForm = $('#msform');
	$contactForm.submit(function(e) {
		e.preventDefault();
		$.ajax({
			url: '//formspree.io/utphax@cyberhax.club',
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
		});
	});
	// triggers bootstrap success modal
	$("#success").modal("show");
});

// set sent header to utphax mail
function subject(f) {
	var rep = "[] "
	var grp = f.Team.value;
	var uni = f.University.value;
	var sub = "[" + uni + "] " + grp;
	f._subject.value = sub;
	if ( f._subject.value ==	rep ) {
		f._subject.value = "New UTPHAX registration!";
	}
};
