'use strict';

var PHOTOS_COUNT = 24;
var PHOTOS_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 0;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var pictureTemplate = document.querySelector('#picture-template').content;
var galleryOverlayPreview = document.querySelector('.gallery-overlay-preview');
var pictures_c = document.querySelector('.pictures');
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generatePictures = function () {
  var pictures = [];
    
  for (var i = 0; i <= PHOTOS_COUNT; i++) {
      
     var number= i + 1;
    pictures[i] =
    {
      url: 'photos/' + number+ '.jpg',
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getRandomNumber(MIN_COMMENTS, PHOTOS_COMMENTS.length)
    };
  
  }
  return pictures;
};
var pictures = generatePictures();

var renderPicture = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture img').src = photo.url;
  pictureElement.querySelector('.picture-likes').textContent = photo.likes;
  pictureElement.querySelector('.picture-comments').textContent = photo.comments;
  return pictureElement;
};

var renderAllPictures = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  pictures_c.appendChild(fragment);
};
renderAllPictures();

var renderFirstPicture = function (photo) {
  galleryOverlayPreview.querySelector('.gallery-overlay-image ').src = photo.url;
  galleryOverlayPreview.querySelector('.likes-count').textContent = photo.likes;
  galleryOverlayPreview.querySelector('.comments-count').textContent = photo.comments;
};


var picture = document.querySelector('.picture');
var galleryOpen = document.querySelector('.gallery-overlay');
var galleryClose = document.querySelector('.gallery-overlay-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
    
};
var openPopup = function () {
  document.addEventListener('keydown', onPopupEscPress);
    document.querySelector('.gallery-overlay').classList.remove('hidden');
};
var closePopup = function () {
    document.removeEventListener('keydown', onPopupEscPress);
document.querySelector('.gallery-overlay').classList.add('hidden');
    
};

picture.addEventListener('click', function () {
  openPopup();
});

picture.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

galleryClose.addEventListener('click', function () {
  closePopup();
});

galleryClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});


var photosElement = document.querySelectorAll('.picture');


 
photosElement.forEach(function (item, index) {
    
    
  var onItemClick = function (evt) {
      evt.preventDefault();
      openPopup();
    renderFirstPicture(pictures[index]);
  };

item.addEventListener('click', onItemClick);

});

