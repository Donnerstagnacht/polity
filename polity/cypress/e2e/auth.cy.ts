import {User} from '../support/user_type';


describe('Auth testd.', () => {
  let user1: User
  before(() => {
      cy.fixture('user1').then((user: User) => {
          user1 = user;
      })
  })

  it('Signs up a user', () => {
    cy.visit('');
    cy.get('[data-cy="email"]').clear()
    cy.get('[data-cy="email"]').type(user1.email)
    cy.get('[data-cy="password"]').clear()
    cy.get('[data-cy="password"]').type(user1.password)
    cy.get('[data-cy="login"]').click()
    cy.url().should('signup', 'login')
  })

it('Signs in a user', () => {
    cy.visit('');
    cy.get('[data-cy="email"]').clear()
    cy.get('[data-cy="email"]').type(user1.email)
    cy.get('[data-cy="password"]').clear()
    cy.get('[data-cy="password"]').type(user1.password)
    cy.get('[data-cy="signin"]').click()
    cy.url().should('include', 'profile')
})
})
