// script.js

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const authBtn = document.getElementById('auth-btn');
  // ====== Sticky navbar on scroll ======
  const header = document.querySelector('.navbar');
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const navToggle = document.querySelector('.navbar-toggler');
  const collapseNav = document.getElementById('navbarNav');
  navToggle.addEventListener('click', () => {
    collapseNav.classList.toggle('show');
  });

  // ====== Smooth scroll for anchor links ======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  // ====== Category card hover effects ======
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
    card.addEventListener('touchstart', () => {
      if (card.classList.contains('hovered')) {
        card.classList.remove('hovered');
      } else {
        categoryCards.forEach(c => c.classList.remove('hovered'));
        card.classList.add('hovered');
      }
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // ====== Login State ======
  let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  let userName = localStorage.getItem('userName') || '';

  // ====== Restricted links ======
  const restrictClick = (e) => {
    e.preventDefault();
    alert("Please login or register to access this feature.");
    window.location.href = 'login.html';
  };

  const updateRestrictedLinks = () => {
    document.querySelectorAll('.restricted').forEach(link => {
      if (!isLoggedIn) {
        link.addEventListener('click', restrictClick);
      } else {
        link.removeEventListener('click', restrictClick);
      }
    });
  };
  updateRestrictedLinks();

  // ====== Auth button (Login/Register or Logout) ======
  if (authBtn) {
    if (isLoggedIn) {
      authBtn.textContent = 'Logout';
      authBtn.classList.remove('btn-outline-primary');
      authBtn.classList.add('btn-danger');

      // Enable restricted links
      document.querySelectorAll('.restricted').forEach(link => {
        link.removeEventListener('click', restrictClick);
        link.classList.remove('disabled');
      });

      authBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to logout?")) {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('userName');
          window.location.reload();
        }
      });
    }
  }

  // ====== Login/Register page logic ======
  if (window.location.pathname.endsWith("login.html")) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // --- Login ---
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
          const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          const data = await res.json();

          if (res.ok) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', email);
            alert(data.message);
            window.location.href = 'index.html';
          } else {
            alert(data.error);
          }
        } catch (err) {
          alert("Server error: " + err.message);
        }
      });
    }

    // --- Register ---
    if (registerForm) {
      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('registerConfirm').value;

        if (password !== confirm) {
          alert("Passwords do not match!");
          return;
        }

        try {
          const res = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
          });
          const data = await res.json();

          if (res.ok) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', name);
            alert(data.message);
            window.location.href = 'index.html';
          } else {
            alert(data.error);
          }
        } catch (err) {
          alert("Server error: " + err.message);
        }
      });
    }
  }

});

