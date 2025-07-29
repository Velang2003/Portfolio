// ✅ Import Firebase SDK (v12)
import { app, db } from "./main/firebase-config.js";
import {
  getFirestore,
  doc, getDoc,
  collection, getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
async function loadPortfolio() {
  const snap = await getDoc(doc(db, "portfolio", "data"));
  if (!snap.exists()) {
    console.warn("No portfolio data found");
    return;
  }
  const data = snap.data();

  /* ===== About Section ===== */
  if (data.about) {
    const about = data.about;
    document.querySelector("#about h1").innerText = "About Me";
    document.querySelector("#about p").innerHTML = about.title || "";
    if (data.about?.profilePic) {
      document.querySelector("#about img").src = data.about.profilePic;
    }
  }

  /* ===== Skills Section ===== */
  const skillsGrid = document.querySelector(".skills-grid");
  skillsGrid.innerHTML = "";
  (data.skills || []).forEach(skill => {
    const skillItem = document.createElement("div");
    skillItem.className = "skill-item";
    skillItem.innerHTML = `
      <div class="skill-name">
        <div class="skill-icon"><i class="${skill.icon || ''}"></i></div>
        ${skill.name}
      </div>
      <div class="skill-bar">
        <div class="skill-progress" data-width="${skill.percent}%" style="width:0;"></div>
      </div>
    `;
    skillsGrid.appendChild(skillItem);
  });
  // animate skill bars
  setTimeout(() => {
    document.querySelectorAll(".skill-progress").forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }, 300);

  /* ===== Projects Section ===== */
  const projectsGrid = document.querySelector(".projects-grid");
  projectsGrid.innerHTML = "";
  (data.projects || []).forEach(p => {
    const project = document.createElement("div");
    project.className = "project-item";
    project.innerHTML = `
      <div class="project-image">
        ${p.image ? `<img src="${p.image}" alt="${p.title}">` : ""}
      </div>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-description">${p.desc}</p>
      <div class="project-tags">
        ${(p.techStack || []).map(t => `<span class="project-tag">${t}</span>`).join("")}
      </div>
      ${p.url ? `<a href="${p.url}" class="project-button" target="_blank">View Project</a>` : ""}
    `;
    projectsGrid.appendChild(project);
  });

  /* ===== Experience Section ===== */
  const expContainer = document.querySelector("#experience");
  expContainer.innerHTML = "<h2>Professional Experience</h2>";

  (data.experience || []).forEach(exp => {
    const div = document.createElement("div");
    div.className = "experience-item";
    div.innerHTML = `
    <h3 class="experience-title">${exp.title}</h3>
    <p class="experience-company"><a href="${exp.url}" target="_blank">${exp.company}</a></p>
    <p class="experience-date">${exp.from} - ${exp.to}</p>
    <ul class="experience-desc">
      ${(exp.desc || []).map(d => `<li>${d}</li>`).join("")}
    </ul>
  `;
    expContainer.appendChild(div);
  });


  /* ===== Education Section ===== */
  const eduContainer = document.querySelector("#education");
  eduContainer.innerHTML = "<h2>Education</h2>";
  (data.education || []).forEach(edu => {
    const div = document.createElement("div");
    div.className = "education-item";
    div.innerHTML = `
      <h3 class="education-title">${edu.title}</h3>
      <p class="education-institution">
          <a href="${edu.url}" target="_blank">${edu.institute}</a>
      </p>      
      <p class="education-date">${edu.from} - ${edu.to}</p>
      <div class="education-desc">${edu.desc}</div>
    `;
    eduContainer.appendChild(div);
  });

  /* ===== Certifications Section ===== */
  const certSlider = document.getElementById("slider");
  certSlider.innerHTML = "";

  (data.certifications || []).forEach(cert => {
    if (cert.image) {
      const img = document.createElement("img");
      img.src = cert.image;
      img.alt = cert.name || "Certificate";
      img.className = "slide-image";
      certSlider.appendChild(img);
    }
  });

  //Certificates auto sliding 
  let currentIndex = 0;
  const slider = document.getElementById('slider');
  const slides = document.querySelectorAll('.slide-image');
  const totalSlides = slides.length;

  function slide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
  }
  setInterval(slide, 5000);

}
// Add scroll event listener for header background change
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width;
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  const width = bar.style.width;
  bar.style.width = '0';
  bar.setAttribute('data-width', width);
  observer.observe(bar);
});

// Add this to your existing script tag or create a new one
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  });
});

window.addEventListener("DOMContentLoaded", loadPortfolio);