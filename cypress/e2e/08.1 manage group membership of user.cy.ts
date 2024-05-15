import {Size, Sizes} from "../fixtures/size";
import {AUTH_DATA1, AUTH_DATA2, AuthData} from "../../seed_and_test_data/01_test_auth";

const signedInUserAuth: AuthData = AUTH_DATA1;
const otherUser: AuthData = AUTH_DATA2;

Sizes.forEach((size: Size): void => {
    describe(`Manage group memberships of user tests with screen size ${size.width} show that  `, (): void => {
        before((): void => {

        })

        beforeEach((): void => {
            cy.resetSupabase()
            cy.viewport(size.width, size.height)
            cy.visit('landing/sign-in');
            cy.signIn(signedInUserAuth);
        })

        it(' users can see their group memberships on their group overview page', (): void => {
            cy.navigateToHome();

            cy.

        })

        it(' users can see their group requests on their group overview page', (): void => {

        })

        it(' users can see their group invitations on their group overview page', (): void => {

        })

        it(' users can leave a group from their group overview page', (): void => {

        })

        it(' users can withdraw a group request from their group overview page', (): void => {

        })

        it(' users can accept a group invitation from their group overview page', (): void => {

        })

        it(' users can decline a group invitation from their group overview page', (): void => {

        })

        it(' users can leave a group from the groups page if they are member', (): void => {

        })

        it(' users can withdraw a group request from the groups page if they have requested membership' +
            ' page', (): void => {

        })

        it(' users can accept a group invitation from the groups page if they were invited', (): void => {

        })

        it(' users can decline a group invitation from the groups page if they were invited', (): void => {

        })

    })
});
