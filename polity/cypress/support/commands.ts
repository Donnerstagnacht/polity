/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

import {ProfileTest} from "../../src/app/features/profile/types-and-interfaces/profile";

/**
 * Adds custom command "cy.dataCy" to the global "cy" object
 *
 * @example cy.dataCy('greeting')
 */
Cypress.Commands.add('getDataCy', (value: string, value2?: string): void => {
    cy.get(`[data-cy=${value}], [data-cy=${value2}]`)
});

Cypress.Commands.add('shouldBeVisible', {prevSubject: 'element'}, (subject) => {
    cy.wrap(subject).should('be.visible');
});

Cypress.Commands.add('andContain', {prevSubject: 'element'}, (subject, value) => {
    cy.wrap(subject).and('contain', value);
});

Cypress.Commands.add('signIn', (profile: ProfileTest) => {
    cy.visit('landing/sign-in');
    cy.get('input').clear()
    cy.get('[data-cy="email"]').type(profile.email)
    cy.get('[data-cy="password"]').clear()
    cy.get('[data-cy="password"]').type(profile.password)
    cy.get('[data-cy="sign-in"]').click()
});

Cypress.Commands.add('openSearchTab', () => {
    cy.getDataCy('nav-search', 'nav-search-desktop')
    .filter(':visible')
    .first()
    .click()
});

Cypress.Commands.add('searchUser', (firstName: string) => {
    cy.openSearchTab()
    cy.getDataCy('search').type(firstName)
    cy.getDataCy('user-search-results')
    .find('polity-profile-card')
    .shouldBeVisible()
    .contains(firstName)
});

Cypress.Commands.add(
    'followUser',
    (
        followingUser: ProfileTest,
        followUser: ProfileTest
    ) => {

        cy.searchUser(followingUser.first_name)
        .click()

        cy.intercept('POST', 'https://qwetlgmbngpopdcgravw.supabase.co/rest/v1/rpc/check_if_following')
        .as('isFollowing')
        cy.intercept('POST',
            'https://qwetlgmbngpopdcgravw.supabase.co/rest/v1/rpc/select_following_counter')
        .as('followingCounter')

        cy.wait(['@followingCounter', '@isFollowing'])

        cy.getDataCy('first-name')
        .shouldBeVisible()
        .contains(followingUser.first_name)

        cy.intercept('POST',
            'https://qwetlgmbngpopdcgravw.supabase.co/rest/v1/rpc/follow_transaction')
        .as('followTransaction')

        cy.getDataCy('followProfileButton')
        .shouldBeVisible()
        .should('have.text', 'FOLLOW')
        .click()

        cy.wait('@followTransaction')

        cy.getDataCy('followProfileButton')
        .shouldBeVisible()
        .should('have.text', 'UNFOLLOW')

        cy.getDataCy('followerCounter')
        .shouldBeVisible()
        .contains(followingUser.follower_counter + 1)

        cy.searchUser(followUser.first_name)
        .click()

        cy.getDataCy('first-name')
        .shouldBeVisible()
        .contains(followUser.first_name)

        cy.getDataCy('followingCounter')
        .shouldBeVisible()
        .contains(followUser.following_counter + 1)
    }
)

Cypress.Commands.add('navigateToHome', () => {
    cy.getDataCy('nav-home', 'nav-home-desktop')
    .filter(':visible')
    .first()
    .click()
    cy.getDataCy('home-instruction')
    .shouldBeVisible()
    .contains('Dein Profil und Gruppen.')
})

Cypress.Commands.add('signOut', (signedInUser: ProfileTest) => {
    cy.navigateToHome()
    cy.getDataCy('home-to-profile')
    .shouldBeVisible()
    .click();
    cy.getDataCy('nav-profile-edit', 'nav-profile-edit-desktop')
    .filter(':visible')
    .first()
    .click()
    cy.getDataCy('sign-out')
    .click()
    cy.url().should('contain', 'sign-in')
})

