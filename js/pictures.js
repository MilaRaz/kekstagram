'use strict';

var PHOTOS_COUNT = 25;
var pictures = [];
var PHOTOS_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
var PictureTemplate = document.querySelector('#picture-template').content;
document.querySelector('.gallery-overlay').classList.remove('hidden');
var GalleryOverlayPreview = document.querySelector('.gallery-overlay-preview');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};  
var generatePictures = function () {
  for (var i = 1; i <= PHOTOS_COUNT; i++) {
    pictures[i] =
    {
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: getRandomNumber(0, PHOTOS_COMMENTS.length)
    };
}
};
generatePictures();

var renderPicture = function (photo) {
  var pictureElement = PictureTemplate.cloneNode(true);
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
  GalleryOverlayPreview.appendChild(fragment);
};
renderAllPictures();

GalleryOverlayPreview.querySelector('.gallery-overlay-image ').src = pictures[1].url;
GalleryOverlayPreview.querySelector('.likes-count').textContent = pictures[1].likes;
GalleryOverlayPreview.querySelector('.comments-count').textContent = pictures[1].comments;

