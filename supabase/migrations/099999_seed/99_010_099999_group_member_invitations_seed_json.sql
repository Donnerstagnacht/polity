WITH
    group_invited_members (doc) AS (
        VALUES
            ('[
                {
                    "id": "6c5e00cc-c2b6-44fa-8fcc-28b1eaff979e",
                    "group_id": "1fb8eba2-6c5d-4c5d-a603-8eeb5d1214f9",
                    "member_id": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "member_type": "member"
                },
                {
                    "id": "d5b52b63-13ed-4acb-ac9e-e7217122a075",
                    "group_id": "1fb8eba2-6c5d-4c5d-a603-8eeb5d1214f9",
                    "member_id": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "member_type": "member"
                },
                {
                    "id": "d79732b0-9188-4bb2-a737-a95ae8312d0f",
                    "group_id": "1fb8eba2-6c5d-4c5d-a603-8eeb5d1214f9",
                    "member_id": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "member_type": "member"
                },
                {
                    "id": "7ad13c40-9b33-4761-a479-06c9284ba073",
                    "group_id": "863a7ec4-0ae5-4622-90ce-c0ffbaaf18f3",
                    "member_id": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "member_type": "member"
                },
                {
                    "id": "ca06383e-fc74-427a-962a-dd8209344bdb",
                    "group_id": "863a7ec4-0ae5-4622-90ce-c0ffbaaf18f3",
                    "member_id": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "member_type": "member"
                },
                {
                    "id": "75b99339-d004-47ee-adc2-7769233f7289",
                    "group_id": "863a7ec4-0ae5-4622-90ce-c0ffbaaf18f3",
                    "member_id": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "member_type": "member"
                },
                {
                    "id": "b5738e3f-d709-43f5-89c2-2a10a222e77d",
                    "group_id": "5ce91eb6-f16b-439a-ab61-d5ffe12e5087",
                    "member_id": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "member_type": "member"
                },
                {
                    "id": "4c786291-9829-4f0b-9035-8804bde0ca49",
                    "group_id": "5ce91eb6-f16b-439a-ab61-d5ffe12e5087",
                    "member_id": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "member_type": "member"
                },
                {
                    "id": "5a94d25b-ccea-42b0-9a5c-936f4c18c904",
                    "group_id": "5ce91eb6-f16b-439a-ab61-d5ffe12e5087",
                    "member_id": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "member_type": "member"
                }
            ]
            '::json)
    )
INSERT
INTO
    hidden.group_invited_members (id,
                                  group_id,
                                  member_id,
                                  member_type)
SELECT
    id,
    group_id,
    member_id,
    member_type
FROM
    group_invited_members l
    CROSS JOIN LATERAL JSON_POPULATE_RECORDSET(
        NULL::hidden.group_invited_members,
        doc) AS f;
