document.addEventListener('DOMContentLoaded', function () {
  const revealElements = document.querySelectorAll('.reveal');
  const mainContent = document.querySelector('#main-content');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);

  // Wait for all Vega charts to load before displaying the page
  const vegaSpecs = [
    "map_final.json",
    "Foglalkoztatottsag.json",
    "Gender.json",
    "Family history-treatment.json",
    "days indoor-stress.json",
    "cange habits-WEinterest.json"
  ];

  let vegaPromises = vegaSpecs.map((spec, index) => {
    return vegaEmbed(`#Location${index + 1}`, spec);
  });

  Promise.all(vegaPromises).then(() => {
    document.getElementById('loading-indicator').style.display = 'none'; // Hide loading indicator
    mainContent.style.visibility = 'visible'; // Show main content
    revealOnScroll(); // Ensure initial reveal state is set
  });

  mainContent.style.visibility = 'hidden'; // Hide main content initially
});
