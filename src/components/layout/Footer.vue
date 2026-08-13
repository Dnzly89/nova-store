<template>
  <footer class="footer">
    <div class="container">

      <div class="footer__logo">
        <h2>NOVA STORE</h2>
        <p>Your modern online store.</p>
      </div>

      <nav class="footer__nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/catalog">Catalog</RouterLink>
        <RouterLink to="/favorites">Favorites</RouterLink>
        <RouterLink to="/cart">Cart</RouterLink>
      </nav>

      <div class="footer__copyright">
        © 2026 Nova Store
      </div>

    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 80px;

  border-top: 1px solid rgba(255, 255, 255, 0.08);

  padding: 50px 0 30px;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 40px;
}

/* Logo */

.footer__logo h2 {
  margin: 0;

  color: white;

  font-size: 24px;
  letter-spacing: 2px;
}

.footer__logo p {
  margin: 10px 0 0;

  color: #aab3c5;

  font-size: 14px;
}

/* Navigation */

.footer__nav {
  display: flex;
  align-items: center;
  gap: 30px;
}

.footer__nav a {
  color: #d6dceb;

  font-size: 14px;

  text-decoration: none;

  transition: 0.25s;
}

.footer__nav a:hover {
  color: white;
}

/* Copyright */

.footer__copyright {
  color: #8d98b3;

  font-size: 14px;

  white-space: nowrap;
}

/* =========================
   Tablet
========================= */

@media (max-width: 1000px) {
  .container {
    padding: 0 40px;

    flex-wrap: wrap;
  }

  .footer__logo {
    flex: 1;
  }

  .footer__nav {
    gap: 20px;
  }
}

/* =========================
   Mobile
========================= */

@media (max-width: 700px) {
  .footer {
    margin-top: 60px;

    padding: 40px 0 25px;
  }

  .container {
    padding: 0 20px;

    flex-direction: column;

    align-items: center;

    gap: 28px;

    text-align: center;
  }

  .footer__logo h2 {
    font-size: 22px;
  }

  .footer__logo p {
    margin-top: 8px;

    font-size: 13px;
  }

  .footer__nav {
    width: 100%;

    display: flex;

    justify-content: center;

    flex-wrap: wrap;

    gap: 12px 24px;
  }

  .footer__nav a {
    padding: 6px 4px;

    font-size: 14px;
  }

  .footer__copyright {
    font-size: 12px;
  }
}

/* =========================
   Small phones
========================= */

@media (max-width: 420px) {
  .container {
    padding: 0 16px;
  }

  .footer {
    margin-top: 50px;

    padding: 35px 0 22px;
  }

  .footer__logo h2 {
    font-size: 20px;
    letter-spacing: 1.5px;
  }

  .footer__nav {
    gap: 8px 18px;
  }

  .footer__nav a {
    font-size: 13px;
  }

  .footer__copyright {
    font-size: 11px;
  }
}
</style>