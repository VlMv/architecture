const Z_CHANGE_SPEED_MULTIPLIER = -5;
const Z_DEPTH_DISTANCE = -1000;
const OPACITY_TOOGLE_DISTACE = Math.abs(Z_DEPTH_DISTANCE) / 1.8;
const PORTFOLIO_GALARY_VISIBILITY_RANGE = Z_DEPTH_DISTANCE * 6.5;
const FRAME_VISIBILITY_RANGE = Z_DEPTH_DISTANCE * 6;
const BEYOND_SCREEN_VISIBILITY_RANGE = Math.abs(Z_DEPTH_DISTANCE) * 3;

const main = document.querySelector('main');
const loader = document.querySelector('.loader');
const bodyPage = document.querySelector('body');
const navLinks = document.querySelectorAll('.main-nav__item > a');

const logoSpan = document.querySelector('.logo__span');
const mainNav = document.querySelector('.main-nav');
const menuButton = document.querySelector('.menu-button');
const pageFooter = document.querySelector('.page-footer');
const portfolioGalleryList = document.querySelector('.portfolio-list');

let frames = document.querySelectorAll('.frame-box');
let portfolioFrameIndex = frames.length - 1;
let portfolioFrame = frames[portfolioFrameIndex];

let zDistances = [];
let lastScrollPosition = 0;


function setBodyHeight() {
   const viewportHeight = window.innerHeight;
   // "+ высота viewport" зафиксировать последний фрейм на z~0px, "+ 1" костыль draggable для мобильных устройств
   const bodyHeight = (frames.length * Z_DEPTH_DISTANCE / Z_CHANGE_SPEED_MULTIPLIER) + viewportHeight + 1;

   bodyPage.style.setProperty('--z-depth', `${bodyHeight}px`);
}

function setFramePortrait() {
   const mediaQueryTablet = window.matchMedia('(max-width: 768px)');
   const mediaQueryPortrait = window.matchMedia('(orientation: portrait)');

   if (mediaQueryTablet.matches && mediaQueryPortrait.matches) {
      const framePortraits = document.querySelectorAll('.frame-box_portrait');

      framePortraits.forEach((framePortrait) => framePortrait.classList.add('frame-box'));

      frames = document.querySelectorAll('.frame-box');
      portfolioFrameIndex = frames.length - 1;
      portfolioFrame = frames[portfolioFrameIndex];
   }
}

function setFrames() {
   setFramePortrait();
   setBodyHeight();

   for (let i = 0; i < frames.length; i++) {
      zDistances.push(i * Z_DEPTH_DISTANCE);
   }

   // последний элемент стоит дальше, чтоб предыдущий не перекрывал интерактив draggable в portfolio-gallery
   zDistances[portfolioFrameIndex] += Z_DEPTH_DISTANCE;

   Draggable.create(portfolioGalleryList, {
      bounds: document.querySelector('.frame-box:last-of-type'),
      allowNativeTouchScrolling: true,
      allowEventDefault: true
   });
}

function removeLoader() {
   // запуск scroll логики
   window.scrollTo(0, 1);
   window.scrollTo(0, 0);

   setTimeout(() => {
      loader.style.display = 'none';
      main.style.opacity = 1;
   }, 1000);
}

window.addEventListener('load', setFrames, { once: true });
window.addEventListener('load', removeLoader, { once: true });
window.addEventListener('resize', setBodyHeight);


