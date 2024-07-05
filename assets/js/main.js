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
// const floatingText = document.getElementById("floatingText");

// function updateGradient() {
//   const time = Date.now() / 1000;
//   const color1 = `#${Math.round((Math.sin(time) + 1) * 127.5).toString(
//     16
//   )}25f3`;
//   const color2 = `#${Math.round(
//     (Math.sin(time + Math.PI / 2) + 1) * 127.5
//   ).toString(16)}a8f5`;
//   const color3 = `#0015${Math.round(
//     (Math.sin(time + Math.PI) + 1) * 127.5
//   ).toString(16)}`;
//   floatingText.style.backgroundImage = `linear-gradient(to right, ${color1}, ${color2}, ${color3})`;
//   requestAnimationFrame(updateGradient);
// }


 
//===============================Mentors===============================================
const mentorsList = [
  //  {img:'assets/img/research_advisors/3.jpeg', 
  //   MemberName: "Ashish Vashist",
  //   Position: "Research Intern @ CMU",
  //   ResearchInterests: "Computer Vision",
  //   PortfolioLink: "https://www.linkedin.com/in/ashish-vashist-8a183320a/"
  // },
  {img:'assets/img/mentors/0.jpeg',
    MemberName: "GM Harshvardhan",
    Position: "MS @ Boston University",
    ResearchInterests: "Computer Vision",
    PortfolioLink: "https://www.linkedin.com/in/gm-harshvardhan/"
  },
  {img:'assets/img/mentors/1.jpeg',
    MemberName: "Bharat Raghunathan",
    Position: "MS @ Georgia Tech",
    ResearchInterests: "NLP",
    PortfolioLink: "https://www.linkedin.com/in/bharat-raghunathan/"
  },
  // {img:'assets/img/research_advisors/3.jpeg',
  //   MemberName: "Sohil Sharma",
  //   Position: "Engineer @ Ericsson",
  //   ResearchInterests: "Computer Vision",
  //   PortfolioLink: "https://www.github.com/sohilsharma1996"
  // },
  {img:'assets/img/mentors/2.jpg',
    MemberName: "Ayush Agarwal",
    Position: "Mtech IIITD",
    ResearchInterests: "NLP",
    PortfolioLink: "https://www.linkedin.com/in/ayush-agarwal-33b219163/"
  },
  {img:'assets/img/mentors/3.jpg',
    MemberName: "Vinayak Tiwari",
    Position: "Senior-SDE(AI and data science) @ GreyOrange",
    ResearchInterests: "NLP",
    PortfolioLink: "https://www.linkedin.com/in/vinayak-tiwari-3ab777145/"
  },
  // {img:'assets/img/research_advisors/3.jpeg',
  //   MemberName: "Guneet Singh Kohli",
  //   Position: "AI Scientist@ GreyOrange , prev CERN",
  //   ResearchInterests: "NLP",
  //   PortfolioLink: "https://guneetsk99.github.io/"
  // },
  {img:'assets/img/mentors/4.jpg',
    MemberName: "Balaji Varatharajan",
    Position: "Research Engineer @ Siemens",
    ResearchInterests: "Reinforcement Learning",
    PortfolioLink: "https://www.linkedin.com/in/balaji-ai/"
  },
  {img:'assets/img/mentors/5.jpg',
    MemberName: "Nikunj Bansal",
    Position: "AI researcher, Ex data scientist @ Cognizent",
    ResearchInterests: "Computer Vision",
    PortfolioLink: "https://nikunjbansal99.me/"
  },
  // {img:'assets/img/research_advisors/3.jpeg',
  //   MemberName: "Anindyadeep Sannigrahi",
  //   Position: "Data Sc engg intern @Corridor Platforms",
  //   ResearchInterests: "NLP, Graph ML",
  //   PortfolioLink: "https://www.linkedin.com/in/anindyadeep-sannigrahi-38683b1b6/"
  // },
 
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

/*=================================Other Members data==========================*/
const OtherMembersData = [
    {
        imgSrc: "assets/img/core_team/AneeshBose.jpg",
        portfolioLinks: {
            github: "https://github.com/AneeshBose",
            twitter: "https://twitter.com/bose_aneesh",
            linkedin: "https://www.linkedin.com/in/aneesh-bose-at-acm"
        },
        name: "Aneesh Bose",
        experience: "ML Engineer @ Microsoft. NLP @ CAIR, DRDO"
    },
    {
        imgSrc: "assets/img/core_team/SayanDebSarkar.jpg",
        portfolioLinks: {
            github: "https://github.com/sayands",
            twitter: "https://twitter.com/debsarkar_sayan",
            linkedin: "https://www.linkedin.com/in/sayands/"
        },
        name: "Sayan Deb Sarkar",
        experience: "MSc Computer Science @ ETH Zürich"
    },
    {
        imgSrc: "assets/img/core_team/shankar.jpeg",
        portfolioLinks: {
            github: "https://github.com/Shankaranarayanan89",
            twitter: "https://twitter.com/shankargopal89?t=2edy9kcrrLCrAFQ86FBRUg&s=09",
            linkedin: "https://www.linkedin.com/in/sankaranarayanan-gopalan-44ab0138"
        },
        name: "Shankaranarayanan Gopalan",
        experience: "Research scholar IIT Kharagpur"
    },
    {
        imgSrc: "assets/img/core_team/Nikunj.jpg",
        portfolioLinks: {
            github: "https://github.com/Nikunjbansal99",
            twitter: "https://twitter.com/Nikunjbansal991",
            linkedin: "https://www.linkedin.com/in/nikunjbansal99/"
        },
        name: "Nikunj Bansal",
        experience: "Data Scientist @ Cognizant, Researcher. Ex - MLOps @ Railofy"
    },
    {
        imgSrc: "assets/img/core_team/GM Harshvardhan .jpeg",
        portfolioLinks: {
            github: "https://github.com/GM-git-dotcom",
            linkedin: "https://www.linkedin.com/in/gm-harshvardhan"
        },
        name: "GM Harshvardhan",
        experience: "MSAI Grad @ Boston University"
    },
    {
        imgSrc: "assets/img/core_team/n_sarkar_1.png",
        portfolioLinks: {
            github: "https://github.com/nsbits",
            linkedin: "https://www.linkedin.com/in/nilansarkar"
        },
        name: "Nilanjan Sarkar",
        experience: "BITS Pilani Hyderabad, IIT Kanpur, Ex - Applied Scientist intern @Amazon"
    },
    {
        imgSrc: "assets/img/core_team/VyshnaviGutta.jpg",
        portfolioLinks: {
            github: "https://github.com/vyshnavigutta369",
            linkedin: "https://www.linkedin.com/in/vyshnavi-gutta-308bab21b/"
        },
        name: "Vyshnavi Gutta",
        experience: "MSCS @ gatech, Ex - Data scientist @ Jio"
    },
    {
        imgSrc: "assets/img/core_team/Adnan_Abbas.png",
        portfolioLinks: {
            linkedin: "https://www.linkedin.com/in/adnan-abbas-903b711a2/"
        },
        name: "Adnan Abbas",
        experience: "Researcher @MIT ,UG @ IIT KGP"
    },
    {
        imgSrc: "assets/img/core_team/SivaKumar.png",
        portfolioLinks: {
            github: "https://github.com/sivakumarlakkoju",
            twitter: "https://twitter.com/LakkojuSiva",
            linkedin: "https://www.linkedin.com/in/vsskl"
        },
        name: "Siva Kumar",
        experience: "MTech Computer Science @ ISI Kolkata"
    },
    {
        imgSrc: "assets/img/core_team/Balaji.jpeg",
        portfolioLinks: {
            github: "https://github.com/balajiai",
            twitter: "https://twitter.com/BalajiAI",
            linkedin: "https://www.linkedin.com/in/balaji-ai"
        },
        name: "Balaji Varatharajan",
        experience: "Final year undergrad, Deep Learning Intern at IIT KGP"
  },
     {
    imgSrc: "assets/img/managers/Anannya Mishra .jpeg",
    portfolioLinks: {
      github: "http://github.com/Anann99",
      twitter: "https://twitter.com/whodatAM",
      linkedin: "https://www.linkedin.com/in/anannya-mishra"
    },
    name: "Anannya Mishra",
    experience: "Junior Year Undergrad and Research Associate at NSUT, Delhi"
  },
  {
    imgSrc: "assets/img/managers/Atharva_Kulkarni_new.jpeg",
    portfolioLinks: {
      github: "https://github.com/mr-atharva-kulkarni/",
      twitter: "https://twitter.com/Atharvak311/",
      linkedin: "https://www.linkedin.com/in/mr-atharva-kulkarni/"
    },
    name: "Atharva Kulkarni",
    experience: "ML/NLP grad student at CMU LTI"
  },
  {
    imgSrc: "assets/img/managers/Ankit Gupta.jpeg",
    portfolioLinks: {
      github: "https://github.com/Numeric-blip",
      twitter: "https://twitter.com/SFDRUOS",
      linkedin: "https://www.linkedin.com/in/ankitg0812/"
    },
    name: "Ankit Gupta",
    experience: "MS ChemE grad at Columbia Engineering"
  },
  {
    imgSrc: "assets/img/managers/Nikunj_Pansari_new.jpeg",
    portfolioLinks: {
      github: "https://github.com/nikunjpansari",
      twitter: "https://twitter.com/Nikunj175",
      linkedin: "https://www.linkedin.com/in/nikunj-pansari-0b89b3128/"
    },
    name: "Nikunj Pansari",
    experience: "M.Tech Scholar, IIT Patna"
  },
  {
    imgSrc: "assets/img/managers/Sanya_Sinha_new.jpeg",
    portfolioLinks: {
      github: "https://github.com/ssanya942",
      linkedin: "https://www.linkedin.com/in/sanya-sinha-13aab1200/"
    },
    name: "Sanya Sinha",
    experience: "Research Intern @ UTAustin, Docs @ NumPy(Berkeley Institute for Data Science)"
  },
  {
    imgSrc: "assets/img/managers/Jaskaran_Singh_Chhabra_new.jpeg",
    portfolioLinks: {
      github: "https://github.com/Jaskaran2705",
      twitter: "https://twitter.com/jaskarxn",
      linkedin: "https://www.linkedin.com/in/jaskaran-singh-chhabra-3bba2521b/"
    },
    name: "Jaskaran Singh Chhabra",
    experience: "B.Tech (CSAI)- NSUT, Delhi"
  },
  {
    imgSrc: "assets/img/core_team/Aditya.jpg",
    portfolioLinks: {
      github: "https://github.com/AdityaKapoor74",
      twitter: "https://twitter.com/_AdityaKapoor_",
      linkedin: "https://www.linkedin.com/in/aditya-kapoor-446727152"
    },
    name: "Aditya Kapoor",
    experience: "Predoc @ TCS Research , RA @ Robocomp , GSoC Mentor @ Robocomp"
  }
];

// console.log(data.length);




const researchTeam = document.getElementById('research_advisors')
const teamContainer = document.querySelector('.team_container')
const communityContainer = document.querySelector('.community_container')
const profileContainer = document.querySelector('#profile-container')
const allTeam = document.querySelector('.team_all')
const mentors = document.getElementById('mentor-section')
// console.log(researchTeam);
const teamNavbarElements = document.querySelectorAll("#portfolio-flters li")
const otherMeberContainer = document.querySelector("#other-member-container")
let executeOnLoad = true;
let count = 0;
//====================================TEAM NAVBAR===========================================
teamNavbarElements.forEach((team) => {
  
  team.addEventListener("click", function (e) {
profileContainer.style.opacity='1'
    
        //window.onload event
    window.onload = function () {
    if (executeOnLoad) {
      // Your code here
  // Set the initial display for profileContainer and mentors
  profileContainer.style.display = 'flex';
  mentors.style.display = 'flex';
  teamContainer.style.display = 'flex';
  profileContainer.style.opacity='1'
  // Generate profile cards for research members and mentors
  researchMembers.forEach((member) => {
    generateProfileCard(member);
  });
  mentorsList.forEach((mentor) => {
    generateMembersCard(mentor);
  });
    }
  
};
    if (e.target.value === 0) {
      if (count > 0) {
        profileContainer.innerHTML = '';
        mentors.innerHTML = '';
        otherMeberContainer.innerHTML = ''
        }
        teamContainer.style.display = 'flex'
        profileContainer.style.display = 'none'
        communityContainer.style.display = "flex"
      mentors.style.display = 'none';
      //research members
      researchMembers.forEach((member) => {
        
           profileContainer.style.display = 'flex'
            generateProfileCard(member)
    
       })
         //mentors
      mentorsList.forEach((mentor) => {
    
                  mentors.style.display = 'flex';  

            generateMembersCard(mentor)
  })
        count++
    }
    //==============================================
    if (e.target.value === 1) {
          if (count > 1) {
        profileContainer.innerHTML = '';
        mentors.innerHTML = '';
        otherMeberContainer.innerHTML = ''
     
        }
      executeOnLoad = false;
      teamContainer.style.display = 'none'
  profileContainer.style.display = 'flex'
  communityContainer.style.display="none"
  // console.log("clicked");
  animation()
  researchMembers.forEach((member) => {
    generateProfileCard(member)
    
  })
      count++
    }
console.log(executeOnLoad);
    //=======================================================
    if (e.target.value === 2) {
          if (count > 1) {
        profileContainer.innerHTML = '';
        mentors.innerHTML = '';
        otherMeberContainer.innerHTML = ''
        
        }
      window.onload = null;
      mentorsList.forEach((mentor) => {
    console.log(mentor,"inside mentorlist event");
    mentors.style.display = 'flex';
    teamContainer.style.display = 'none'
    profileContainer.style.display = 'none'
        communityContainer.style.display = "none"
        otherMeberContainer.style.display='none'
    generateMembersCard(mentor)
      })
      count++
    }
    //===========================================================
    if (e.target.value === 3) {
          if (count > 1) {
        profileContainer.innerHTML = '';
        mentors.innerHTML = '';
            otherMeberContainer.innerHTML = ''
      
        }
      window.onload = null;
      OtherMembersData.forEach((member) => {
      mentors.style.display = 'none';
      teamContainer.style.display = 'none'
      profileContainer.style.display = 'none'
      communityContainer.style.display = "none"
      otherMeberContainer.style.display="flex"
        generateOtherMembersCard(member)
      })
      count++
    }


    // console.log("inside teamNavbar event", e.target.value);
  })

})
//==============================================================
// function generateMembersCard(mentor) {
//      const card = document.createElement("div");
//     card.classList.add("col-lg-4", "col-md-6", "col-sm-12", "card_container"); // Bootstrap grid classes

//     // Create the card content using Bootstrap card component
//     card.innerHTML = `
//         <div class="card col-xs-mx-4 bg-dark m-2 new_card" style="height:95%;">
//             <a href="${member.portfolio_link}" target="_blank">
//                 <img class="card-img-top col-xs-mx-4 new_card_img " src="${member.img}" alt="${member.member_name} image">
//             </a>
//             <div class="card-body">
//             <h5 class="card-title">${member.member_name}</h5>
//             <p class="card-text font-weight-normal">Position: ${member.Position}</p>
//             <p class="card-text font-weight-normal">Research Interests: ${member.research_Interests}</p>
//             </div>
//             </div>
//             `;
            
//             // Append the card to the profile container
//             document.getElementById("profile-container").appendChild(card);
//             console.log(card);
// }
//==================================generating other members================================

/*
 imgSrc: "assets/img/core_team/Aditya.jpg",
    portfolioLinks: {
      github: "https://github.com/AdityaKapoor74",
      twitter: "https://twitter.com/_AdityaKapoor_",
      linkedin: "https://www.linkedin.com/in/aditya-kapoor-446727152"
    },
    name: "Aditya Kapoor",
    experience: "
*/

function generateOtherMembersCard(member) {
    // Create the card element
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "col-sm-12", "card_container"); // Bootstrap grid classes

    // Create the card content using Bootstrap card component
    card.innerHTML = `
        <div class="card col-xs-mx-4  m-2 new_card" style="height:95%;">
            <a href="${member.ProfileLink}" target="_blank">
                <img class="card-img-top col-xs-mx-4 img-fluid new_card_img " src="${member.imgSrc}" alt="${member.name} image">
            </a>
            <div class="card-body">
            <h5 class="card-title">${member.name}</h5>
          <div style="display: flex; ">
    <a href="${member.portfolioLinks.twitter}" style="margin-right: 8%;"><i class="bi bi-twitter" style="font-size: 2rem ;"></i></a>
    <a href="${member.portfolioLinks.github}" style="margin-right: 8%;"><i class="bi bi-github" style="font-size: 2rem ;"></i></a>
    <a href="${member.portfolioLinks.linkedin}" style="margin-right: 8%;"><i class="bi bi-linkedin" style="font-size: 2rem ;"></i></a>
</div>

            <p class="card-text font-weight-normal">Research Interests: ${member.experience}</p>
            </div>
            
            </div>
            </div>
            `;
            
            // Append the card to the profile container
            document.getElementById("other-member-container").appendChild(card);
            // console.log(card);
          }
          
 

