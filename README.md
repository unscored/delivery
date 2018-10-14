## Deployment project
1\. Setup configs in folder `configs` in files:

- dev.json
- prod.json

If need to change configs only for local environment you should add to this folder file `local.json` and override any configs from the `dev.json` and `prod.json` files.

2\. Execute next commands:
```
npm i
npm run create
npm run sync
npm run fill    # optional
```

Description of all commands see in the end of this documentation.

## Running application

1\. Go to the `server` folder and execute:
```
npm run start
```
or run server with autorestarting mode:
```
npm run debug
```

2\. Open in browser next link: [http://localhost:3003](hhttp://localhost:3003)

## Server NPM commands

```
npm run start      // running server in production mode
npm run debug      // running server in development mode with autorestaring option (for Unix systems)
npm run debugw     // running server in development mode with autorestaring option (for Windows system)
npm run create     // create empty database by configs
npm run sync       // create/recreate tables in database
npm run fill       // add test data to tables
npm run drop       // absolutely remove database
npm run recreate   // sequence of the drop, create and sync commands
npm run reinstall  // remove "node_modules" folder and "package-lock.json" file and install again
```

## Server API
For using server API you should send all requests by the next rules:

- URL: `/api`
- method: `POST`
- body:

```json
{
  "action": "foo",
  "method": "bar",
  "data": [
    {
      "someData": 123
    }
  ],
  "tid": 1,
  "type": "rpc"
}
```

Details:

- URL value you can get from the `configs` > `direct` > `classRouteUrl` parameter;
- params in the body:
    - `action` is the file name from the folder `server/api` (exclude `index.js` file) without extension;
    - `method` is the function name which exports from the `action` file;
    - `data` is any data which you want to send to the server to `method` function; **IMPORTANT!**: `data` parameter should be an array with only one object inside;
    - `tid` is the number of request; actually can be any integer number;
    - `type` should be always `rpc`.
