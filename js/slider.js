let slidesPerView;
let clone;
let slides;
let count = 1;
let slideSize;

const slidesList = document.querySelector('.slide-wrapper');
const slidesIndicators = document.querySelector('.slider-indicators');

function setupSlider() {
	slideSize = document.querySelectorAll('.slide-wrapper .slide')[0].clientWidth;
	let totalSlides = slidesList.childElementCount;
	let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

	if ( vw <= 767 ) slidesPerView = 1;
	if ( vw >= 768 && vw <= 1199 ) slidesPerView = 2;
	if ( vw >= 1200 ) slidesPerView = 4;

	for (let i = 0; i < slidesIndicators.childElementCount; i++) {
		if ( slidesIndicators.getElementsByTagName('button')[i].classList.contains('active') )
			slidesIndicators.getElementsByTagName('button')[i].classList.remove('active');
	}
	slidesIndicators.getElementsByTagName('button')[0].classList.add('active');

	slidesList.style.transform = 'translateX(' + (-slideSize * slidesPerView) + 'px)';

	for (let i = 1; i <= slidesPerView; i++) {
		clone = document.querySelector('.slide-wrapper [data-item="'+ i +'"]').cloneNode(true);
		clone.classList.add('clone');

		slidesList.appendChild(clone);
	}

	for (let i = slidesPerView; i >= 1; i--) {
		clone = document.querySelector('.slide-wrapper [data-item="' + totalSlides + '"]').cloneNode(true);
		clone.classList.add('clone');

		slidesList.insertBefore(clone, slidesList.childNodes[0]);

		totalSlides--;
	}

	document.querySelectorAll('.slide-wrapper .slide')[slidesPerView - 1].classList.add('last-slide-clone');
	document.querySelectorAll('.slide-wrapper .slide')[slidesList.childElementCount - slidesPerView].classList.add('first-slide-clone');


	slides = document.querySelectorAll('.slide-wrapper .slide');
	count = slidesPerView;
}


/*
** Next button behaviour
*/
document.querySelector('.slider-controls__right').addEventListener('click', function() {
	if (count >= slides.length - 1) return;

	count++;

	slidesList.style.transition = '0.3s transform ease';
	slidesList.style.transform = 'translateX(' + (-slideSize * count) + 'px)';

	/*
	** Updating the indicators
	*/
	for (let i = 0; i < slidesIndicators.childElementCount; i++) {
		if ( slidesIndicators.getElementsByTagName('button')[i].classList.contains('active') ) {
			slidesIndicators.getElementsByTagName('button')[i].classList.remove('active');

			if ( (i + 1) < slidesIndicators.childElementCount)
				slidesIndicators.getElementsByTagName('button')[i + 1].classList.add('active');
			else
				slidesIndicators.getElementsByTagName('button')[0].classList.add('active');
			break;
		}
	}
});


/*
** Previous button behaviour
*/
document.querySelector('.slider-controls__left').addEventListener('click', function() {
	if (count <= 0) return;

	count--;

	slidesList.style.transition = '0.3s transform ease';
	slidesList.style.transform = 'translateX(' + (-slideSize * count) + 'px)';

	/*
	** Updating the indicators
	*/
	for (let i = 0; i < slidesIndicators.childElementCount; i++) {
		if ( slidesIndicators.getElementsByTagName('button')[i].classList.contains('active') ) {
			slidesIndicators.getElementsByTagName('button')[i].classList.remove('active');

			if ( (i - 1) >= 0)
				slidesIndicators.getElementsByTagName('button')[i - 1].classList.add('active');
			else
				slidesIndicators.getElementsByTagName('button')[slidesIndicators.childElementCount - 1].classList.add('active');
			break;
		}
	}
});

slidesList.addEventListener('transitionend', function() {
	if ( slides[count].classList.contains('last-slide-clone') ) {
		slidesList.style.transition = 'none';
		count = slides.length - slidesPerView - 1;
		slidesList.style.transform = 'translateX(' + (-slideSize * count) + 'px)';
	}

	if ( slides[count].classList.contains('first-slide-clone') ) {
		slidesList.style.transition = 'none';
		count = slides.length - count;
		slidesList.style.transform = 'translateX(' + (-slideSize * count) + 'px)';
	}
});

function debounce(func, time){
    var time = time || 100; // 100 by default if no param
    var timer;
    return function(event){
        if(timer) clearTimeout(timer);
        timer = setTimeout(func, time, event);
    };
}

window.addEventListener('resize', function() {
	document.querySelectorAll('.slide.clone').forEach(e => e.remove());
});

window.addEventListener('resize', debounce(function(e){
	setupSlider();
}, 400));

setupSlider();