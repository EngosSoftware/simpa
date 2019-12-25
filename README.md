# simpa

Lightweight library for building Single Page Applications using TypeScript.

## Build


## Install


## Examples


## How this library was built step by step

This section is just for me as a memo. But if you plan to build your own library with TypeScript,
this content may be interesting also for you.

#### Check the latest versions of node and npm

```
$ node -v
v10.16.3

$ npm -v
6.9.0
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

To use TypeScript there is **tsconfig.json** file required. So I created one. See the file content for details.

#### Build script

There is a build script included, see **build.sh** file content.
The package is build and copied to user's home directory.

#### Testing

To test the library, execute the following command

```
npm run test
```


