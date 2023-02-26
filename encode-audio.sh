#!/bin/bash
set -e
shopt -s globstar

for f in assets/audio/**/*.wav; do
    if test ! -f "${f%.wav}.m4a"; then
        fdkaac -b 192 -o "${f%.wav}.m4a" "$f"
        aacgain "${f%.wav}.m4a"
    fi
done
