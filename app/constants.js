// Think of this file responsible for all dynamic data rendering in the page

// App text variables
const appTextVariables = {
  appName: "CLICK FIT",
  navigationLinks: [
    { name: "Home", link: "#" },
    { name: "Cool Features", link: "#" },
    { name: "Very Cool Features", link: "#" },
  ],
  hero: {
    title: "Healthy Body, Healthy Life!",
    subtitle: "This website does nothing - honestly.",
    primaryBtnText: "Get Started",
    get description() {
      return `${this.subtitle} Trust issues? Click on the ${this.primaryBtnText} button.`;
    },
  },
  trending: {
    title: "So Called Trending",
    subtitle: "Follow these trending steps to become a fitness freak",
    trendingItems: [
      {
        title: "Personalized Workouts",
        description: "Custom workout plans tailored to your goals.",
      },
      {
        title: "Nutrition Plans",
        description: "Expert-designed meal plans to fuel your body right.",
      },
      {
        title: "Progress Tracking",
        description: "Track your progress and stay motivated.",
      },
    ],
  },
  funFact: {
    title: "A fun fact to lift your mood",
  },
  uploadImage: {
    title: "Share Your Progress",
    subtitle: "Upload your transformation photos to inspire others",
    dragAndDrop: "Drag & Drop Your Images Here",
    imageText: "or click to browse images",
    btnText: "Upload Images",
  },
  footer: {
    linksTitle: "Dummy Links",
  },
};

// API endpoints
const apiEndpoints = {
  numbersAPI: "http://numbersapi.com/1/30/date?json",
  upload: "http://localhost:5000/upload",
};

// Alert messages
const alertMessages = {
  navigationMsg:
    "Ugh! I wish if we could proceed to the next page but only the home page is functional as of now.",
  heroBtnMsg: "I told you :)",
  uploadSuccess: "Images uploaded successfully!",
  uploadError: "Error uploading images. Please try again.",
};

// Wrap in IIFE to make the variables available globally using AppConfig object
(function () {
  window.AppConfig = {
    APP_TEXT_VARIABLES: appTextVariables,
    API_ENDPOINTS: apiEndpoints,
    ALERT_MESSAGES: alertMessages,
  };
})();
