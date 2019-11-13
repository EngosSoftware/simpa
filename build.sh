#!/bin/bash

rm -rf ~/simpa*.*
npm run build
npm pack
mv simpa*.* ~
