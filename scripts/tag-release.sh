#!/usr/bin/env bash

set -euo pipefail

version="${1:?Usage: ./scripts/tag-release.sh <version> [--push]}"
push_tag="${2:-}"

git tag -a "$version" -m "$version"

if [[ "$push_tag" == "--push" ]]; then
  git push origin "$version"
  echo "Pushed tag $version"
else
  echo "Created tag $version"
  echo "Push it with: git push origin $version"
fi
