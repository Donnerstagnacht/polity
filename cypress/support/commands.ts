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

import {SupabaseFunctionName} from "../../supabase/types/supabase.shorthand-types";
import {environment} from "../../src/environments/environment";
import {Profile} from "../../seed_and_test_data/02_test_profiles";
import {ProfileCounter} from "../../seed_and_test_data/04_test_profile_counters";
import {AuthData} from "../../seed_and_test_data/01_test_auth";
import Chainable = Cypress.Chainable;

/**
 * Adds custom command "cy.dataCy" to the global "cy" object
 *
 * @example cy.dataCy('greeting')
 */
Cypress.Commands.add('getDataCy', (value: string, value2?: string): void => {
    cy.get(`[data-cy=${value}], [data-cy=${value2}]`)
});

Cypress.Commands.add('interceptSupabaseCall', (endPoint: SupabaseFunctionName): void => {
    const apiUrl = environment.supabaseProjectUrl;
    cy.intercept('POST', apiUrl + '/rest/v1/rpc/' + endPoint)
});

Cypress.Commands.add('shouldBeVisible', {prevSubject: 'element'}, (subject): void => {
    cy.wrap(subject).should('be.visible');
});

Cypress.Commands.add('andContain', {prevSubject: 'element'}, (subject, value): void => {
    cy.wrap(subject).and('contain', value);
});

Cypress.Commands.add('signIn', (profile: AuthData): void => {
    cy.get('input').clear()
    cy.get('[data-cy="email"]').type(profile.email)
    cy.get('[data-cy="password"]').clear()
    cy.get('[data-cy="password"]').type(profile.password)
    cy.get('[data-cy="sign-in"]').click()
});

Cypress.Commands.add('openSearchTab', (): void => {
    cy.getDataCy('nav-search', 'nav-search-desktop')
    .filter(':visible')
    .first()
    .click()
});

Cypress.Commands.add('searchUser', (firstName: string): void => {
    cy.openSearchTab()
    cy.getDataCy('search').type(firstName)
    cy.getDataCy('user-search-results')
    .find('polity-search-profile-result')
    .shouldBeVisible()
    .contains(firstName)
});

Cypress.Commands.add('searchGroup', (name: string): void => {
    cy.openSearchTab()
    cy.getDataCy('search').type(name)
    cy.getDataCy('group-search-results')
    .find('polity-search-group-result')
    .shouldBeVisible()
    .contains(name)
});

Cypress.Commands.add(
    'followUser',
    (
        userWhoIsFollowedProfile: Profile,
        userWhoIsFollowedCounter: ProfileCounter,
        userWhoFollowsProfile: Profile,
        userWhoFollowsCounter: ProfileCounter
    ): void => {

        cy.interceptSupabaseCall('read_user')
        .as('selectUser')
        cy.interceptSupabaseCall('check_if_following')
        .as('isFollowing')
        cy.interceptSupabaseCall('read_following_counter')
        .as('followingCounter')

        cy.searchUser(userWhoIsFollowedProfile.first_name as string)
        .click()
        // cy.wait(['@followingCounter', '@isFollowing', '@selectUser'])

        cy.getDataCy('first-name')
        .shouldBeVisible()
        .contains(userWhoIsFollowedProfile.first_name as string)

        cy.interceptSupabaseCall('follow_transaction')
        .as('followTransaction')

        cy.getDataCy('followButton')
        .scrollIntoView()
        .shouldBeVisible()
        .should('have.text', 'FOLLOW ')
        .click()

        // cy.wait('@followTransaction')
        cy.contains('Successful followed')
        .should('be.visible')


        cy.getDataCy('followButton')
        .shouldBeVisible()
        .should('have.text', 'UNFOLLOW ')

        cy.getDataCy('followerCounter')
        .shouldBeVisible()
        .contains(userWhoIsFollowedCounter.follower_counter + 1)

        cy.searchUser(userWhoFollowsProfile.first_name as string)
        .click()

        cy.getDataCy('first-name')
        .shouldBeVisible()
        .contains(userWhoFollowsProfile.first_name as string)

        cy.getDataCy('followingCounter')
        .shouldBeVisible()
        .contains(userWhoFollowsCounter.following_counter + 1)
    }
)

Cypress.Commands.add('navigateToHome', (): void => {
    cy.getDataCy('nav-home', 'nav-home-desktop')
    .filter(':visible')
    .first()
    .click()
    cy.getDataCy('home-instruction')
    .shouldBeVisible()
    .contains('Dein Profil.')
})

Cypress.Commands.add('signOut', (signedInUser: AuthData): void => {
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

Cypress.Commands.add('signUp', (newUser: AuthData): Chainable<string> => {
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

Cypress.Commands.add('resetSupabase', (): void => {
    // Tries to reset the database 3 times
    try {
        cy.exec('echo Y | npx supabase db reset --linked')
    } catch (error) {
        try {
            cy.exec('echo Y | npx supabase db reset --linked')
        } catch (error) {
            cy.exec('echo Y | npx supabase db reset --linked')
        }
    }
});
