#!/bin/bash
export PGPASSWORD="MeuP0rt@Retrat0:2026$"
TABLES=$(psql -h 127.0.0.1 -U strapi -d aluguenahora -t -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%_lnk';")

for T in $TABLES; do
    echo "Checking table: $T"
    COUNT=$(psql -h 127.0.0.1 -U strapi -d aluguenahora -t -c "SELECT count(*) FROM $T WHERE document_id = 'dfjrbxgdiw3q90sinstiny4c' OR (column_name='inv_document_id' AND inv_document_id = 'dfjrbxgdiw3q90sinstiny4c');" 2>/dev/null)
    # The above SQL might fail if columns don't exist. Let's do it better.
    
    # Check all columns for that ID
    RESULT=$(psql -h 127.0.0.1 -U strapi -d aluguenahora -c "SELECT * FROM $T WHERE CAST(document_id AS TEXT) = 'dfjrbxgdiw3q90sinstiny4c' OR CAST(inv_document_id AS TEXT) = 'dfjrbxgdiw3q90sinstiny4c';" 2>/dev/null)
    if [[ ! -z "$RESULT" && "$RESULT" != "(0 rows)" ]]; then
        echo "FOUND IN $T:"
        echo "$RESULT"
    fi
done
