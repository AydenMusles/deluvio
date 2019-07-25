# deluvio.com
https://deluvio.com

## Development 
### First Install
1. Clone the repo
2. In the terminal, run: ```cd /path/to/the/repo```
3. And then: ```npm install```
4. In the ```config``` folder, add an ```environment.json``` that contains these variables as json:
```
{
  "shopify": {
    "api_key": "XXXXXXXXXXXXXXXXXXXXX02f6c3",
    "password": "XXXXXXXXXXXXXXXXXXXXX2a18a91"
  }
}
```
5. Head to the flags page of Chrome at chrome://flags/#allow-insecure-localhost and enable ```Allow invalid certificates for resources loaded from localhost```

### Run Locally
1. In the terminal, run: ```grunt development```
1.1. Chrome will open the development url
2. In Chrome, make sure that https://localhost:8080/app.js and https://livereload:9000/livereload.js are recognized as safe to proceed by the browser.
3. Refresh the browser
4. Every changes made to ```.liquid``` files in the ```/theme``` folder will be uploaded and will trigger a browser refresh.
5. Every changes made to ```.scss``` files in the ```/styles``` folder will be uploaded and will be injected in the browser.
6. Every changes made to ```.js``` files in the ```/scripts``` folder will be hot reloaded into the browser, **but not uploaded to the theme (see next section)**.

### Deploy React Scripts
1. In the terminal, run: ```grunt production```
1.1. The compiled ```/theme/assets/app.js``` file will be uploaded to the theme.
