import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";
import {Profile, PROFILE2} from "../../seed_and_test_data/02_test_profiles";
import {Group, GROUP1} from "../../seed_and_test_data/07_test_groups";
import {Size, Sizes} from "../fixtures/size";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;
const searchedUser: Profile = PROFILE2;
const groupOfUser: Group = GROUP1

Sizes.forEach((size: Size): void => {


    describe(`Feature create group tests with screen size ${size.width} show that `, (): void => {

        before((): void => {
            cy.resetSupabase()
        })

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.visit('landing/sign-in');
            cy.signIn(signedInUserAuth);
        })

        let randomNumber: number = Math.floor(Math.random() * 10000000);
        const nameOfNewGroup: string = 'testName' + randomNumber;

        randomNumber = Math.floor(Math.random() * 10000000);
        const descriptionOfNewGroup: string = 'test' + randomNumber;

        it('users can create a new group.', async (): Promise<void> => {
            cy.getDataCy('nav-new', 'nav-new-desktop')
            .filter(':visible')
            .first()
            .click()

            cy.getDataCy('createGroup')
            .shouldBeVisible()
            .click()


            cy.getDataCy('groupNameInput')
            .type(nameOfNewGroup)

            cy.getDataCy('levelRegional')
            .click()

            cy.getDataCy('groupDescriptionInput')
            .type(descriptionOfNewGroup)

            cy.interceptSupabaseCall('search_user').as('searchUser')
            cy.getDataCy('inviteMemberToNewGroup')
            .type(searchedUser.first_name + ' ' + searchedUser.last_name)
            cy.wait('@searchUser')

            cy.getDataCy('inviteMemberSearchResult')
            .click()

            cy.getDataCy('user_first_name')
            .shouldBeVisible()
            .contains(searchedUser.first_name)
            .next()
            .children()

            cy.getDataCy('createGroupButton')
            .click()
        })

        it('the new group is added on the home menu and can be visited', async (): Promise<void> => {
            cy.navigateToHome();

            cy.getDataCy('to-group-of-user')
            .contains(groupOfUser.name)
            .click()

            cy.getDataCy('first-name')
            .contains(groupOfUser.name)
        })

        it('the group creator should be added as admin to the new group and the admin menu should be displayed.', async (): Promise<void> => {
            cy.navigateToHome();
            cy.getDataCy('to-group-of-user')
            .contains(nameOfNewGroup)
            .click()

            cy.getDataCy('nav-group-edit-desktop', 'nav-group-edit')
            .shouldBeVisible()
        })

        it('the groups statistics shows one group member plus each invited member.', async (): Promise<void> => {
            cy.navigateToHome();
            cy.getDataCy('to-group-of-user')
            .contains(nameOfNewGroup)
            .click()

            cy.getDataCy('memberCounter')
            .shouldBeVisible()
            .contains(2)
        })

        it('the group wiki shows name and level.', async (): Promise<void> => {
            cy.navigateToHome();
            cy.getDataCy('to-group-of-user')
            .contains(nameOfNewGroup)
            .click()

            cy.getDataCy('first-name')
            .shouldBeVisible()
            .contains(nameOfNewGroup)
        })

        // it('a group with the same name can not be created twice.', async (): Promise<void> => {
        //     // TODO test implementation
        // })
    })
});
