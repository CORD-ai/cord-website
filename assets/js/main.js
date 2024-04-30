/**
 * Template Name: Ninestars - v4.8.0
 * Template URL: https://bootstrapmade.com/ninestars-free-bootstrap-3-theme-for-creative/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */



(function ()
{
  
  "use strict";
  
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Clients Slider
   */
  new Swiper(".clients-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120,
      },
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();

// smooth color animation
const floatingText = document.getElementById("floatingText");

function updateGradient() {
  const time = Date.now() / 1000;
  const color1 = `#${Math.round((Math.sin(time) + 1) * 127.5).toString(
    16
  )}25f3`;
  const color2 = `#${Math.round(
    (Math.sin(time + Math.PI / 2) + 1) * 127.5
  ).toString(16)}a8f5`;
  const color3 = `#0015${Math.round(
    (Math.sin(time + Math.PI) + 1) * 127.5
  ).toString(16)}`;
  floatingText.style.backgroundImage = `linear-gradient(to right, ${color1}, ${color2}, ${color3})`;
  requestAnimationFrame(updateGradient);
}
//===============================Mentors===============================================
const mentorsList = [
   {img:'assets/img/research_advisors/3.jpeg',
    MemberName: "Ashish Vashist",
    Position: "Research Intern @ CMU",
    ResearchInterests: "Computer Vision",
    PortfolioLink: "https://www.linkedin.com/in/ashish-vashist-8a183320a/"
  },
  {img:'assets/img/research_advisors/3.jpeg',
    MemberName: "GM Harshvardhan",
    Position: "MS @ Boston University",
    ResearchInterests: "Computer Vision",
    PortfolioLink: "https://www.linkedin.com/in/gm-harshvardhan/"
  },
  {img:'assets/img/research_advisors/3.jpeg',
    MemberName: "Bharat Raghunathan",
    Position: "MS @ Georgia Tech",
    ResearchInterests: "NLP",
    PortfolioLink: "https://www.linkedin.com/in/bharat-raghunathan/"
  },
  {img:'assets/img/research_advisors/3.jpeg',
    MemberName: "Sohil Sharma",
    Position: "Engineer @ Ericsson",
    ResearchInterests: "Computer Vision",
    PortfolioLink: "https://www.github.com/sohilsharma1996"
  },
  {img:'assets/img/research_advisors/3.jpeg',
    MemberName: "Ayush Agarwal",
    Position: "Mtech IIITD",
    ResearchInterests: "NLP",
    PortfolioLink: "https://www.linkedin.com/in/ayush-agarwal-33b219163/"
  },
  {img:'assets/img/research_advisors/3.jpeg',
    MemberName: "Vinayak Tiwari",
    Position: "Senior-SDE(AI and data science) @ GreyOrange",
    ResearchInterests: "NLP",
    PortfolioLink: "https://www.linkedin.com/in/vinayak-tiwari-3ab777145/"
  },
  {img:'assets/img/research_advisors/3.jpeg',
    MemberName: "Guneet Singh Kohli",
    Position: "AI Scientist@ GreyOrange , prev CERN",
    ResearchInterests: "NLP",
    PortfolioLink: "https://guneetsk99.github.io/"
  },
  {img:'assets/img/research_advisors/3.jpeg',
    MemberName: "Balaji Varatharajan",
    Position: "Research Engineer @ Siemens",
    ResearchInterests: "Reinforcement Learning",
    PortfolioLink: "https://www.linkedin.com/in/balaji-ai/"
  },
  {img:'assets/img/research_advisors/3.jpeg',
    MemberName: "Nikunj Bansal",
    Position: "AI researcher, Ex data scientist @ Cognizent",
    ResearchInterests: "Computer Vision",
    PortfolioLink: "https://nikunjbansal99.me/"
  },
  {img:'assets/img/research_advisors/3.jpeg',
    MemberName: "Anindyadeep Sannigrahi",
    Position: "Data Sc engg intern @Corridor Platforms",
    ResearchInterests: "NLP, Graph ML",
    PortfolioLink: "https://www.linkedin.com/in/anindyadeep-sannigrahi-38683b1b6/"
  },
 
];



// console.log(members);
//================================Research Advisors members=========================================
const researchMembers = [
  {img:'assets/img/research_advisors/1.jpeg',
    member_name: "Aseem Srivastava",
    Position: "PhD @ IIITD",
    research_Interests: "NLP",
    portfolio_link:"https://as3eem.github.io/"
  },
    {img:'assets/img/research_advisors/2.png',
    member_name: "Lalithkumar Seenivasan",
    Position: "PhD @ NUS",
    research_Interests: "Medical AI, vision-language models, NLP",
    portfolio_link:"https://lalithjets.github.io/"
  },
     {img:'assets/img/research_advisors/3.jpeg',
    member_name: "Shaily Bhatt",
    Position: "PhD @ CMU LTI, prev Google research, MSFT",
    research_Interests: "NLP",
    portfolio_link:"https://sites.google.com/view/shailybhatt"
  },
      {img:'assets/img/research_advisors/4.jpg',
    member_name: "Vipul Gupta",
    Position: "PhD @ Penn State University",
    research_Interests: "NLP, Responsible AI",
    portfolio_link:"https://vipulgupta1011.github.io/"
  },
       {img:'assets/img/research_advisors/6.png',
    member_name: "Sarthak Kumar Maharana",
    Position: "PhD @ UT Dallas, prev MS EE @ USC",
    research_Interests: "Computer Vision, Speech Processing",
    portfolio_link:"https://sarthaxxxxx.github.io/"
  },
        {img:'assets/img/research_advisors/5.png',
    member_name: "Yash Bhalgat",
    Position: "PhD @ Oxford",
    research_Interests: "	Computer Vision",
    portfolio_link:"https://yashbhalgat.github.io/"
  },
         {img:'assets/img/research_advisors/7.jpeg',
    member_name: "Shushrruth Sai Srinivasan",
    Position: "PhD @ UCI",
    research_Interests: "Computational Biology",
    portfolio_link:"https://www.linkedin.com/in/shushrruth-sai/"
  },
          {img:'assets/img/research_advisors/8.png',
    member_name: "Harvineet Singh",
    Position: "Postdoc @ UCSF, prev PhD @ NYU, MSFT, Amazon, Adobe",
    research_Interests: "Causal inference, Healthcare, Responsible ML",
    portfolio_link:"https://harvineet.github.io/"
  },
     {img:'assets/img/research_advisors/9.jpeg',
    member_name: "Rukhshanda Hussain",
    Position: "PhD @ UCF",
    research_Interests: "Deep Learning",
    portfolio_link:"https://www.linkedin.com/in/rukhshanda-hussain-686b061a0/"
  },
      {img:'assets/img/research_advisors/10.png',
    member_name: "Nandini Saini",
    Position: "PhD @ IITJ",
    research_Interests: "Multimodal remote sensing analysis, trustworthy and explainable ai in remote sensing",
    portfolio_link:"https://sites.google.com/iitj.ac.in/nandinisaini/about?authuser=0"
  },
        {img:'assets/img/research_advisors/11.jpeg',
    member_name: "Yash Singhal",
    Position: "PhD @ IITR",
    research_Interests: "NLP",
    portfolio_link:"https://www.linkedin.com/in/yashsinghaldev/"
  },
             {img:'assets/img/research_advisors/12.jpeg',
    member_name: "Ashutosh Pandey",
    Position: "PhD @ DTU",
    research_Interests: "NLP",
    portfolio_link:"https://www.linkedin.com/in/ashutosh-pandey-8010242642/"
  },
                  {img:'assets/img/research_advisors/13.jpeg',
    member_name: "Santosh Yadav",
    Position: "Senior AI Scientist, CeADAR, Dublin",
    research_Interests: "Computer Vision , Multimodality",
    portfolio_link:"https://www.dr-santosh-yadav.com/home"
  },

        
]

const researchTeam = document.getElementById('research_advisors')
const teamContainer = document.querySelector('.team_container')
const communityContainer = document.querySelector('.community_container')
const profileContainer = document.querySelector('#profile-container')
const allTeam = document.querySelector('.team_all')
const mentors = document.getElementById('mentor-section')
// console.log(researchTeam);
const teamNavbarElements = document.querySelectorAll("#portfolio-flters li")
// console.log(teamNavbarElements);
// researchTeam.addEventListener("click", function () {
//   teamContainer.style.display = 'none'
//   profileContainer.style.display = 'flex'
//   communityContainer.style.display="none"
//   // console.log("clicked");
//   animation()
//   researchMembers.forEach((member) => {
//     generateProfileCard(member)
    
//   })

// })
// mentors.addEventListener("click", function () {
//   // teamContainer.style.display = 'none'
//   // profileContainer.style.display = 'none'
//   // communityContainer.style.display="none"

  
// })
// allTeam.addEventListener('click', function () {
//   teamContainer.style.display = 'flex'
//   profileContainer.style.display = 'none'
//   communityContainer.style.display = "flex"
  
// })
// console.log(teamNavbarElements);

//====================================TEAM NAVBAR===========================================
teamNavbarElements.forEach((team) => {
  team.addEventListener("click", function (e) {
    if (e.target.value === 0) {
        teamContainer.style.display = 'flex'
        profileContainer.style.display = 'none'
      communityContainer.style.display = "flex"
            mentors.style.display = 'none';
    }
    if (e.target.value === 1) {
      teamContainer.style.display = 'none'
  profileContainer.style.display = 'flex'
  communityContainer.style.display="none"
  // console.log("clicked");
  animation()
  researchMembers.forEach((member) => {
    generateProfileCard(member)
    
  })
    }
     if (e.target.value === 2) {
      mentorsList.forEach((mentor) => {
    console.log(mentor,"inside mentorlist event");
    generateMembersCard(mentor)
        mentors.style.display = 'flex';
        teamContainer.style.display = 'none'
        profileContainer.style.display = 'none'
        communityContainer.style.display = "none"
  })
    }
  
    // console.log("inside teamNavbar event", e.target.value);
  })
})
//==============================================================
function generateMembersCard(mentor) {
    // Create the card element
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-5" , "col-sm-12", "card_container"); // Bootstrap grid classes
    // Create the card content using Bootstrap card component
  card.innerHTML = `
    
<div class="card m-3" style="width: 22.5rem;color:black">
  <img class="card-img-top" src="${mentor.img}" alt="${mentor.img}">
  <div class="card-body">
         <h5 class="card-title">${mentor.MemberName}</h5>
                      <p class="card-text font-weight-normal">Position: ${mentor.Position}</p>
                        <p class="card-text font-weight-normal">Research Interests: ${mentor.ResearchInterests}</p>
  </div>
</div>

      
    `;
console.log(card.innerHTML);
    // Append the card to the document
    document.querySelector('#mentor-section').appendChild(card);
}

                  
                  //===================================================================
 function generateProfileCard(member) {
    // Create the card element
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "col-sm-12", "card_container"); // Bootstrap grid classes

    // Create the card content using Bootstrap card component
    card.innerHTML = `
        <div class="card col-xs-mx-4 bg-dark m-2 new_card" style="height:95%;">
            <a href="${member.portfolio_link}" target="_blank">
                <img class="card-img-top col-xs-mx-4 new_card_img " src="${member.img}" alt="${member.member_name} image">
            </a>
            <div class="card-body">
            <h5 class="card-title">${member.member_name}</h5>
            <p class="card-text font-weight-normal">Position: ${member.Position}</p>
            <p class="card-text font-weight-normal">Research Interests: ${member.research_Interests}</p>
            </div>
            </div>
            `;
            
            // Append the card to the profile container
            document.getElementById("profile-container").appendChild(card);
            console.log(card);
          }
          
          // const cards  = generateProfileCard(member)
  // Call the function to generate the profile card

//js animation loading
// Start the animation
function animation() {
  
var opacity = 0;
var intervalId = setInterval(function() {
    opacity += 0.01; // Increase opacity gradually
    profileContainer.style.opacity = opacity;

    // Stop the animation when opacity reaches 1
    if (opacity >= 1) {
        clearInterval(intervalId);
    }
}, 10); 
}





// let num = 1
// researchMembers.forEach((user) => {
//   console.log(user, num);
// num++
// })
updateGradient();
