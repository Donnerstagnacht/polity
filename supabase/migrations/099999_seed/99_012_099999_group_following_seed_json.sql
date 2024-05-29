WITH
    following_groups (doc) AS (
        VALUES
            ('[
                {
                    "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "following": "863a7ec4-0ae5-4622-90ce-c0ffbaaf18f3"
                },
                {
                    "follower": "ff6cc644-ec9e-45dc-a98a-1186e091674f",
                    "following": "1fb8eba2-6c5d-4c5d-a603-8eeb5d1214f9"
                },
                {
                    "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "following": "1fb8eba2-6c5d-4c5d-a603-8eeb5d1214f9"
                },
                {
                    "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "following": "863a7ec4-0ae5-4622-90ce-c0ffbaaf18f3"
                },
                {
                    "follower": "b24f9e68-8fac-4525-b001-fffb91704d68",
                    "following": "5ce91eb6-f16b-439a-ab61-d5ffe12e5087"
                }
            ]'::json)
    )
INSERT
INTO
    hidden.following_groups (follower,
                             following)
SELECT
    follower,
    following
FROM
    following_groups l
    CROSS JOIN LATERAL JSON_POPULATE_RECORDSET(
        NULL::hidden.following_groups,
        doc) AS f;
