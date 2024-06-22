WITH
    following_relationships_json (doc) AS (
        VALUES
            ('[
                {
                    "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
                },
                {
                    "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
                },
                {
                    "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
                },
                {
                    "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
                },
                {
                    "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
                },
                {
                    "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
                },
                {
                    "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
                },
                {
                    "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
                },
                {
                    "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
                },
                {
                    "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
                },
                {
                    "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
                },
                {
                    "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
                },
                {
                    "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
                },
                {
                    "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
                },
                {
                    "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
                },
                {
                    "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
                },
                {
                    "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
                },
                {
                    "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
                },
                {
                    "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
                    "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
                },
                {
                    "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
                    "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
                },
                {
                    "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
                    "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
                },
                {
                    "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
                    "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
                },
                {
                    "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
                    "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
                },
                {
                    "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
                    "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
                },
                {
                    "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
                    "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
                },
                {
                    "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
                    "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
                },
                {
                    "follower": "71aa5d19-43d8-4063-839d-114a0ad49ed7",
                    "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
                },
                {
                    "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
                },
                {
                    "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
                },
                {
                    "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
                },
                {
                    "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
                },
                {
                    "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
                },
                {
                    "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
                },
                {
                    "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
                },
                {
                    "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
                },
                {
                    "follower": "94875c0e-fa45-4504-828a-6ec9f21a49ca",
                    "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
                },
                {
                    "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
                    "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
                },
                {
                    "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
                    "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
                },
                {
                    "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
                    "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
                },
                {
                    "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
                    "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
                },
                {
                    "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
                    "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
                },
                {
                    "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
                    "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
                },
                {
                    "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
                    "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
                },
                {
                    "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
                    "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
                },
                {
                    "follower": "2d196d44-ae7f-4999-b080-e8a0db639c65",
                    "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
                },
                {
                    "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
                },
                {
                    "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
                },
                {
                    "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
                },
                {
                    "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
                },
                {
                    "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
                },
                {
                    "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
                },
                {
                    "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
                },
                {
                    "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
                },
                {
                    "follower": "393bc641-eaa3-45a2-9a2a-ab16dc62424b",
                    "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
                },
                {
                    "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
                },
                {
                    "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
                },
                {
                    "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
                },
                {
                    "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
                },
                {
                    "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
                },
                {
                    "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
                },
                {
                    "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
                },
                {
                    "follower": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce",
                    "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
                },
                {
                    "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
                },
                {
                    "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
                },
                {
                    "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
                },
                {
                    "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
                },
                {
                    "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
                },
                {
                    "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
                },
                {
                    "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
                },
                {
                    "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
                },
                {
                    "follower": "437bf909-34c5-4e54-b1eb-799771159cd1",
                    "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
                },
                {
                    "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
                    "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
                },
                {
                    "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
                    "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
                },
                {
                    "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
                    "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
                },
                {
                    "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
                    "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
                },
                {
                    "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
                    "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
                },
                {
                    "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
                    "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
                },
                {
                    "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
                    "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
                },
                {
                    "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
                    "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
                },
                {
                    "follower": "eada6e0c-e432-4af8-b238-71394e0866bc",
                    "following": "1c8171bb-36bd-41ff-b207-a5d219e53740"
                },
                {
                    "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
                    "following": "ff6cc644-ec9e-45dc-a98a-1186e091674f"
                },
                {
                    "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
                    "following": "b24f9e68-8fac-4525-b001-fffb91704d68"
                },
                {
                    "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
                    "following": "71aa5d19-43d8-4063-839d-114a0ad49ed7"
                },
                {
                    "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
                    "following": "94875c0e-fa45-4504-828a-6ec9f21a49ca"
                },
                {
                    "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
                    "following": "2d196d44-ae7f-4999-b080-e8a0db639c65"
                },
                {
                    "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
                    "following": "393bc641-eaa3-45a2-9a2a-ab16dc62424b"
                },
                {
                    "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
                    "following": "fefe27da-66ac-4d08-a8b3-c5adfb9bd5ce"
                },
                {
                    "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
                    "following": "437bf909-34c5-4e54-b1eb-799771159cd1"
                },
                {
                    "follower": "1c8171bb-36bd-41ff-b207-a5d219e53740",
                    "following": "eada6e0c-e432-4af8-b238-71394e0866bc"
                }
            ]
            '::json)
    )
INSERT
INTO
    hidden.following_profiles (follower,
                               following)
SELECT
    follower,
    following
FROM
    following_relationships_json l
    CROSS JOIN LATERAL JSON_POPULATE_RECORDSET(
        NULL::hidden.following_profiles,
        doc) AS f;
