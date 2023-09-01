import videos from './videos-data.js';
import setSectionBackgroundEffects from './effects.js';

function createAnchorName(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

//render functions

function renderNavItem(categoryName) {
  const navItemTemplate = document.querySelector('#template-nav-item');

  const navItem = navItemTemplate.content.cloneNode(true);
  const anchor = navItem.querySelector('a');
  anchor.textContent = categoryName;
  anchor.href = `#${createAnchorName(categoryName)}`;

  document.querySelector('#navbar-itens').appendChild(navItem);
}

function renderVideoCategory(categoryInfo) {
  const videoCategoryTemplate = document.querySelector('#template-video-category');
  const videoCategoryElement = videoCategoryTemplate.content.cloneNode(true);

  videoCategoryElement.querySelector('.category-name').textContent = categoryInfo.category;
  videoCategoryElement.querySelector('.link').name = createAnchorName(categoryInfo.category);

  const cardsContainer = videoCategoryElement.querySelector('.cards-container');
  for(let videoInfo of categoryInfo.videos) {
    renderVideoCard(cardsContainer, videoInfo);
  }

  document.querySelector('main').appendChild(videoCategoryElement);
}

function renderVideoCard(parentElement, videoInfo) {
  const videoCardTemplate = document.querySelector('#template-video-card');
  const videoCardElement = videoCardTemplate.content.cloneNode(true);

  videoCardElement.querySelector('img').src = videoInfo.image.replace('maxresdefault', 'mqdefault');
  videoCardElement.querySelector('.video-title').textContent = videoInfo.title;

  parentElement.appendChild(videoCardElement);
}

for (let categoryInfo of videos) {
  renderNavItem(categoryInfo.category);
  renderVideoCategory(categoryInfo);
}

setSectionBackgroundEffects();
