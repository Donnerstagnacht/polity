WITH
    <%= underscore(name) %>_json (doc) AS (
        VALUES
            ('[
            ]'::json)
    )
UPDATE hidden.<%= underscore(name) %> AS p
SET
    <column_name> = json_data.<column_name>,
    <column_name>  = json_data.<column_name>
FROM
    (
        SELECT
            (JSON_ARRAY_ELEMENTS(doc) ->> '<column_name>')::uuid   AS <column_name>,
            (JSON_ARRAY_ELEMENTS(doc) ->> '<column_name>') AS <column_name>,
            (JSON_ARRAY_ELEMENTS(doc) ->> '<column_name>')  AS <column_name>
        FROM
            <%= underscore(name) %>_json
    ) AS json_data
WHERE
    p.id = json_data.id;
