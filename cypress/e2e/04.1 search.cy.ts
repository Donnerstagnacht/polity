import {Size, Sizes} from "../fixtures/size";
import {AUTH_DATA1, AuthData} from "../../seed_and_test_data/01_test_auth";
import {Profile, PROFILE1} from "../../seed_and_test_data/02_test_profiles";
import {Group, GROUP1} from "../../seed_and_test_data/07_test_groups";

const userWhoSearches: AuthData = AUTH_DATA1;
const searchedUser: Profile = PROFILE1;
const searchedGroup: Group = GROUP1;

Sizes.forEach((size: Size): void => {
    describe(`Search tests with screen size ${size.width} show that users can `, () => {
        before((): void => {
            cy.resetSupabase()
        })

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.visit('landing/sign-in');
            cy.signIn(userWhoSearches);
        })

        it('search other users by their first name.', (): void => {
            cy.searchUser(searchedUser.first_name as string);
        })

        it('search other users by their last name.', (): void => {
            cy.searchUser(searchedUser.last_name as string);
        })

        it('search other users by their first and last name.', (): void => {
            cy.searchUser(searchedUser.first_name + ' ' + searchedUser.last_name);
        })

        it('search a group by the groups name.', (): void => {
            cy.searchGroup(searchedGroup.name)
        })
    })
})
