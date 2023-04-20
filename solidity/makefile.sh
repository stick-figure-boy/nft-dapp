#!/bin/sh
DIR=./artifacts/contracts/**
ABI_FILE=""
MISMATCH_PATTERN="^.*dbg.*$"
for pathfile in $DIR/*.json; do
    FILENAME=$(basename $pathfile)
    if [[ ! ${FILENAME} =~ ${MISMATCH_PATTERN} ]];then
        if [ -z "$ABI_FILE" ]; then
            ABI_FILE="$FILENAME"
        else
            ABI_FILE="$ABI_FILE|$FILENAME"
        fi
    fi
done

echo "$ABI_FILE"
