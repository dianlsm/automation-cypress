describe('Sauce Demo Tests', () => {
  describe('Login Test', () => {
    it('Login with valid credential', () => {
      cy.viewport(1280, 720); 
      cy.visit('https://www.saucedemo.com');

      cy.get('input[name="user-name"]').type('standard_user');
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[type="submit"]').click();

      // Memastikan berhasil login
      cy.get('.title').should('contain', 'Products');
      cy.wait(2000); 

    });
  });

  describe('Checkout Product', () => {
    before(() => {
      // Login sebelum melakukan pengujian checkout
      cy.viewport(1920, 1080);
      cy.visit('https://www.saucedemo.com');
      cy.get('input[name="user-name"]').type('standard_user');
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[type="submit"]').click();
      cy.wait(2000);
    });

    it('Should successfully complete checkout', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click(); 
      cy.get('[data-test="shopping-cart-link"]').click({ force: true }); 

      // Memastikan item dan harga yang dipilih benar
      cy.contains('Sauce Labs Backpack').should('be.visible');
      cy.contains('$29.99').should('be.visible');
      cy.wait(2000);
      
      cy.get('[data-test="checkout"]').click(); 

      cy.get('[data-test="firstName"]').type('Dian');
      cy.get('[data-test="lastName"]').type('Lesmana');
      cy.get('[data-test="postalCode"]').type('45552');
      cy.get('[data-test="continue"]').click();
      cy.wait(2000);
      
      cy.get('[data-test="finish"]').click();

      // Memastikan berhasil melakukan checkout
      cy.contains('Checkout: Complete!').should('be.visible');
      cy.contains('Thank you for your order!').should('be.visible');
      cy.wait(2000);
    });
  });

  describe('Logout Test', () => {
    before(() => {
      // Pastikan pengguna sudah login sebelum melakukan logout
      cy.viewport(1920, 1080);
      cy.visit('https://www.saucedemo.com');
      cy.get('input[name="user-name"]').type('standard_user');
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[type="submit"]').click();
      cy.wait(2000);
    });

    it('Logout successfully', () => {
      cy.get('[data-test="logout-sidebar-link"]').click({ force: true }); // Klik tombol logout
      cy.wait(2000);
      cy.get('[data-test="login-button"]').should('be.visible');
      cy.wait(2000);
    });
  });
});
