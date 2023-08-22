/// <reference types="cypress" />

describe('User login testing', () => {

  //Given
  const validUsername = 'standard_user';
  const incorrectUsername = 'new_user';
  const blockedUsername = 'locked_out_user';
  const glitchedUsername = 'performance_glitch_user';
  const uppercaseUsername = 'STANDARD_USER';
  const validPassword = 'secret_sauce';
  const incorrectPassword = 'password123';
  const uppercasePassword = "SECRET_SAUCE";

  it('Should check if login and password fields are visible', () => {
    cy.visit('/');
    cy.get('#user-name').should('be.visible');
    cy.get('#password').should('be.visible');
  });

  it('Should check if "login" button is visible and active', () => {
    cy.visit('/');
    cy.get('#user-name').type(validUsername);
    cy.get('#password').type(validPassword);
    cy.get('#login-button').should('be.enabled');
    cy.get('#login-button').click();
  });

  it('Should login with a valid username and password', () => {
    cy.visit('/');
    cy.get('#user-name').type(validUsername);
    cy.get('#password').type(validPassword);
    cy.get('#login-button').click();
    cy.url().should('include', 'inventory');
  });

  it('Should not login with a valid username and incorrect password', () => {
    cy.visit('/');
    cy.get('#user-name').type(validUsername);
    cy.get('#password').type(incorrectPassword);
    cy.get('#login-button').click();
    cy.url().should('not.include', 'inventory');
    cy.get('h3').should('include.text', 'Username and password do not match')
  });

  it('Should not login with a incorrect username and valid password', () => {
    cy.visit('/');
    cy.get('#user-name').type(incorrectUsername);
    cy.get('#password').type(validPassword);
    cy.get('#login-button').click();
    cy.url().should('not.include', 'inventory');
    cy.get('h3').should('include.text', 'Username and password do not match')
  });

  it('Should not login with a empty username and password fields', () => {
    cy.visit('/');
    cy.get('#login-button').click();
    cy.url().should('not.include', 'inventory');
    cy.get('h3').should('include.text', 'Username is required')
  });

  it('Should not login with only the username field filled', () => {
    cy.visit('/');
    cy.get('#user-name').type(validUsername);
    cy.get('#login-button').click();
    cy.url().should('not.include', 'inventory');
    cy.get('h3').should('include.text', 'Password is required')
  });

  it('Should not login with only the password field filled', () => {
    cy.visit('/');
    cy.get('#password').type(validPassword);
    cy.get('#login-button').click();
    cy.url().should('not.include', 'inventory');
    cy.get('h3').should('include.text', 'Username is required')
  });

  it('Should not login with a blocked account', () => {
    cy.visit('/');
    cy.get('#user-name').type(blockedUsername);
    cy.get('#password').type(validPassword);
    cy.get('#login-button').click();
    cy.url().should('not.include', 'inventory');
    cy.get('h3').should('include.text', 'this user has been locked out');
  });

  it('Should login with a glitched account', () => {
    cy.visit('/');
    cy.get('#user-name').type(glitchedUsername);
    cy.get('#password').type(validPassword);
    cy.get('#login-button').click();
    cy.url().should('include', 'inventory');
  });

  it('Should not log in with an uppercase username and valid password', () => {
    cy.visit('/');
    cy.get('#user-name').type(uppercaseUsername);
    cy.get('#password').type(validPassword);
    cy.get('#login-button').click();
    cy.url().should('not.include', 'inventory');
    cy.get('h3').should('include.text', 'Username and password do not match');
  });

  it('Should not log in with a valid username and uppercase password', () => {
    cy.visit('/');
    cy.get('#user-name').type(uppercaseUsername);
    cy.get('#password').type(uppercasePassword);
    cy.get('#login-button').click();
    cy.url().should('not.include', 'inventory');
    cy.get('h3').should('include.text', 'Username and password do not match');
  });

  it('Should navigate by "enter" key from username to password field', () => {
    cy.visit('/');
    cy.get('#user-name').type(validUsername);
    cy.get('#password').type(validPassword).type('{enter}');
    cy.url().should('include', 'inventory');
  });

  it('Should check if entered password is encrypted', () => {
    cy.visit('/');
    cy.get('#password').should('have.attr', 'type', 'password')
  });

  it('Should check if the user is still logged in after one minute of inactivity after logging in', () => {
    cy.visit('/');
    cy.get('#user-name').type(validUsername);
    cy.get('#password').type(validPassword);
    cy.get('#login-button').click();
    cy.wait(60000);
    cy.reload();
    cy.url().should('include', 'inventory');
  });

});