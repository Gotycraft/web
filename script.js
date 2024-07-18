async function fetchModData(modId) {
  try {
    const response = await fetch(`https://api.modrinth.com/v2/project/${modId}`);
    const modData = await response.json();
    return modData;
  } catch (error) {
    console.error('Error fetching mod data:', error);
  }
}

function displayMod(modData) {
  const modList = document.getElementById('mod-list');
  const modItem = document.createElement('div');
  modItem.className = 'mod-item';

  // Create a content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'mod-content';

  const modBanner = document.createElement('img');
  modBanner.src = modData.gallery[0]?.url || 'default-banner-url';
  modBanner.alt = 'Mod Banner';
  modBanner.className = 'mod-banner';

  const modLogo = document.createElement('img');
  modLogo.src = modData.icon_url || 'default-logo-url';
  modLogo.alt = 'Mod Logo';
  modLogo.className = 'mod-logo';

  const modTitle = document.createElement('h2');
  modTitle.textContent = modData.title || modData.name;
  modTitle.className = 'mod-title';

  const modDescription = document.createElement('p');
  modDescription.textContent = modData.description || 'No description available.';
  modDescription.className = 'mod-description';

  const modLink = document.createElement('a');
  modLink.href = modData.source_url || modData.url;
  modLink.innerHTML = '<span class="material-symbols-outlined">link</span> Visit Mod Site';
  modLink.className = 'mod-link';

  contentWrapper.appendChild(modTitle);
  contentWrapper.appendChild(modDescription);

  modItem.appendChild(modBanner);
  modItem.appendChild(modLogo);
  modItem.appendChild(contentWrapper);
  modItem.appendChild(modLink);

  modList.appendChild(modItem);
}

async function loadMods(modIds) {
  for (const modId of modIds) {
    const modData = await fetchModData(modId);
    if (modData) {
      displayMod(modData);
    }
  }
}

// Example Modrinth Mod IDs
const modIds = ['3ufwT9JF', 'MI1LWe93', 'HQsBdHGd', 'MCnBYP0b', 'LNytGWDc', 'ZzjhlDgM', 'F8BQNPWX', 'U6GY0xp0'];

// Function to handle mod search
function searchMods() {
  const searchQuery = this.value.toLowerCase();
  const modItems = document.querySelectorAll('.mod-item');
  
  modItems.forEach(modItem => {
    const modTitle = modItem.querySelector('h2').textContent.toLowerCase();
    const modDescription = modItem.querySelector('p').textContent.toLowerCase();
    
    if (modTitle.includes(searchQuery) || modDescription.includes(searchQuery)) {
      modItem.style.display = 'block';
    } else {
      modItem.style.display = 'none';
    }
  });
}

// Initialize the page
window.onload = function() {
  loadMods(modIds);
  
  // Set up search functionality
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', searchMods);
};

document.addEventListener('DOMContentLoaded', function() {
    const bannerCarousel = document.querySelector('.banner-carousel');
    const bannerImages = document.querySelectorAll('.banner-image');
    const prevButton = document.querySelector('.banner-nav.prev');
    const nextButton = document.querySelector('.banner-nav.next');
    let currentIndex = 0;

    function showImage(index) {
        bannerCarousel.style.transform = `translateX(-${index * 33.333}%)`;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % bannerImages.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + bannerImages.length) % bannerImages.length;
        showImage(currentIndex);
    }

    nextButton.addEventListener('click', nextImage);
    prevButton.addEventListener('click', prevImage);

    // Auto-rotate every 5 seconds
    setInterval(nextImage, 5000000);
});