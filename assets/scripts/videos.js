import videos from './videos-data.js';
import setSectionBackgroundEffects from './effects.js';

function createAnchorName(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '-');
}



//modal
const modalElement = document.querySelector('#videoModal');
const videoIframe = modalElement.querySelector('#videoIframe');
const modal = new bootstrap.Modal(modalElement, {});
modalElement.addEventListener('hidden.bs.modal', () => {
  videoIframe.src = '';
});

function openVideoModal(videoLink) {
  videoIframe.src = videoLink;
  modal.show();
}

window.playCarousel = function () {
  const item = document.querySelector('.carousel-item.active');
  if (item) {
    openVideoModal(item.dataset.link);
  }
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

function renderCarousel(categoryInfo) {
  let isFirst = true;
  let items = "";
  let indicators = "";
  let counter = 0;
  for(let videoInfo of categoryInfo.videos) {
    indicators += `
    <button type="button" data-bs-target="#carousel" data-bs-slide-to="${counter}" class="${isFirst ? 'active' : ''}" aria-current="${isFirst ? 'true' : ''}" aria-label="Slide ${counter + 1}"></button>
    `;

    items += `
    <div 
      class="carousel-item h-100 ${isFirst ? 'active' : ''}" 
      data-link="${videoInfo.link}"
      style="background-image: url(${videoInfo.image.replace('mqdefault.jpg','maxresdefault.jpg')});"
    >
    </div>
    `;

    isFirst = false;
    ++counter;
  }

  document.querySelector('.carousel-indicators').innerHTML = indicators;
  document.querySelector('.carousel-inner').innerHTML = items;
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

  videoCardElement.querySelector('img').src = videoInfo.image;
  videoCardElement.querySelector('.video-title').textContent = videoInfo.title;

  videoCardElement.querySelector('.card-body').onclick = () => openVideoModal(videoInfo.link);

  parentElement.appendChild(videoCardElement);
}

for (let categoryInfo of videos) {
  renderNavItem(categoryInfo.category);
  renderVideoCategory(categoryInfo);
}
renderCarousel(videos[0]);

setSectionBackgroundEffects();
