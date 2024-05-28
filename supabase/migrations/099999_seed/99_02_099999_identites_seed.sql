-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

WITH
    auth_identities_json (doc) AS (
        VALUES
            ('[
                {
                    "provider_id": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "user_id": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "identity_data": {
                        "sub": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                        "email": "user1@gmail.com",
                        "email_verified": false,
                        "phone_verified": false
                    },
                    "provider": "email",
                    "last_sign_in_at": "2024-01-01 16:02:39.256589+00",
                    "created_at": "2024-01-01 16:02:39.256589+00",
                    "updated_at": "2024-01-01 16:02:39.256589+00"
                },
                {
                    "provider_id": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "user_id": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "identity_data": {
                        "sub": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                        "email": "user4@gmail.com",
                        "email_verified": false,
                        "phone_verified": false
                    },
                    "provider": "email",
                    "last_sign_in_at": "2024-01-01 16:02:39.256589+00",
                    "created_at": "2024-01-01 16:02:39.256589+00",
                    "updated_at": "2024-01-01 16:02:39.256589+00"
                }
            ]
            '::json)
    )
INSERT
INTO
    auth.identities (provider_id,
                     user_id,
                     identity_data,
                     provider,
                     last_sign_in_at,
                     created_at,
                     updated_at
    --email
    --id
)
SELECT
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
--email
--id
FROM
    auth_identities_json a
    CROSS JOIN LATERAL JSON_POPULATE_RECORDSET(NULL::auth.identities, doc) AS u;
