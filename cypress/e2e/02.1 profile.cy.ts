import {ProfileTest} from "../fixtures/profile";
import {seedReadUser3, seedWriteUser} from "../fixtures/user";
import {Size, Sizes} from "../fixtures/size";

const seedUser2: ProfileTest = seedReadUser3;

Sizes.forEach((size: Size): void => {
    describe(`Profile tests with screen size ${size.width} show that users can `, () => {

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.visit('landing/sign-in');
            cy.signIn(seedWriteUser);
        })

        const newFirstName = seedWriteUser.first_name as string + Math.random();
        const newLastName = seedWriteUser.last_name as string + Math.random();

        it('edit its own profile data.', () => {
            cy.getDataCy('nav-profile-edit', 'nav-profile-edit-desktop')
            .filter(':visible')
            .first()
            .click()
            cy.getDataCy('edit-instruction')
            .shouldBeVisible()

            //  cy.intercept('POST', 'https://abcwkgkiztruxwvfwabf.supabase.co/rest/v1/profiles').
            cy.interceptSupabaseCall('update_user').as('updateProfile')
            cy.getDataCy('firstName').clear()
            cy.getDataCy('firstName').type(newFirstName)
            cy.getDataCy('lastName').clear()
            cy.getDataCy('lastName').type(newLastName)
            cy.getDataCy('update').click()

            cy.contains('Successful')
            .should('be.visible')
            cy.wait('@updateProfile')
        })

        it('view its own profile.', () => {
            cy.getDataCy('first-name')
            .shouldBeVisible()
            .contains(newFirstName)
            .contains(newLastName)
        })

        it('change its profile image.', () => {
            cy.getDataCy('nav-profile-edit', 'nav-profile-edit-desktop')
            .filter(':visible')
            .first()
            .click()
            cy.getDataCy('edit-instruction')
            .shouldBeVisible()

            cy.getDataCy('uploadImage')
            .shouldBeVisible()
            .selectFile('cypress/fixtures/test_profile_img_upload_file.png', {action: 'drag-drop'})

            cy.getDataCy('loading')

            cy.getDataCy('uploadedImage')
            .shouldBeVisible()

            cy.getDataCy('nav-profile-wiki', 'nav-profile-wiki-desktop')
            .filter(':visible')
            .first()
            .click()

            //    TODO: Add a more specific test how to check that the image upload worked
            // https://stackoverflow.com/questions/50283857/using-cypress-how-would-i-write-a-simple-test-to-check-that-a-logo-image-exists
            cy.getDataCy('profileImage')
            .shouldBeVisible()
        })

        it('view other user profiles', (): void => {
            cy.openSearchTab()
            cy.getDataCy('search').type(seedUser2.first_name as string)
            cy.getDataCy('user-search-results')
            .find('polity-search-profile-result')
            .shouldBeVisible()
            .contains(seedUser2.first_name as string)
            .click()
            cy.getDataCy('first-name')
            .shouldBeVisible()
            .contains(seedUser2.first_name as string)
            cy.getDataCy('first-name')
            .shouldBeVisible()
            .contains(seedUser2.last_name as string)
        })

        it('not edit other users profiles', (): void => {
            cy.openSearchTab()
            cy.getDataCy('search').type(seedUser2.first_name as string)
            cy.getDataCy('user-search-results')
            .find('polity-search-profile-result')
            .shouldBeVisible()
            .contains(seedUser2.first_name as string)
            .click()
            cy.getDataCy('nav-profile-edit', 'nav-profile-edit-desktop')
            .should('not.exist')
        })
    })
})