//=========================generating member cards==============================================       
function generateMembersCard(member) {
    // Create the card element
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "col-sm-12", "card_container"); // Bootstrap grid classes

    // Create the card content using Bootstrap card component
    card.innerHTML = `
        <div class="card col-xs-mx-4  m-2 new_card" style="height:95%;">
            <a href="${member.ProfileLink}" target="_blank">
                <img class="card-img-top col-xs-mx-4 new_card_img " src="${member.img}" alt="${member.MemberName} image">
            </a>
            <div class="card-body">
            <h5 class="card-title">${member.MemberName}</h5>
            <p class="card-text font-weight-normal">Position: ${member.Position}</p>
            <p class="card-text font-weight-normal">Research Interests: ${member.ResearchInterest}</p>
            </div>
            </div>
            `;
            
            // Append the card to the profile container
            document.getElementById("mentor-section").appendChild(card);
            // console.log(card);
          }
          
 
                  //===================================================================
 function generateProfileCard(member) {
    // Create the card element
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "col-sm-12", "card_container"); // Bootstrap grid classes

    // Create the card content using Bootstrap card component
    card.innerHTML = `
        <div class="card col-xs-mx-4  m-2 new_card" style="height:95%;">
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

   var animation = lottie.loadAnimation({
        container: document.getElementById('lottie-container'), // the dom element that will contain the animation
        renderer: 'svg', // 'svg', 'canvas', or 'html'
        loop: true, // whether the animation should loop
        autoplay: true, // whether the animation should start automatically
        path: 'assets/img/aiBall.json' // the path to the animation json
    });

   var animation2 = lottie.loadAnimation({
        container: document.querySelector('.about-img'), // the dom element that will contain the animation
        renderer: 'svg', // 'svg', 'canvas', or 'html'
        loop: true, // whether the animation should loop
        autoplay: true, // whether the animation should start automatically
        path: 'assets/img/animation.json' // the path to the animation json
   });
    
     var animation3 = lottie.loadAnimation({
        container: document.getElementById('icon-1'), // the dom element that will contain the animation
        renderer: 'svg', // 'svg', 'canvas', or 'html'
        loop: true, // whether the animation should loop
        autoplay: true, // whether the animation should start automatically
        path: 'assets/img/projects.json' // the path to the animation json
    });

   var animation4 = lottie.loadAnimation({
        container: document.getElementById('icon-2'), // the dom element that will contain the animation
        renderer: 'svg', // 'svg', 'canvas', or 'html'
        loop: true, // whether the animation should loop
        autoplay: true, // whether the animation should start automatically
        path: 'assets/img/blogs.json' // the path to the animation json
   });
      var animation5 = lottie.loadAnimation({
        container: document.getElementById('icon-3'), // the dom element that will contain the animation
        renderer: 'svg', // 'svg', 'canvas', or 'html'
        loop: true, // whether the animation should loop
        autoplay: true, // whether the animation should start automatically
        path: 'assets/img/reading-groups.json' // the path to the animation json
    });




// let num = 1
// researchMembers.forEach((user) => {
//   console.log(user, num);
// num++
// })
updateGradient();
