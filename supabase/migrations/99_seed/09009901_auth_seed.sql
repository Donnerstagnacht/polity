-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

WITH
    auth_json (doc) AS (
        VALUES
            ('[
                {
                    "instance_id": "00000000-0000-0000-0000-000000000000",
                    "id": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "aud": "authenticated",
                    "role": "authenticated",
                    "email": "user1@gmail.com",
                    "password": "12345678",
                    "encrypted_password": "$2a$10$X2B4kwBYyMzt54HgToaMvekAz1lCy8CvMV7FMoU3IjPXnsl8PjBMy",
                    "email_confirmed_at": "2024-01-01 16:15:00.697049+00",
                    "invited_at": "2022-06-24T17:22:59.653Z",
                    "confirmation_token": "",
                    "confirmation_sent_at": "2022-06-24T17:22:59.653Z",
                    "recovery_token": "",
                    "recovery_sent_at": "2022-06-24T17:22:59.653Z",
                    "email_change_token_new": "",
                    "email_change": "",
                    "email_change_sent_at": "2022-06-24T17:22:59.653Z",
                    "last_sign_in_at": "2022-06-24T17:22:59.657Z",
                    "raw_app_meta_data": {
                        "provider": "email",
                        "providers": [
                            "email"
                        ]
                    },
                    "raw_user_meta_data": {},
                    "is_super_admin": "FALSE",
                    "created_at": "2022-06-24T17:22:59.649Z",
                    "updated_at": "2022-06-24T17:22:59.649Z",
                    "phone": "hgvhgvgvhg6767",
                    "phone_confirmed_at": "2022-06-24T17:22:59.649Z",
                    "phone_change": "",
                    "phone_change_token": "",
                    "phone_change_sent_at": "2022-06-24T17:22:59.653Z",
                    "confirmed_at": "2022-06-24T17:22:59.653Z",
                    "email_change_token_current": "",
                    "email_change_confirm_status": "1",
                    "banned_until": "2022-06-24T17:22:59.653Z",
                    "reauthentication_token": "",
                    "reauthentication_sent_at": "2022-06-24T17:22:59.653Z",
                    "is_sso_user": "FALSE",
                    "deleted_at": "2022-06-24T17:22:59.649Z"
                },
                {
                    "instance_id": "00000000-0000-0000-0000-000000000000",
                    "id": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "aud": "authenticated",
                    "role": "authenticated",
                    "email": "user2@gmail.com",
                    "password": "12345678",
                    "encrypted_password": "$2a$10$X2B4kwBYyMzt54HgToaMvekAz1lCy8CvMV7FMoU3IjPXnsl8PjBMy",
                    "email_confirmed_at": "2024-01-01 16:15:00.697049+00",
                    "raw_app_meta_data": {
                        "provider": "email",
                        "providers": [
                            "email"
                        ]
                    },
                    "raw_user_meta_data": {}
                },
                {
                    "instance_id": "00000000-0000-0000-0000-000000000000",
                    "id": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
                    "aud": "authenticated",
                    "role": "authenticated",
                    "email": "user3@gmail.com",
                    "password": "12345678",
                    "encrypted_password": "$2a$10$X2B4kwBYyMzt54HgToaMvekAz1lCy8CvMV7FMoU3IjPXnsl8PjBMy",
                    "email_confirmed_at": "2024-01-01 16:15:00.697049+00",
                    "raw_app_meta_data": {
                        "provider": "email",
                        "providers": [
                            "email"
                        ]
                    },
                    "raw_user_meta_data": {}
                },
                {
                    "instance_id": "00000000-0000-0000-0000-000000000000",
                    "id": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "aud": "authenticated",
                    "role": "authenticated",
                    "email": "user4@gmail.com",
                    "password": "12345678",
                    "encrypted_password": "$2a$10$X2B4kwBYyMzt54HgToaMvekAz1lCy8CvMV7FMoU3IjPXnsl8PjBMy",
                    "email_confirmed_at": "2024-01-01 16:15:00.697049+00",
                    "raw_app_meta_data": {
                        "provider": "email",
                        "providers": [
                            "email"
                        ]
                    },
                    "raw_user_meta_data": {}
                },
                {
                    "instance_id": "00000000-0000-0000-0000-000000000000",
                    "id": "2d196d44-ae7f-4999-b080-e8a0db639c65",
                    "aud": "authenticated",
                    "role": "authenticated",
                    "email": "user5@gmail.com",
                    "password": "12345678",
                    "encrypted_password": "$2a$10$X2B4kwBYyMzt54HgToaMvekAz1lCy8CvMV7FMoU3IjPXnsl8PjBMy",
                    "email_confirmed_at": "2024-01-01 16:15:00.697049+00",
                    "raw_app_meta_data": {
                        "provider": "email",
                        "providers": [
                            "email"
                        ]
                    },
                    "raw_user_meta_data": {}
                },
                {
                    "instance_id": "00000000-0000-0000-0000-000000000000",
                    "id": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "aud": "authenticated",
                    "role": "authenticated",
                    "email": "user6@gmail.com",
                    "password": "12345678",
                    "encrypted_password": "$2a$10$X2B4kwBYyMzt54HgToaMvekAz1lCy8CvMV7FMoU3IjPXnsl8PjBMy",
                    "email_confirmed_at": "2024-01-01 16:15:00.697049+00",
                    "raw_app_meta_data": {
                        "provider": "email",
                        "providers": [
                            "email"
                        ]
                    },
                    "raw_user_meta_data": {}
                },
                {
                    "instance_id": "00000000-0000-0000-0000-000000000000",
                    "id": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "aud": "authenticated",
                    "role": "authenticated",
                    "email": "user7@gmail.com",
                    "password": "12345678",
                    "encrypted_password": "$2a$10$X2B4kwBYyMzt54HgToaMvekAz1lCy8CvMV7FMoU3IjPXnsl8PjBMy",
                    "email_confirmed_at": "2024-01-01 16:15:00.697049+00",
                    "raw_app_meta_data": {
                        "provider": "email",
                        "providers": [
                            "email"
                        ]
                    },
                    "raw_user_meta_data": {}
                },
                {
                    "instance_id": "00000000-0000-0000-0000-000000000000",
                    "id": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "aud": "authenticated",
                    "role": "authenticated",
                    "email": "user8@gmail.com",
                    "password": "12345678",
                    "encrypted_password": "$2a$10$X2B4kwBYyMzt54HgToaMvekAz1lCy8CvMV7FMoU3IjPXnsl8PjBMy",
                    "email_confirmed_at": "2024-01-01 16:15:00.697049+00",
                    "raw_app_meta_data": {
                        "provider": "email",
                        "providers": [
                            "email"
                        ]
                    },
                    "raw_user_meta_data": {}
                },
                {
                    "instance_id": "00000000-0000-0000-0000-000000000000",
                    "id": "eada6e0c-e432-4af8-b238-71394e0866bc",
                    "aud": "authenticated",
                    "role": "authenticated",
                    "email": "user9@gmail.com",
                    "password": "12345678",
                    "encrypted_password": "$2a$10$X2B4kwBYyMzt54HgToaMvekAz1lCy8CvMV7FMoU3IjPXnsl8PjBMy",
                    "email_confirmed_at": "2024-01-01 16:15:00.697049+00",
                    "raw_app_meta_data": {
                        "provider": "email",
                        "providers": [
                            "email"
                        ]
                    },
                    "raw_user_meta_data": {}
                },
                {
                    "instance_id": "00000000-0000-0000-0000-000000000000",
                    "id": "1c8171bb-36bd-41ff-b207-a5d219e53740",
                    "aud": "authenticated",
                    "role": "authenticated",
                    "email": "user10@gmail.com",
                    "password": "12345678",
                    "encrypted_password": "$2a$10$X2B4kwBYyMzt54HgToaMvekAz1lCy8CvMV7FMoU3IjPXnsl8PjBMy",
                    "email_confirmed_at": "2024-01-01 16:15:00.697049+00",
                    "raw_app_meta_data": {
                        "provider": "email",
                        "providers": [
                            "email"
                        ]
                    },
                    "raw_user_meta_data": {}
                }
            ]
            '::json)
    )
