import {Size, Sizes} from "../fixtures/size";
import {ProfileTest} from "../../src/app/features/profile/types-and-interfaces/profile";
import {seedReadUser2} from "../fixtures/user";

const loggedInUser: ProfileTest = seedReadUser2;
const searchedUser: ProfileTest = seedReadUser2;

Sizes.forEach((size: Size): void => {
    describe(`Search tests with screen size ${size.width} show that users can `, () => {

        beforeEach((): void => {
            cy.viewport(size.width, size.height)
            cy.signIn(loggedInUser);
        })

        it('search other users by their first name.', (): void => {
            cy.searchUser(searchedUser.first_name);
        })

        it('search other users by their last name.', (): void => {
            cy.searchUser(searchedUser.last_name);
        })

        it('search other users by their first and last name.', (): void => {
            cy.searchUser(searchedUser.first_name + ' ' + searchedUser.last_name);
        })
    })
})
