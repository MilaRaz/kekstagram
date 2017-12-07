'use strict';

var PHOTOS_COUNT = 25;
var PHOTOS_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var minLikes = 15;
var maxLikes = 200;
var minComments = 0;
var pictureTemplate = document.querySelector('#picture-template').content;
document.querySelector('.gallery-overlay').classList.remove('hidden');
var galleryOverlayPreview = document.querySelector('.gallery-overlay-preview');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generatePictures = function () {
  var pictures = [];
  for (var i = 1; i <= PHOTOS_COUNT; i++) {
    pictures[i] =
    {
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(minLikes, maxLikes),
      comments: getRandomNumber(minComments, PHOTOS_COMMENTS.length)
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
  for (var i = 1; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  galleryOverlayPreview.appendChild(fragment);
};
renderAllPictures();

var renderFirstPicture = function (photo) {
  galleryOverlayPreview.querySelector('.gallery-overlay-image ').src = photo.url;
  galleryOverlayPreview.querySelector('.likes-count').textContent = photo.likes;
  galleryOverlayPreview.querySelector('.comments-count').textContent = photo.comments;
};
renderFirstPicture(pictures[1]);
