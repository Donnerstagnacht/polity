import {ProfileTest} from "../../src/app/features/profile/types-and-interfaces/profile";


declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to select one or two DOM element by a data-cy attribute.
             *@param {string} value - The value of the data-cy attribute
             *@param {string} value - The value of a second data-cy attribute
             */
            getDataCy(value: string, value2?: string): Chainable<Element>

            /**
             * Custom command to test if selected element is visible.
             */
            shouldBeVisible(): Chainable<Element>


            /**
             * Custom command to test if a selected element contains a value.
             *
             * @param {string} value - The value to check if it is contained in the selected element.
             */
            andContain(value: string): Chainable<Element>

            /**
             * Sign in a user with the given profile.
             *
             * @param {ProfileTest} profile - The profile information of the user.
             */
            signIn(profileTest: ProfileTest): Chainable<Element>

            /**
             * Custom command to test if user can open the search tab.
             */
            openSearchTab(): Chainable<Element>

            /**
             * Searches a user by a given firstname.
             *
             * @param {string} firstName - The firstName of the user.
             */
            searchUser(firstName: string): Chainable<Element>

            /**
             * Follows a user.
             *
             * @param {ProfileTest}  followingUser - The profile who is being followed.
             * @param {ProfileTest} followUser - The profile who follows the other user.
             */
            followUser(
                followingUser: ProfileTest,
                followUser: ProfileTest
            ): Chainable<Element>

            /**
             * Navigates to the 'HOME' tab.
             */
            navigateToHome(): Chainable<Element>

            /**
             * Signs out a signed-in user.
             *
             * @param {ProfileTest} signedInUser - The signed-in user.
             */
            signOut(signedInUser: ProfileTest): Chainable<Element>
        }
    }
}
