let frames = document.querySelectorAll('.frame-box');
const bodyPage = document.querySelector('body');

const zDepthDistance = -1000;
const zChangeSpeedMultiplier = -5; // множитель на прокрутку transform по оси Z по сравнению с прокруткой scroll в body
let zDistancesArray = [];


let setBodyHeight = function () {
   let viewportHeight = window.innerHeight;
   let bodyHeight = (frames.length * zDepthDistance / zChangeSpeedMultiplier) + viewportHeight; // + высота viewport чтобы последний фрейм остановился на Z = 0 от экрана)
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
      allowNativeTouchScrolling: false,
      allowEventDefault: true
   })
}


window.onresize = function () {
   setBodyHeight();
}


// let maskedItem = document.querySelector('.colored-img');

let lastScrollPosition = 0;

window.onscroll = function () {
   let scrollTop = document.documentElement.scrollTop;
   let positionsDelta = lastScrollPosition - scrollTop;
   lastScrollPosition = scrollTop;

   frames.forEach(function (n, i, frames) {
      let frame = frames[i];
      const portfolioFrameIndex = frames.length - 1;
      const maskedScreenFrameIndex = frames.length - 2;

      zDistancesArray[i] += positionsDelta * zChangeSpeedMultiplier;

      let opacity = zDistancesArray[i] < Math.abs(zDepthDistance) / 1.8 ? 1 : 0;
      let zTransform = `translateZ(${zDistancesArray[i]}px)`;

      if (i !== maskedScreenFrameIndex && i !== portfolioFrameIndex) {
         frame.setAttribute('style', `transform: ${zTransform}; opacity: ${opacity};`);
      } else {
         frame.setAttribute('style', `transform: ${zTransform};`);
      }

      // if (frame.hasAttribute('data-masked-image') && (zDistancesArray[i] >= zDepthDistance * 1.5)) {
      //    maskedItem.classList.add('colored-img_masked');
      // }

      let SixFramesRange = zDistancesArray[i] >= zDepthDistance * 5;
      let frameDidNotPassScreen = zDistancesArray[i] <= Math.abs(zDepthDistance);
      let portfolioGalleryInSightRange = zDistancesArray[portfolioFrameIndex] >= zDepthDistance * 6.5;

      if (i === portfolioFrameIndex) {
         if (portfolioGalleryInSightRange) {
            frame.classList.remove('hidden');
         } else {
            frame.classList.add('hidden');
         }

      } else {
         if (SixFramesRange && frameDidNotPassScreen) {
            frame.classList.remove('hidden');
         } else {
            frame.classList.add('hidden');
         }
      }
   });
}

document.onreadystatechange = function () {
   // page fully load
   if (document.readyState === "complete") {
      setTimeout(() => {
         window.scrollTo(0, 1);
      }, 0);
      // setTimeout(function () {
      //    document.getElementById('loader').style.display = 'none';
      // }, 1000);
   }
}
