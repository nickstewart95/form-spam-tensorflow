# form-spam-tensorflow

I wanted to see if I could catch common form spam with an AI model.... 

NOT PRODUCTION READY

## Screenshots

Sample POST requests with dummy data

Not Spam
![Not Spam](screenshots/not-spam.png)

Spam
![Spam](screenshots/spam.png)

## Notes

### The Model

I used [liner.ai](liner.ai) to generate a model that has two classes, `Good` and `Bad`. I grabbed spam and non spam submissions out of a specific form and turned each form
entry into a `field reponse | field reponse ` line, whcih I then grab and categorized.

## Node

It uses Node.js with Express.js to run the server. Tensorflow.js handles the actual AI stuff

I added a rate limiter to prevent the server from dying a cruel death
