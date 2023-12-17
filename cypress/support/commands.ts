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

import {ProfileTest} from "../fixtures/profile";
import {FunctionName} from "../../supabase/types/supabase.shorthand-types";
import {API_URL} from "../fixtures/api_url";
import Chainable = Cypress.Chainable;

/**
 * Adds custom command "cy.dataCy" to the global "cy" object
 *
 * @example cy.dataCy('greeting')
 */
Cypress.Commands.add('getDataCy', (value: string, value2?: string): void => {
    cy.get(`[data-cy=${value}], [data-cy=${value2}]`)
});

Cypress.Commands.add('interceptSupabaseCall', (endPoint: FunctionName): void => {
    const apiUrl = API_URL
    cy.intercept('POST', apiUrl + endPoint)
});

Cypress.Commands.add('shouldBeVisible', {prevSubject: 'element'}, (subject) => {
    cy.wrap(subject).should('be.visible');
});

Cypress.Commands.add('andContain', {prevSubject: 'element'}, (subject, value) => {
    cy.wrap(subject).and('contain', value);
});

Cypress.Commands.add('signIn', (profile: ProfileTest) => {
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
    // y.pause()
    cy.openSearchTab()
    cy.getDataCy('search').type(firstName)
    cy.getDataCy('user-search-results')
    .find('polity-search-profile-result')
    .shouldBeVisible()
    .contains(firstName)
});

Cypress.Commands.add(
    'followUser',
    (
        followingUser: ProfileTest,
        followUser: ProfileTest
    ) => {

        cy.interceptSupabaseCall('select_user')
        .as('selectUser')
        cy.interceptSupabaseCall('check_if_following')
        .as('isFollowing')
        cy.interceptSupabaseCall('select_following_counter')
        .as('followingCounter')

        cy.searchUser(followingUser.first_name as string)
        .click()
        cy.wait(['@followingCounter', '@isFollowing', '@selectUser'])

        cy.getDataCy('first-name')
        .shouldBeVisible()
        .contains(followingUser.first_name as string)

        cy.interceptSupabaseCall('follow_transaction')
        .as('followTransaction')

        cy.getDataCy('followButton')
        .shouldBeVisible()
        .should('have.text', 'FOLLOW ')
        .click()

        cy.wait('@followTransaction')
        cy.contains('Successful followed')
        .should('be.visible')


        cy.getDataCy('followButton')
        .shouldBeVisible()
        .should('have.text', 'UNFOLLOW ')

        cy.getDataCy('followerCounter')
        .shouldBeVisible()
        .contains(followingUser.follower_counter + 1)

        cy.searchUser(followUser.first_name as string)
        .click()

        cy.getDataCy('first-name')
        .shouldBeVisible()
        .contains(followUser.first_name as string)

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
    .scrollIntoView()
    .click()
    cy.url().should('contain', 'sign-in')
})

Cypress.Commands.add('signUp', (newUser: ProfileTest): Chainable<string> => {
    const randomNumber: number = Math.floor(Math.random() * 10000000);
    newUser.email = 'test' + randomNumber + '@gmail.com';
    cy.visit('landing/signup');
    cy.get('input')
    .clear()
    cy.getDataCy('email')
    .type(newUser.email)
    cy.getDataCy('password')
    .clear()
    cy.getDataCy('password')
    .type(newUser.password)
    cy.getDataCy('signup')
    .click()
    cy.url().should('contain', 'sign-in')
    return cy.wrap(newUser.email);
})

