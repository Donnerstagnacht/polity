WITH
    assistants_json (doc) AS (
        VALUES
            ('[
                {
                    "id": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "first_sign_in": "TRUE",
                    "skip_tutorial": "FALSE",
                    "last_tutorial": "welcome"
                },
                {
                    "id": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "first_sign_in": "TRUE",
                    "skip_tutorial": "FALSE",
                    "last_tutorial": "welcome"
                },
                {
                    "id": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
                    "first_sign_in": "TRUE",
                    "skip_tutorial": "FALSE",
                    "last_tutorial": "welcome"
                },
                {
                    "id": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "first_sign_in": "TRUE",
                    "skip_tutorial": "FALSE",
                    "last_tutorial": "welcome"
                },
                {
                    "id": "2d196d44-ae7f-4999-b080-e8a0db639c65",
                    "first_sign_in": "TRUE",
                    "skip_tutorial": "FALSE",
                    "last_tutorial": "welcome"
                },
                {
                    "id": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "first_sign_in": "TRUE",
                    "skip_tutorial": "FALSE",
                    "last_tutorial": "welcome"
                },
                {
                    "id": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "first_sign_in": "TRUE",
                    "skip_tutorial": "FALSE",
                    "last_tutorial": "welcome"
                },
                {
                    "id": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "first_sign_in": "TRUE",
                    "skip_tutorial": "FALSE",
                    "last_tutorial": "welcome"
                },
                {
                    "id": "eada6e0c-e432-4af8-b238-71394e0866bc",
                    "first_sign_in": "TRUE",
                    "skip_tutorial": "FALSE",
                    "last_tutorial": "welcome"
                },
                {
                    "id": "1c8171bb-36bd-41ff-b207-a5d219e53740",
                    "first_sign_in": "TRUE",
                    "skip_tutorial": "FALSE",
                    "last_tutorial": "welcome"
                }
            ]'::json)
    )
UPDATE authenticated_access.assistants AS a
SET
    first_sign_in = json_data.first_sign_in,
    skip_tutorial = json_data.skip_tutorial,
    last_tutorial = json_data.last_tutorial
FROM
    (
        SELECT
            (JSON_ARRAY_ELEMENTS(doc) ->> 'id')::uuid                     AS id,
            (JSON_ARRAY_ELEMENTS(doc) ->> 'first_sign_in')::boolean       AS first_sign_in,
            (JSON_ARRAY_ELEMENTS(doc) ->> 'skip_tutorial')::boolean       AS skip_tutorial,
            (JSON_ARRAY_ELEMENTS(doc) ->> 'last_tutorial')::tutorial_enum AS last_tutorial

        FROM
            assistants_json
    ) AS json_data
WHERE
    a.id = json_data.id;
