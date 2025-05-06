const { APP_TEXT_VARIABLES, API_ENDPOINTS, ALERT_MESSAGES } = window.AppConfig;

const {
  appName,
  hero,
  navigationLinks,
  trending,
  funFact,
  footer,
  uploadImage,
} = APP_TEXT_VARIABLES;
const { numbersAPI } = API_ENDPOINTS;
const { navigationMsg, heroBtnMsg } = ALERT_MESSAGES;

// Page loading functions
const loadTopNavigationSection = () => {
  const topNavbar = $("#navbarNavItems");
  topNavbar.empty();

  $.each(navigationLinks, function (index, item) {
    const navItem = `
      <li class="nav-item" id="navbarNavItem-${index}">
        <a class="nav-link" href="${item.link}" ${
      item.name !== "Home" ? 'onclick="triggerPageAlert(event)"' : ""
    }>
          ${item.name}
        </a>
      </li>
    `;
    topNavbar.append(navItem);
  });
};

const loadAllText = () => {
  $("#currentYear").text(new Date().getFullYear());
  $("#appTitle").text(appName);
  $("#heroTitle").text(hero.title);
  $("#heroSubtitle").text(hero.description);
  $("#getStartedBtn").text(hero.primaryBtnText);
  $("#footerAppTitle").text(appName);
  $("#footerSubtitle").text(hero.title);
};

const loadTrendingSection = () => {
  $("#trendingTitle").text(trending.title);
  $("#trendingSubtitle").text(trending.subtitle);
  const trendingContainer = $("#trendingItems");
  trendingContainer.empty();

  $.each(trending.trendingItems, function (index, item) {
    const card = `
        <div class="col-md-4">
          <div class="trending-card p-4 text-center">
            <h4 id="trending-item-${index}">${item.title}</h4>
            <p>${item.description}</p>
          </div>
        </div>
      `;
    trendingContainer.append(card);
  });
};

const loadFunFactSection = () => {
  $("#funFactTitle").text(funFact.title);
  $.ajax({
    url: numbersAPI,
    method: "GET",
    success: (data) => $("#funFact").text(data.text),
    error: () => $("#funFact").text("I was kidding haha"),
  });
};

const loadUploadImagesSection = () => {
  $("#uploadTitle").text(uploadImage.title);
  $("#uploadSubTitle").text(uploadImage.subtitle);
  $("#dragAndDrop").text(uploadImage.dragAndDrop);
  $("#imageText").text(uploadImage.imageText);
  $("#uploadBtn").text(uploadImage.btnText);
};

const loadFooterSectionLinks = () => {
  $("#footerLinksTitle").text(footer.linksTitle);
  const footerLinks = $("#footerLinks");
  footerLinks.empty();

  $.each(navigationLinks, function (index, item) {
    const navItem = `
          <li class="mb-2 link" id="footerLinks-${index}">
            <a class="text-white href="${item.link}" ${
      item.name !== "Home" ? 'onclick="triggerPageAlert(event)"' : ""
    }>
              ${item.name}
            </a>
          </li>
        `;
    footerLinks.append(navItem);
  });
};

// On click events
const triggerPageAlert = () => alert(navigationMsg);

const heroBtnAlert = () => alert(heroBtnMsg);

$(document).ready(() => {
  // Load top navigation
  loadTopNavigationSection();

  // Load all text variables dynamically
  loadAllText();

  // Load trending section
  loadTrendingSection();

  // Load fun fact
  loadFunFactSection();

  // Load upload images section
  loadUploadImagesSection();

  // Load footer links
  loadFooterSectionLinks();

  // Add trending cards animation on scroll
  $(window).scroll(() => {
    $(".trending-card").each((index, element) => {
      const cardPosition = $(element).offset().top;
      const scrollPosition = $(window).scrollTop() + $(window).height();

      if (scrollPosition > cardPosition) {
        $(element).addClass("animate__animated animate__fadeInUp");
      }
    });
  });
});

// Make  functions available globally
window.triggerPageAlert = triggerPageAlert;
window.heroBtnAlert = heroBtnAlert;
