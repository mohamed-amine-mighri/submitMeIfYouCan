

const btn = document.querySelectorAll(".btn span");

for (let i = 0; i < btn.length; i++) {
	btn[i].addEventListener("click", function() {
		document
			.querySelector(
				"nav .dot.step_" + (parseInt(this.getAttribute("data-step")) + 1) + ""
			)
			.classList.add("done");
		turn(parseInt(this.getAttribute("data-step")));
	});
}

function turn(step) {
	if (!!document.querySelector("#step__" + (step - 1))) {
		document.querySelector("#step__" + (step - 1)).classList.add("hidden");
	}

	document.querySelector("#step__" + step).classList.add("cube__face--top");
	document.querySelector("#step__" + step).classList.remove("cube__face--front");

	step += 1;
	if (!!document.querySelector("#step__" + step)) {
		document.querySelector("#step__" + step).classList.add("cube__face--front");
		if (!!document.querySelector("#step__" + step + " input")) {
			document.querySelector("#step__" + step + " input").focus();
		}
		document
			.querySelector("#step__" + step)
			.classList.remove("cube__face--bottom");
	}

	step += 1;
	if (!!document.querySelector("#step__" + step)) {
		document.querySelector("#step__" + step).classList.add("cube__face--bottom");
	}
}

const colors = document.querySelectorAll(".radio .item");
const btns = document.querySelectorAll(".btn");

for (var i = 0; i < colors.length; i++) {
	colors[i].addEventListener("click", function() {
		this.closest(".container")
			.querySelector(".btn span")
			.click();
		document.body.classList.add(this.getAttribute("data-color"));
		for (var j = 0; j < btns.length; j++) {
			btns[j].classList.add(this.getAttribute("data-color"));
		}
		document
			.querySelector(".checkbox")
			.classList.add(this.getAttribute("data-color"));
	});
}

document.querySelector(".checkbox").addEventListener("click", function() {
	this.classList.toggle("checked");
	document.querySelector(".scene").classList.add("end");

	document.querySelector(".welcome").classList.add("show");
});

const inputs = document.querySelectorAll(".cube__face input");
for (let i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener("keyup", function(e) {
		if (this.getAttribute("type") == "text") {
			if (this.value.length > 1) {
				this.closest(".container")
					.querySelector(".btn")
					.classList.add("show");
				if (e.keyCode == 13) {
					this.closest(".container")
						.querySelector(".btn span")
						.click();
				}
			} else {
				this.closest(".container")
					.querySelector(".btn")
					.classList.remove("show");
			}
		}
		if (this.getAttribute("type") == "email") {
			if (this.value.length > 2 && this.value.includes("@")) {
				this.closest(".container")
					.querySelector(".btn")
					.classList.add("show");
				if (e.keyCode == 13) {
					this.closest(".container")
						.querySelector(".btn span")
						.click();
				}
			} else {
				this.closest(".container")
					.querySelector(".btn")
					.classList.remove("show");
			}
		}
		if (this.getAttribute("type") == "password") {
			if (this.value.length > 3) {
				this.closest(".container")
					.querySelector(".btn")
					.classList.add("show");
				if (e.keyCode == 13) {
					this.closest(".container")
						.querySelector(".btn span")
						.click();
				}
			} else {
				this.closest(".container")
					.querySelector(".btn")
					.classList.remove("show");
			}
		}
	});
}

document.querySelector("select").addEventListener("change", function() {
	this.closest(".container")
		.querySelector(".btn")
		.classList.add("show");
});

/* let form = document.querySelector('#registerForm'); 
form.email.addEventListener('change',function(){
	validEmial(this);  
});
const validEmial = function(inputEmail){
	let emailRegExp = RegExp(
		'^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
		'g'
	);
	let testEmail = emailRegExp.test(inputEmail.value);
	let small = inputEmail.nextElementSibling;

	if(testEmail){
		small.innerHtml='Adresse Valide';
		small.classList.remove('text-danger');
		small.classList.remove('text-success');
	}else{
		small.innerHtml='Adresse Non Valide';
		small.classList.remove('text-sucess');
		small.classList.remove('text-danger');
	}
} */

$.fn.goValidate = function() {
    var $form = this,
        $inputs = $form.find('input:text, input:password'),
        $selects = $form.find('select'),
        $textAreas = $form.find('textarea');
  
    var validators = {
        name: {
            regex: /^[A-Za-z]{3,}$/
        },
        username: {
            regex: /^[A-Za-z]{6,}$/
        },
        firstName: {
            regex: /^[A-Za-z]{3,}$/
        },
        lastName: {
            regex: /^[A-Za-z]{3,}$/
        },
        town: {
            regex: /^[A-Za-z]{3,}$/
        },
        postcode: {
            regex: /^.{3,}$/
        },
        password1: {
            regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
        },
        password1_repeat: {
            regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
        },
        email: {
            regex: /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/
        },
        phone: {
            regex: /^[2-9]\d{2}-\d{3}-\d{4}$/,
        },
        body: {
            regex: /^.{3,}$/
        },
        country: {
            regex: /^(?=\s*\S).*$/,
        }
    };
    var validate = function(klass, value) {
        var isValid = true,
            error = '';
            
        if (!value && /required/.test(klass)) {
            error = 'This field is required';
            isValid = false;
        } else {
            klass = klass.split(/\s/);
            $.each(klass, function(i, k){
                if (validators[k]) {
                    if (value && !validators[k].regex.test(value)) {
                        isValid = false;
                        error = validators[k].error;
                    }
                }
            });
        }
        return {
            isValid: isValid,
            error: error
        }
    };
    var showError = function($e) {
        var klass = $e.attr('class'),
            value = $e.val(),
            test = validate(klass, value);
      
        $e.removeClass('invalid');
        $('#form-error').addClass('hide');
        
        if (!test.isValid) {
            $e.addClass('invalid');
            
            if(typeof $e.data("shown") == "undefined" || $e.data("shown") == false){
               $e.popover('show');
            }
            
        }
      else {
        $e.popover('hide');
      }
    };
   
    $inputs.keyup(function() {
        showError($(this));
    });
    $selects.change(function() {
        showError($(this));
    });
    $textAreas.keyup(function() {
        showError($(this));
    });
  
    $inputs.on('shown.bs.popover', function () {
  		$(this).data("shown",true);
	});
  
    $inputs.on('hidden.bs.popover', function () {
  		$(this).data("shown",false);
	});
  
    $form.submit(function(e) {
      
        $inputs.each(function() { /* test each input */
        	if ($(this).is('.required') || $(this).hasClass('invalid')) {
            	showError($(this));
        	}
    	});
    	$selects.each(function() { /* test each input */
        	if ($(this).is('.required') || $(this).hasClass('invalid')) {
            	showError($(this));
        	}
    	});
    	$textAreas.each(function() { /* test each input */
        	if ($(this).is('.required') || $(this).hasClass('invalid')) {
            	showError($(this));
        	}
    	});
        if ($form.find('input.invalid').length) { /* form is not valid */
        	e.preventDefault();
            $('#form-error').toggleClass('hide');
        }
    });
    return this;
};



	$('form').goValidate();