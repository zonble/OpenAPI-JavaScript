# KKBOX Open API Developer SDK for JavaScript
[![npm (scoped)](https://img.shields.io/npm/v/@kkbox/kkbox-js-sdk.svg)](https://www.npmjs.com/package/@kkbox/kkbox-js-sdk)
[![Build Status](https://travis-ci.org/KKBOX/OpenAPI-JavaScript.svg?branch=master)](https://travis-ci.org/KKBOX/OpenAPI-JavaScript)
[![License Apache](https://img.shields.io/badge/license-Apache-green.svg?style=flat)](https://raw.githubusercontent.com/KKBOX/OpenAPI-ObjectiveC/blob/master/LICENSE)

The SDK for accessing various metadata of KKBOX tracks, albums, artists, playlists and stations.

### npm install
```
npm install @kkbox/kkbox-js-sdk
```

### Source Install 
```
npm install
```

### Build SDK
```
npm run build
```

### Test
For testing, you should first browse [https://developer.kkbox.com/](https://developer.kkbox.com/) and create an developer account, then create an app to get client id and client secret for that account.

Then, create a file name `client_secrets.json`, put it in the `test` directory and write the client id and client secret in it. The content will be like:

```
{
    "kkbox_sdk": {
        "client_id": "YOUR CLIENT ID",
        "client_secret": "YOUR CLIENT SECRET"
    }
}
```

And then we can run the tests.

```
npm run test
```

### SDK Documentation
Please browse [https://kkbox.github.io/OpenAPI-JavaScript/](https://kkbox.github.io/OpenAPI-JavaScript/)

## How to use the SDK
There are two classes Auth and Api and you should initialize an Auth object by client id and secret.

```
import {Auth} from '@kkbox/kkbox-js-sdk'

const auth = new Auth(client_id, client_secret)
```

Then use the auth object to get access token.

```
auth.clientCredentialsFlow.fetchAccessToken().then(response => {
    const access_token = response.data.access_token
})
```

After getting access token, use it to initialize Api object.

```
import {Api} from '@kkbox/kkbox-js-sdk'

const api = new Api(access_token)
```

Now you can use various fetcher object to fetch data.

```
api.searchFetcher.setSearchCriteria('五月天 派對動物', 'track').fetchSearchResult().then(response => {
	console.log(response.data)
})
```

Most methods return paged result and we can use the `fetchNextPage` method to get the next page of result.

```
api.searchFetcher.setSearchCriteria('五月天 派對動物', 'track').fetchSearchResult().then(response => {
    console.log(response.data)
	api.searchFetcher.fetchNextPage(response).then(response => {
        console.log(response.data)
    })
})
```

All the code.

```
import {Auth} from '@kkbox/kkbox-js-sdk'
import {Api} from '@kkbox/kkbox-js-sdk'

const auth = new Auth(client_id, client_secret)
auth.clientCredentialsFlow.fetchAccessToken().then(response => {
    const access_token = response.data.access_token
    const api = new Api(access_token)    
    api.searchFetcher.setSearchCriteria('五月天 派對動物', 'track').fetchSearchResult().then(response => {
	    console.log(response.data)
        api.searchFetcher.fetchNextPage(response).then(response => {
            console.log(response.data)
        })        
    })
})
```
### Generate the SDK Documentation
    npm run build-doc
Then open the the file `docs/index.html`

### [API Documentation](https://docs-en.kkbox.codes/)

### License
Copyright 2017 KKBOX Technologies Limited

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.