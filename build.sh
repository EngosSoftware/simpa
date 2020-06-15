#!/bin/bash

rm -rf ./lib
npm run test
npm run build
npm publish
