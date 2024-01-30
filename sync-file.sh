#!/bin/bash

BRANCH=${CI_COMMIT_BRANCH/landing\//""}
rsync --exclude '.git' --exclude '.gitlab-ci.yml' -rav --delete ./dist/ $USER@$SERVER:"$FOLDER/$BRANCH"