function runScrollLogic() {
   let scrollTop = document.documentElement.scrollTop;
   let positionsDelta = lastScrollPosition - scrollTop;
   lastScrollPosition = scrollTop;

   frames.forEach((frame, i) => {
      let translateZ = zDistances[i] += positionsDelta * Z_CHANGE_SPEED_MULTIPLIER;

      const isMaskedScreenFrame = i === frames.length - 2;
      const isPortfolioFrame = i === portfolioFrameIndex;
      const isMaskedImageFrame = frame.hasAttribute('data-masked-image');
      const isMaskRunRange = translateZ >= Z_DEPTH_DISTANCE;
      const isTextInVisibleRange = translateZ >= 0;
      const isPortfolioFrameInVisibleRange = zDistances[portfolioFrameIndex] >= PORTFOLIO_GALARY_VISIBILITY_RANGE;
      const isFrameInVisibleRange = translateZ >= FRAME_VISIBILITY_RANGE;
      const isFrameInBeyondScreenRange = translateZ <= BEYOND_SCREEN_VISIBILITY_RANGE;

      const opacity = (translateZ < OPACITY_TOOGLE_DISTACE && isFrameInVisibleRange) ? 1 : 0;

      frame.style.opacity = !isMaskedScreenFrame ? opacity : 1;

      if (
         isFrameInVisibleRange
         && isFrameInBeyondScreenRange
         || isPortfolioFrameInVisibleRange
      ) {
         frame.style.transform = `translateZ(${translateZ}px)`;
      } else if (!isFrameInBeyondScreenRange) {
         frame.style.transform = `translateZ(${BEYOND_SCREEN_VISIBILITY_RANGE}px)`;
      } else if (isPortfolioFrame && !isPortfolioFrameInVisibleRange) {
         portfolioFrame.style.opacity = 0;
         frame.style.transform = `translateZ(${PORTFOLIO_GALARY_VISIBILITY_RANGE}px)`;
      } else {
         frame.style.transform = `translateZ(${FRAME_VISIBILITY_RANGE}px)`;
      }

      if (isMaskedImageFrame && isMaskRunRange) frame.classList.add('frame-box_mask-active');

      if (portfolioFrame && isTextInVisibleRange) portfolioFrame.style.setProperty('--_text-opacity', 1);
   });
}

window.addEventListener('scroll', runScrollLogic);


const navScrollData = {
   dataSectionNames: [
      'data-portfolio-works',
      'data-about',
      'data-team',
      'data-concepts',
      'data-portfolio-gallery',
   ],

   scrollToFrame(navLink) {
      for (const sectionName of this.dataSectionNames) {
         if (navLink.hasAttribute(sectionName)) {
            window.scrollTo(0, this.getTopScrollHeight(sectionName));
         }
      }
   },

   getTopScrollHeight(dataName) {
      for (let i = 0; i < frames.length; i++) {
         const isTheLastFrame = i === portfolioFrameIndex;

         if (frames[i].hasAttribute(dataName)) {
            let topScrollHeight = i * Math.abs(Z_DEPTH_DISTANCE) / Math.abs(Z_CHANGE_SPEED_MULTIPLIER);
            return (
               isTheLastFrame
                  ? topScrollHeight += Math.abs(Z_DEPTH_DISTANCE)
                  : topScrollHeight
            );
         }
      }
   },
};

navLinks.forEach((navLink) => {
   navLink.addEventListener('click', () => navScrollData.scrollToFrame(navLink))
});


const menuButtonActive = {
   '--_clr-active': 'var(--clr-bg-dark)',
   '--_shadow-offest-active': 0,
   '--_top-position-active': '50%',
   '--before-rotate-angle': '225deg',
   '--after-rotate-angle': '315deg',

   setActiveProperties(element) {
      for (let key in this) {
         element.style.setProperty(key, this[key]);
      }
   },
};

function toogleMenuButton(evt) {
   const isMenuNotActive = !logoSpan.classList.contains('logo__span_active');

   if (isMenuNotActive) {
      logoSpan.classList.toggle('logo__span_active');
      pageFooter.style.setProperty('--footer-translateY-active', 0);
      mainNav.style.setProperty('--_nav-translateY-active', 0);
      menuButtonActive.setActiveProperties(evt.target);
   } else {
      logoSpan.classList.toggle('logo__span_active');
      pageFooter.removeAttribute('style');
      mainNav.removeAttribute('style');
      menuButton.removeAttribute('style');
   }
}

menuButton.addEventListener('click', toogleMenuButton);
