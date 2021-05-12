# Adding SIM Swap Detection to your React Native AWS Apps with Amazon Cognito & **tru.ID** PhoneCheck API

## Requirements

- A [tru.ID Account](https://tru.id)
- An [AWS Account]("https://console.aws.com)
- A mobile phone with a SIM card and mobile data connection
- Other requirements

## Getting Started

Clone the starter-files branch via:

```bash
git clone -b starter-files --single-branch https://github.com/tru-ID/amazon-cognito-sim-swap-detection.git
```

If you're only interested in the finished code in main then run:

git clone -b main https://github.com/tru-ID/amazon-cognito-sim-swap-detection.git

Create a [tru.ID Account](https://tru.id)

Install the tru.ID CLI via:

```bash
npm i -g @tru_id/cli

```

Input your **tru.ID** credentials which can be found within the tru.ID [console](https://developer.tru.id/console)

Install the **tru.ID** CLI [development server plugin](https://github.com/tru-ID/cli-plugin-dev-server)

Create a new **tru.ID** project within the root directory via:

```
tru projects:create rn-amazon-auth
```

Run the development server, pointing it to the directly containing the newly created project configuration. This will also open up a localtunnel to your development server making it publicly accessible to the Internet so that your mobile phone can access it when only connected to mobile data.

```
tru server -t --project-dir ./rn-firebase-auth
```

## Setting up Amazon Cognito

[//]: # 'Include how to get setup with provider'
[//]: # 'Include how to restore dependencies and run your project'

To start the project, ensure you have a physical device connected (see Running React Native on a physical device guide ) then run:

```bash
npm run android
#or
npm run ios
```

## Troubleshooting

[//]: # 'Include troubleshooting guides, if any'

## References

- [**tru.ID** docs](https://developer.tru.id/docs)
- [Amazon Cognito Identity GitHub repo](https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js)

## Meta

Distributed under the MIT License. See [LICENSE](https://github.com/tru-ID/amazon-cognito-sim-swap-detection/blob/main/LICENSE.md)

[**tru.ID**](https://tru.id)
