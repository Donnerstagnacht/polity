import {SupabaseFunctionName} from "../../supabase/types/supabase.shorthand-types";
import {AuthData} from "../../seed_and_test_data/01_test_auth";
import {Profile} from "../../seed_and_test_data/02_test_profiles";
import {ProfileCounter} from "../../seed_and_test_data/04_test_profile_counters";


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
             * Custom command to select one or two DOM element by a data-cy attribute.
             *@param {string} value - The value of the data-cy attribute
             *@param {string} value - The value of a second data-cy attribute
             */
            interceptSupabaseCall(endPoint: SupabaseFunctionName): Chainable<Element>

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
             * @param {AuthData} profile - The profile information of the user.
             */
            signIn(authData: AuthData): Chainable<Element>

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
             * Searches a group by a given name.
             *
             * @param {string} name - The name of the group.
             */
            searchGroup(name: string): Chainable<Element>

            /**
             * Follows a user's profile by updating the counters and returning a Chainable element.
             *
             * @param {Profile} userWhoIsFollowedProfile - The profile of the user who is being followed.
             * @param {ProfileCounter} userWhoIsFollowedCounter - The counter of the user who is being followed.
             * @param {Profile} userWhoFollowsProfile - The profile of the user who is following.
             * @param {ProfileCounter} userWhoFollowsCounter - The counter of the user who is following.
             * @return {Chainable<Element>} - A Chainable element.
             */
            followUser(
                userWhoIsFollowedProfile: Profile,
                userWhoIsFollowedCounter: ProfileCounter,
                userWhoFollowsProfile: Profile,
                userWhoFollowsCounter: ProfileCounter
            ): Chainable<Element>

            /**
             * Navigates to the 'HOME' tab.
             */
            navigateToHome(): Chainable<Element>

            /**
             * Signs out a signed-in user.
             *
             * @param {AuthData} signedInUser - The signed-in user.
             */
            signOut(signedInUser: AuthData): Chainable<Element>

            /**
             * Signs up a new user.
             *
             * @param {AuthData} newUser - The new user.
             */
            signUp(newUser: AuthData): Chainable<string>

            /**
             * Custom command to reset supabase
             */
            resetSupabase(): boolean
        }
    }
}
