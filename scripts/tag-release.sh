#!/usr/bin/env bash

set -euo pipefail

version="${1:?Usage: ./scripts/tag-release.sh <version>}"

git tag -a "$version" -m "$version"
git push origin "$version"
echo "Pushed tag $version"
