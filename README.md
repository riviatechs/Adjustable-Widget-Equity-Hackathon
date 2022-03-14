# MT940(Customer Message Statement)

This purely for the front-end development checkout [https://github.com/riviatechs/mt940_server](https://github.com/riviatechs/mt940_server) for the server details.

Enjoy!!

## Run

After cloning the repo run the series of the below commands to be up and running, within the root project folder.

```bash
# for npm users

npm install
# and
npm run dev

# or
yarn install
# and
yarn dev

# for yarn users
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Staging

service-name: mt940-website
Region: us-central1
url: [https://mt940-website-s47opgtmgq-uc.a.run.app](https://mt940-website-s47opgtmgq-uc.a.run.app)

### Production

#### Link to the app

- [https://equity.riviatechs.com](https://equity.riviatechs.com)

- [Setting-up-a-global-https-load-balancer](2)

- External IP addresses

name: mt940-website-ip
address: 34.110.166.190

- Create a serverless NEG

name: mt940-website-neg
cloud-run-service: mt940-website

- Create a backend service

name: mt940-website-bsn

- Create a URL map

name: mt940-website-url-map

- To create a Google-managed SSL certificate resource

name: mt940-website-ssl
domain: equity.riviatechs.com

- Create a target HTTP(S) proxy to route requests to your URL map

name: mt940-website-target-https-proxy

- Create a global forwarding rule to route incoming requests to the proxy

name: mt940-website-forwarding-rule

- Update your load balancer with SSL certificate
  [Redirect-HTTP-to-HTTPS](1)

[1]: https://cloud.google.com/load-balancing/docs/https/setting-up-http-https-redirect#console "Redirect HTTP to HTTPS"
[2]: https://cloud.google.com/load-balancing/docs/https/setting-up-https-serverless#gcloud_1 "Setting up a global external HTTP(S) load balancer (classic) with Cloud Run"
