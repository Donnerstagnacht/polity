// @ts-ignore
import {User} from '../support/user_type';

describe('Auth test.', () => {
  let user1: User
  before(() => {
      cy.fixture('user1').then((user: User) => {
          user1 = user;
      })
  })

  it('Signs up a user', () => {
    cy.visit('');
    cy.get('input').clear()
    cy.get('[data-cy="email"]').type(user1.email)
    cy.get('[data-cy="password"]').clear()
    cy.get('[data-cy="password"]').type(user1.password)
    cy.get('[data-cy="login"]').click()
    cy.url().should('contain', 'profile')
  })

  // it('Signs in a user', () => {
  //   cy.visit('login');
  //   cy.get('[data-cy="email"]').clear()
  //   cy.get('[data-cy="email"]').type(user1.email)
  //   cy.get('[data-cy="password"]').clear()
  //   cy.get('[data-cy="password"]').type(user1.password)
  //   cy.get('[data-cy="signin"]').click()
  //   cy.url().should('include', 'profile')
  // })
  //
  it('edits profile data', () => {
    cy.visit('profile');
    cy.get('input').clear()
    cy.get('[data-cy="firstName"]').type('Tobias')
    cy.get('[data-cy="lastName"]').clear()
    cy.get('[data-cy="lastName"]').type('hassebrock')
    cy.get('[data-cy="update"]').click()
    cy.visit('login');
    cy.visit('profile');
    cy.get('[data-cy="title"]').contains('Tobias')
  })
})
