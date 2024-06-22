WITH
    profiles_json (doc) AS (
        VALUES
            ('[
                {
                    "id": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "first_name": "Fabian",
                    "last_name": "Bäcker",
                    "profile_image": "user1.jpg"
                },
                {
                    "id": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "first_name": "Laura",
                    "last_name": "Müller",
                    "profile_image": "user2.jpg"
                },
                {
                    "id": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
                    "first_name": "Lars",
                    "last_name": "Berg",
                    "profile_image": "user3.jpg"
                },
                {
                    "id": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "first_name": "Pia",
                    "last_name": "Roller",
                    "profile_image": "user4.jpg"
                },
                {
                    "id": "2d196d44-ae7f-4999-b080-e8a0db639c65",
                    "first_name": "Tobias",
                    "last_name": "Kling",
                    "profile_image": "user5.jpg"
                },
                {
                    "id": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "first_name": "Maya",
                    "last_name": "Lieb",
                    "profile_image": "user6.jpg"
                },
                {
                    "id": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "first_name": "Lennart",
                    "last_name": "Lang",
                    "profile_image": "user7.jpg"
                },
                {
                    "id": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "first_name": "Viki",
                    "last_name": "Frieden",
                    "profile_image": "user8.jpg"
                },
                {
                    "id": "eada6e0c-e432-4af8-b238-71394e0866bc",
                    "first_name": "Jens",
                    "last_name": "Spielberg",
                    "profile_image": "user9.jpg"
                },
                {
                    "id": "1c8171bb-36bd-41ff-b207-a5d219e53740",
                    "first_name": "Anna",
                    "last_name": "Lieder",
                    "profile_image": "user10.jpg"
                }
            ]
            '::json)
    )
UPDATE hidden.profiles AS p
SET
    first_name    = json_data.first_name,
    last_name     = json_data.last_name,
    profile_image = json_data.profile_image
FROM
    (
        SELECT
            (JSON_ARRAY_ELEMENTS(doc) ->> 'id')::uuid      AS id,
            (JSON_ARRAY_ELEMENTS(doc) ->> 'first_name')    AS first_name,
            (JSON_ARRAY_ELEMENTS(doc) ->> 'last_name')     AS last_name,
            (JSON_ARRAY_ELEMENTS(doc) ->> 'profile_image') AS profile_image
        FROM
            profiles_json
    ) AS json_data
WHERE
    p.id = json_data.id;
