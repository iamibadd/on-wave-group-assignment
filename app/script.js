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
const { navigationMsg, heroBtnMsg, uploadSuccess, uploadError } =
  ALERT_MESSAGES;

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
  $("#copyright").text(footer.copyright);
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

let files = [];
const handleFiles = (files) => {
  previewContainer.innerHTML = "";
  if (files.length > 0) {
    uploadBtn.disabled = false;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = document.createElement("div");
        preview.className = "d-inline-block position-relative me-2 mb-2";
        preview.innerHTML = `
                      <img src="${e.target.result}" class="img-thumbnail" style="width: 100px; height: 100px; object-fit: cover;">
                      <button class="btn btn-sm btn-danger position-absolute top-0 end-0" onclick="removeImage(this)" data-index="${i}">
                          <i class="fas fa-times"></i>
                      </button>
                  `;
        previewContainer.appendChild(preview);
      };
      reader.readAsDataURL(file);
    }
  } else {
    uploadBtn.disabled = true;
  }
};

const handleImagesUpload = () => {
  // Image Upload Functionality
  const uploadArea = document.querySelector("#uploadArea");
  const fileInput = document.querySelector("#fileInput");
  const uploadBtn = document.querySelector("#uploadBtn");
  const previewContainer = document.querySelector("#previewContainer");
  const uploadStatus = document.querySelector("#uploadStatus");

  // Handle drag and drop
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");
    files = e.dataTransfer.files;
    handleFiles(files);
  });

  // Handle click to browse files
  uploadArea.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    files = fileInput.files;
    handleFiles(files);
  });

  // Handle file preview
  const handleFiles = (files) => {
    previewContainer.innerHTML = "";
    if (files.length > 0) {
      uploadBtn.disabled = false;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          const preview = document.createElement("div");
          preview.className = "d-inline-block position-relative me-2 mb-2";
          preview.innerHTML = `
                          <img src="${e.target.result}" class="img-thumbnail" style="width: 100px; height: 100px; object-fit: cover;">
                          <button class="btn btn-sm btn-danger position-absolute top-0 end-0" onclick="removeImage(this, event)" data-index="${i}">
                              <i class="fas fa-times"></i>
                          </button>
                      `;
          previewContainer.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    } else {
      uploadBtn.disabled = true;
    }
  };

  // Upload images
  uploadBtn.addEventListener("click", () => {
    if (files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    uploadStatus.innerHTML =
      '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    uploadBtn.disabled = true;

    $.ajax({
      url: "/upload",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: (response) => {
        uploadStatus.html(
          `<div class="alert alert-success">${uploadSuccess}</div>`
        );
        previewContainer.innerHTML = "";
        files = [];
        fileInput.value = "";
      },
      error: () => {
        uploadStatus.html(
          `<div class="alert alert-danger">${uploadError}</div>`
        );
        uploadStatus.innerHTML =
          '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
        uploadBtn.disabled = false;
      },
    });
  });
};

// Remove image from preview
const removeImage = (btn, event) => {
  event.stopPropagation();

  const index = btn.getAttribute("data-index");
  const newFiles = Array.from(files);
  newFiles.splice(index, 1);

  // Create new DataTransfer to update files
  const dataTransfer = new DataTransfer();
  newFiles.forEach((file) => dataTransfer.items.add(file));

  // Update file input
  fileInput.files = dataTransfer.files;
  files = fileInput.files;

  // Update preview
  handleFiles(files);
};

// On click events
const triggerPageAlert = () => alert(navigationMsg);

const heroBtnAlert = () => alert(heroBtnMsg);

$(document).ready(() => {
  document.title = appName;

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

  // Handle images upload
  handleImagesUpload();
});

// Make  functions available globally
window.triggerPageAlert = triggerPageAlert;
window.heroBtnAlert = heroBtnAlert;
