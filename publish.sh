#!/usr/bin/env bash

set -eu

DIR="$(dirname "$(realpath "$0")")"
DIST="$DIR/dist"

rimraf "$DIST"
yarn build:esm
yarn version --patch
cp $DIR/src/*.d.ts "$DIST"
cp "$DIR/dotenv.cjs" "$DIST"
cp "$DIR/package.json" "$DIST"
yarn publish --non-interactive "$DIST"
sleep 1 # workaround for race condition: sometimes the NPM still returns the old package version right after publish
[ -f "$DIR/post-publish.local.sh" ] && . "$DIR/post-publish.local.sh"
