# Work time viewer using Pixela API

Record and check your work time via API.

## Setup

Pixela API account is required.
To record time more easily, IFTTT is used.
If you want to deploy to Netlify etc., you also need the account for the service you prefer to deploy.

### Prepare Pixela and IFTTT

#### Register

``` shell
curl -X POST https://pixe.la/v1/users -d '{"token":"[thisissecret]", "username":"[username]", "agreeTermsOfService":"yes", "notMinor":"yes"}'
```

Enter original username and token. Token must be secure and be careful not to be in public.
Read Terms of Service at Pixela and agree.

#### Create graph

``` shell
curl -X POST https://pixe.la/v1/users/[username]/graphs -H 'X-USER-TOKEN:[thisissecret]' -d '{"id":"[graph-id]","name":"[graph-name]","unit":"minutes","type":"float","color":"shibafu","timezone":"Asia/Tokyo"}'
```

Enter graph-id and graph-name for the new graph.

To record time, ```unit``` is set to **minutes** and ```type``` is set to **float**.
Be careful that ```type``` must to be set to **float** to use stopwatch function to avoid the recorded time to be rounded.

#### Create a webhook

``` shell
curl -X POST https://pixe.la/v1/users/[username]/webhooks -H 'X-USER-TOKEN:[thisissecret]' -d '{"graphID":"graph-id","type":"stopwatch"}'
```

To use IFTTT, you need to create a webhook.

Set ```type``` to **stopwatch** to specify the behavior.

You should get a response like this:

``` shell
{"webhookHash":"<WebhookHashString>","message":"Success.","isSuccess":true}
```

You need ```webhookHash``` to use the webhook in IFTTT.
Be careful not to make this hash public, as anyone who know this hash can record time.

*Read official API document for detail.*

#### Create Applet in IFTTT

*If you don't have IFTTT account, register first.*

1. For **If This**, choose **Button widget**. Webhook will run when the button widget at your home screen is pressed.
2. For **Then That**, search ```webhooks``` and make a web request.

|Name                |Value                                                       |
|-------------------:|------------------------------------------------------------|
| URL                | ```https://pixe.la/v1/users/[username]/webhooks/[webhookHash]``` |
| Method             | POST |
| Additional Headers | Content-Length: 0 |

### Prepare Nuxt file

Create ```.env``` in root folder.
Enter your Pixela token.

``` plain
NUXT_API_KEY=[thisissecret]
```

If you wish to upload to services like GitHub, be careful not to upload this ```.env```.
As default, ```.env``` is ignored by ```.gitigrnore``` but check the file just in case.

#### server/api

Change the username and the graph-id in the url (```https://pixe.la/v1/users/[username]/graphs/[graph-id/```) to your own username.

### Deploy to Netlify etc.

Once you preapre all the requirements, run ```npm dev run``` and check your record time is properly displayed.
Then deploy to any service you prefer!

## References

[Pixela API Document](https://docs.pixe.la/)

[Pixela Help Center (Japanese)](https://help.pixe.la/ja)

[Pixela Help Center (English)](https://help.pixe.la/en)

[学習時間の計測と記録の仕組みを Pixela で構築する](https://help.pixe.la/ja/blog/build-studying-timer)

[Use Pixela as a stopwatch and record the measured time directly](https://help.pixe.la/en/use-as-stopwatch)
