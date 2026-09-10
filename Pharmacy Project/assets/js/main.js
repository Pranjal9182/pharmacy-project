

/*=============== SHOW MENU ===============*/
// const navMenu = document.getElementById('nav-menu'),
//   navToggle = document.getElementById('nav-toggle'),
//   navClose = document.getElementById('nav-close');

// /* Menu Show */
// if (navToggle) {
//   navToggle.addEventListener('click', () => {
//     navMenu.classList.add('show-menu')
//   })
// }



const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/*=============== SHOW MENU ===============*/
navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
});

/*=============== CLOSE MENU ===============*/
navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
});

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});
/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () => {
  const header = document.getElementById('header')
  this.scrollY >= 50 ? header.classList.add('scroll-header')
    : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', shadowHeader)




/*=============== SWIPER PRICES===============*/

const swiperPrices = new Swiper('.prices__swiper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 24,

  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up')
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
    : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)



/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollDown = window.scrollY
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      secttionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id'),
      sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionClass.classList.add('active-link')
    }
    else {
      sectionClass.classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)



/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-fill'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-fil' : 'ri-sun-fill'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-fil' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})

const sr= ScrollReveal({
  origin:'top',
  distance:'60px',
  duration:2000,
  reset:true,
  // Animation repeat
})
sr.reveal(`.home__content`,{origin:'bottom'})
sr.reveal(`.home__info`,{origin:'bottom',delay:800})
sr.reveal(`.home__data`,{delay:1400})
sr.reveal(`.home__button`,{origin:'left',delay:1800})

sr.reveal(`.delivery__data`,{origin:'right'})
sr.reveal(`.delivery__content`,{origin:'left',delay:600})
sr.reveal(`.delivery__img`,{delay:1200})

sr.reveal(`.about__data,contact__map`,{origin:'left'})
sr.reveal(`.about__img,contact__data`,{origin:'right'})

sr.reveal(`.prices__box`)
sr.reveal(`.prices__swiper`,{origin:'bottom',delay:600})

sr.reveal(`.gallery__image`,{interval:100})
sr.reveal(`.footer__container`)