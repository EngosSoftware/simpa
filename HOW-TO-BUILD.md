# simpa

Simple and lightweight library for prototyping Single Page Applications using TypeScript.

## Build


## Install


## Examples


## How this library was built step by step

This section is just for me as a memo, but if you plan to build your own library with TypeScript,
this content may be interesting also for you.

#### Check the latest versions of node and npm

```
$ node -v
v18.17.0

$ npm -v
9.6.7
```

#### Package initialization

```
npm init -y
```

After package initialization I have changed some package info. See **package.json** file for details.

#### Dependencies

```
npm install --save-dev typescript
npm install --save-dev @types/node
npm install --save-dev uuid-js
npm install --save-dev @types/uuid-js
npm install --save-dev marked
npm install --save-dev @types/marked
npm install --save-dev jest 
npm install --save-dev @types/jest 
npm install --save-dev ts-jest 
```

To check outdated packages, run the following command:

```
$ npm outdated
```

There should be no output when all packages are fresh.

To use TypeScript there is **tsconfig.json** file required. So I created one. See the file content for details.

#### Build script

There is a build script included, see **build.sh** file content.
The package is build and copied to user's home directory.

#### Testing

To test the library, execute the following command

```
npm run test
```


