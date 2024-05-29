import {supabaseAuthenticatedClient} from "../../src/app/auth/supabase-authenticated-client";
import {AuthTokenResponse} from "@supabase/supabase-js";
import {AUTH_DATA1, AUTH_DATA9, AuthData} from "../../seed_and_test_data/01_test_auth";
import {Group, GROUP1} from "../../seed_and_test_data/07_test_groups";
import {POSTGRES_ERRORS} from "../fixtures/postgres_errors";

const followUser: AuthData = AUTH_DATA9;
const unFollowUser: AuthData = AUTH_DATA1;
const otherGroup: Group = GROUP1;
// ATTENTION: test 2 depends on test 1
describe(`Negative api tests for the group following feature show that `, async (): Promise<void> => {

    let user_id: string | undefined;
    let token: string | undefined;
    const GROUP_TEST_ID: string = otherGroup.id;
    const USER_TEST_ID: string = unFollowUser.id;

    before((): void => {
        cy.resetSupabase()
    })

    beforeEach(async (): Promise<void> => {
        const response: AuthTokenResponse = await supabaseAuthenticatedClient.auth.signInWithPassword(
            {
                email: followUser.email,
                password: followUser.password,
            }
        )
        user_id = response.data.user?.id
        token = response.data.session?.access_token
        expect(user_id).to.be.not.null
        expect(token).to.be.not.null
    })

    it('a non admin (e.g. member or no member) can not view followers of a group', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        .rpc('read_follower_of_group',
            {
                group_id_in: GROUP_TEST_ID
            },
        )
        expect(response.data).to.be.an('array').that.is.empty
        console.log(response.data)
        console.log(response.error?.code)
        expect(response.error?.code).to.be.undefined
    })

    it('an authenticated user can call the follow group transaction but can not call it twice', async (): Promise<void> => {
        cy.resetSupabase()
        const response = await supabaseAuthenticatedClient
        .rpc('follow_group_transaction',
            {
                following_id: GROUP_TEST_ID,
            },
        )
        expect(response.data).to.be.null
        expect(response.error).to.be.null

        const response2 = await supabaseAuthenticatedClient
        .rpc('follow_group_transaction',
            {
                following_id: GROUP_TEST_ID,
            },
        )
        expect(response2.data).to.be.null
        expect(response2.error?.code).to.be.equal(POSTGRES_ERRORS.unique_violated)

    })

    it('an authenticated user can call the unfollow group transaction but can not call it twice', async (): Promise<void> => {
        cy.resetSupabase()
        const response = await supabaseAuthenticatedClient
        .rpc('unfollow_group_transaction',
            {
                following_id: GROUP_TEST_ID,
            },
        )
        expect(response.data).to.be.null
        expect(response.error).to.be.null

        const response2 = await supabaseAuthenticatedClient
        .rpc('unfollow_group_transaction',
            {
                following_id: GROUP_TEST_ID,
            },
        )
        expect(response2.data).to.be.null
        expect(response2.error?.code).to.be.equal(POSTGRES_ERRORS.column_not_existing)
    })

    it('a non authenticated user can not call the follow group transaction', async (): Promise<void> => {
        await supabaseAuthenticatedClient.auth.signOut()

        const response = await supabaseAuthenticatedClient
        .rpc('follow_group_transaction',
            {
                following_id: GROUP_TEST_ID,
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.noPermission)
    })

    it('a non authenticated user can not execute the unfollow group transaction', async (): Promise<void> => {
        await supabaseAuthenticatedClient.auth.signOut()

        const response = await supabaseAuthenticatedClient
        .rpc('unfollow_group_transaction',
            {
                following_id: GROUP_TEST_ID,
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.noPermission)
    })

    it('the group_counter  increment function is not publicly available', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .rpc('increment_group_follower_counter', {user_id: GROUP_TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('the group_counter following decrement function is not publicly available', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .rpc('decrement_group_follower_counter', {user_id: GROUP_TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('the group_counter following increment function is not publicly available', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .rpc('increment_group_following_counter', {user_id: GROUP_TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('the profile_counter following decrement function is not publicly available', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .rpc('decrement_group_following_counter', {user_id: GROUP_TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('the create_group_following_follower_relationship function is not publicly available', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .rpc('create_group_following_follower_relationship', {user_id: GROUP_TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('the delete_group_following_follower_relationship function is not publicly available', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .rpc('delete_group_following_follower_relationship', {user_id: GROUP_TEST_ID})
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('the group_counter api table not public selectable', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .from('groups_counters')
        .select('')
        .eq('id', GROUP_TEST_ID)
        .single();
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.undefined_table)
    })

    it('the following_groups api table not public selectable', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        // @ts-ignore
        .from('following_groups')
        .select('')
        .eq('id', GROUP_TEST_ID)
        .single();
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.equal(POSTGRES_ERRORS.undefined_table)
    })

    it('an authenticated user only checks if he follows a user and not if other user follow each other', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        .rpc('check_if_following_group',
            {
                following_id: GROUP_TEST_ID,
                // @ts-ignore
                userid: GROUP_TEST_ID
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('an authenticated user can only view its own followings', async (): Promise<void> => {
        const response = await supabaseAuthenticatedClient
        .rpc('read_group_followings_of_user',
            {
                // @ts-ignore
                userid: GROUP_TEST_ID
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('a non authenticated user can not view counters', async (): Promise<void> => {
        supabaseAuthenticatedClient.auth.signOut()

        const response = await supabaseAuthenticatedClient
        .rpc('read_group_counter',
            {
                group_id_in: GROUP_TEST_ID
            },
        )
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    })

    it('a non admin (e.g. member or no member) can not delete a follower of a group', async (): Promise<void> => {

        // const response = await supabaseClient
        // .rpc('remove_group_follower_transaction',
        //     {
        //         follower_id: 'ff6cc644-ec9e-45dc-a98a-1186e091674f',// USER_TEST_ID,
        //         group_id_in: '863a7ec4-0ae5-4622-90ce-c0ffbaaf18f3'// GROUP_TEST_ID
        //     },
        // )

        const response = await supabaseAuthenticatedClient
        .rpc('remove_group_follower_transaction',
            {
                follower_id: followUser.id,// USER_TEST_ID,
                group_id_in: '863a7ec4-0ae5-4622-90ce-c0ffbaaf18f3'// GROUP_TEST_ID
            },
        )
        console.log(response.data)
        console.log(response.error)
        expect(response.data).to.be.null
        expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing, POSTGRES_ERRORS.column_not_existing])
    })

    // it('an authenticated user can only update its own receive_notification status.', async (): Promise<void> => {
    //     const response = await supabaseClient
    //     .rpc('update_receive_notifications_from_follow',
    //         {
    //             // @ts-ignore
    //             user_id: TEST_ID
    //         },
    //     )
    //     expect(response.data).to.be.null
    //     expect(response.error?.code).to.be.oneOf([POSTGRES_ERRORS.noPermission, POSTGRES_ERRORS.function_not_existing])
    // })
})
