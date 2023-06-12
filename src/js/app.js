let main = document.querySelector('main');
let loader = document.querySelector('.loader');

document.onreadystatechange = function () {
   if (document.readyState === "complete") { // при загрузке страницы
      setTimeout(() => {
         window.scrollTo(0, 1); // запуск onscroll логики
         window.scrollTo(0, 0);
      }, 0);
      setTimeout(function () {
         loader.style.display = 'none';
         main.style.opacity = 1;
      }, 100)
   }
}


let frames = document.querySelectorAll('.frame-box');
const bodyPage = document.querySelector('body');

const zDepthDistance = -1000;
const zChangeSpeedMultiplier = -5; // множитель на прокрутку transform по оси Z по сравнению с прокруткой scroll в body (скорость z скролла)
let zDistancesArray = [];


let setBodyHeight = function () {
   let viewportHeight = window.innerHeight;
   let bodyHeight = (frames.length * zDepthDistance / zChangeSpeedMultiplier) + viewportHeight + 1; // "+ высота viewport" зафиксировать последний фрейм на z~0px, "+ 1" костыль draggable для мобильных устройств
   bodyPage.style.setProperty('--z-depth', bodyHeight + 'px');
}


window.onload = function () {
   for (let i = 0; i < frames.length; i++) {
      zDistancesArray.push(i * zDepthDistance);
   }
   zDistancesArray[frames.length - 1] -= 1000; // последний элемент стоит дальше, чтоб предыдущий не перекрывал интерактив draggable в portfolio-gallery

   setBodyHeight();

   const portfolioGalleryList = document.querySelector('.portfolio-list');
   const portfolioGalleryFrame = document.querySelector('.frame-box:last-of-type');
   Draggable.create(portfolioGalleryList, {
      bounds: portfolioGalleryFrame,
      inertia: true,
      allowNativeTouchScrolling: true,
      allowEventDefault: true
   })
}


window.onresize = function () {
   setBodyHeight();
}


let lastScrollPosition = 0;

window.onscroll = function () {
   let scrollTop = document.documentElement.scrollTop;
   let positionsDelta = lastScrollPosition - scrollTop;
   lastScrollPosition = scrollTop;

   frames.forEach(function (frame, i, frames) {
      let portfolioFrameIndex = frames.length - 1;
      let isNotPortfolioFrame = i !== frames.length - 1;
      let isNotMaskedScreenFrame = i !== frames.length - 2;

      zDistancesArray[i] += positionsDelta * zChangeSpeedMultiplier;

      let opacity = zDistancesArray[i] < Math.abs(zDepthDistance) / 1.8 ? 1 : 0;
      let zTransform = `translateZ(${zDistancesArray[i]}px)`;

      if (isNotPortfolioFrame && isNotMaskedScreenFrame) {
         frame.setAttribute('style', `transform: ${zTransform}; opacity: ${opacity};`);
      } else {
         frame.setAttribute('style', `transform: ${zTransform};`);
      }


      let isPortfolioFrame = i === frames.length - 1;
      let portfolioGalleryVisibleRange = zDistancesArray[portfolioFrameIndex] >= zDepthDistance * 6.5;
      let framesVisibleRange = zDistancesArray[i] >= zDepthDistance * 6;
      let frameBeyondScreenRange = zDistancesArray[i] <= Math.abs(zDepthDistance) * 3;

      if (isPortfolioFrame) {
         if (portfolioGalleryVisibleRange) {
            frame.classList.remove('hidden');
         } else {
            frame.classList.add('hidden');
         }
      } else {
         if (framesVisibleRange && frameBeyondScreenRange) {
            frame.classList.remove('hidden');
         } else {
            frame.classList.add('hidden');
         }
      }


      let isMaskedImageFrame = frame.hasAttribute('data-masked-image');
      let isMaskRunRange = zDistancesArray[i] >= zDepthDistance * 0.7;
      if (isMaskedImageFrame && isMaskRunRange) {
         frame.classList.add('frame-box_mask-active');
      }
   });
}


const navLinks = document.querySelectorAll('.main-nav__item > a');
let navScrollData = {
   dataNames: ["data-portfolio-works", "data-about", "data-team", "data-concepts", "data-portfolio-gallery"],

   scrollToFrame: function (navLink) {
      for (let i = 0; i < this.dataNames.length; i++) {
         if (navLink.hasAttribute(this.dataNames[i])) {
            window.scrollTo(0, this.getTopScrollHeight(this.dataNames[i]));
         }
      }
   },

   getTopScrollHeight: function (DataName) {
      for (let i = 0; i < frames.length; i++) {
         let isTheLastFrame = i === frames.length - 1;

         if (frames[i].hasAttribute(DataName)) {
            let topScrollHeight = i * Math.abs(zDepthDistance) / Math.abs(zChangeSpeedMultiplier);

            if (isTheLastFrame) {
               return topScrollHeight += Math.abs(zDepthDistance) // потому что расстояние между последним и предпоследним фреймом больше на значение zDepthDistance
            }
            return topScrollHeight
         }
      }
   }
};

navLinks.forEach(function (navLink) {
   navLink.onclick = function () {
      navScrollData.scrollToFrame(navLink);
   }
});


const logoSpan = document.querySelector('.logo__span');
const mainNav = document.querySelector('.main-nav');
const menuButton = document.querySelector('.menu-button');
const pageFooter = document.querySelector('.page-footer');

let menuButtonActiveProperties = {
   '--_clr-active': 'var(--clr-bg-dark)',
   '--_shadow-offest-active': 0,
   '--_top-position-active': '50%',
   '--before-rotate-angle': '225deg',
   '--after-rotate-angle': '315deg',

   setActiveProperties: function (element) {
      for (let key in this) {
         element.style.setProperty(key, this[key]);
      }
   }
};

menuButton.onclick = function () {
   let isMenuNotActive = !logoSpan.classList.contains('logo__span_active');

   if (isMenuNotActive) {
      logoSpan.classList.add('logo__span_active');
      pageFooter.style.setProperty('--footer-translateY-active', 0);
      mainNav.style.setProperty('--_nav-translateY-active', 0);
      menuButtonActiveProperties.setActiveProperties(menuButton);
   } else {
      logoSpan.classList.remove('logo__span_active');
      pageFooter.removeAttribute('style');
      mainNav.removeAttribute('style');
      menuButton.removeAttribute('style');
   }
};
