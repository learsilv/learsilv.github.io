window.addEventListener('scroll', function() {
	if ( window.scrollY >= document.querySelector('header').offsetHeight ) {
		document.querySelector('header').classList.add('scrolled');
	} else {
		document.querySelector('header').classList.remove('scrolled');
	}
});

document.querySelector('.burger-menu').addEventListener('click',function() {
	if ( document.querySelector('.burger-menu').classList.contains('open') ) {

		document.querySelector('.burger-menu').classList.remove('open');
		document.querySelector('.header-container__navbar-menu').classList.remove('open');
		document.querySelector('.header-container__navbar-menu').classList.add('animating');

		setTimeout(function() {
			document.querySelector('.header-container__navbar-menu').classList.remove('animating');
		}, 300);
	} else {
		document.querySelector('.burger-menu').classList.add('open');
		document.querySelector('.header-container__navbar-menu').classList.add('open','animating');

		setTimeout(function() {
			document.querySelector('.header-container__navbar-menu').classList.remove('animating');
		}, 300);
	}

	return false;
});