INSERT
INTO
    auth.users (instance_id, --1
                id, --2
                aud, --3
                role, --4
                email, --5
    --encrypted_password, --6
    --email_confirmed_at, --7
    --invited_at, --8
    --confirmation_token, --9
    --confirmation_sent_at, --10
    --recovery_token, --11
    --recovery_sent_at, --12
    --email_change_token_new, --13
    --email_change, --14
    --email_change_sent_at, --15
    --last_sign_in_at, --16
                raw_app_meta_data, --17
                raw_user_meta_data --18
    --is_super_admin, --19
    --created_at, --20
    --updated_at, --21
    --phone, --22
    --phone_confirmed_at, --23
    --phone_change, --24
    --phone_change_token, --25
    --phone_change_sent_at, --26
    --confirmed_at --missing? --27
    --email_change_token_current, --28
    --email_change_confirm_status, --29
    --banned_until, --30
    --reauthentication_token, --31
    --reauthentication_sent_at, --32
    --is_sso_user --new? --33
    --deleted_at --new? --34
)
SELECT
    instance_id,       --1
    id,                --2
    aud,               --3
    role,              --4
    email,             --5
    --encrypted_password, --6
    --email_confirmed_at, --7
--invited_at, --8
--confirmation_token, --9
--confirmation_sent_at, --10
--recovery_token, --11
--recovery_sent_at, --12
--email_change_token_new, --13
--email_change, --14
--email_change_sent_at, --15
--last_sign_in_at, --16
    raw_app_meta_data, --17
    raw_user_meta_data --18
--is_super_admin, --19
--created_at, --20
--updated_at, --21
--phone, --22
--phone_confirmed_at, --23
--phone_change, --24
--phone_change_token, --25
--phone_change_sent_at, --26
--confirmed_at, --27
--email_change_token_current, --28
--email_change_confirm_status, --29
--banned_until, --30
--reauthentication_token, --31
--reauthentication_sent_at, --32
--is_sso_user --33
--deleted_at --34
FROM
    auth_json a
    CROSS JOIN LATERAL JSON_POPULATE_RECORDSET(NULL::auth.users, doc) AS u;


UPDATE auth.users
SET
    encrypted_password     = '$2a$10$WB.1YZRHv1JWNwV4l1Es8e5hVzDe2m/E9sO.1WOp836dTcPkayKZ2',
    last_sign_in_at        = '2024-01-01 16:38:49.847114+00',
    created_at             = '2024-01-01 16:38:49.847114+00',
    updated_at             = '2024-01-01 16:38:49.847114+00',
    email_confirmed_at     = '2024-01-01 16:38:49.847114+00',
    email_change           = '',
    email_change_token_new = '',
    confirmation_token     = '',
    recovery_token         = '';
