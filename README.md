# Henry

## Inspiration
Imagine being a college kid with no credit, trying to identify how you're uncertain financial future will play out. You are probably looking for guidance into how at risk you are. That's where Henry kicks in. Henry the AI will help identify your risk level, so you can better plan for your future.

## What it does
Henry provides a quick risk estimate of the likelihood that the user misses a debt payment over the next two years (did not say that in video).

## How I built it
The frontend is built with ReactJs, and is hosted on Azure Static Web Apps. The frontend collects data from users, and then performs a get request to a Azure Kubernates API Endpoint, which links to a virtual machine running a machine learning model through Azure Machine Learning. This machine learning model takes in user inputs and then outputs a predicted risk. The machine learning model was trained with 150000 data points. Also I plan to strap on the Domain.com domain link onto the static web app, once it registers.

## Challenges I ran into
I wanted to add several more parameters to the machine learning model to make it more accurate. While, I did have the data, the issue was time. By the time I trained it and performed my first run through with basic parameters included, I ran out of time to work on the backend. Also for some reason the API endpoint I initially made for the machine learning model failed, so I had to redeploy the model to another API that I made. (I might have broken it somehow, not really sure). Also domain.com wouldn't update my domain register fast enough for me to get it hosted on Azure Static Web Apps (so close but so far...…..)

## Accomplishments that I'm proud of
I made an entire backend and frontend by myself. Usually I only do one or the other, and work on a team of 4. Honestly, I can't believe I did this whole thing by myself _ (I'm so tired HALP) _. Also this is probably the first thing I've made that I like the design of in months :) .

## What I learned
So compared to using a local instance of TensorFlow, using cloud resources is so much more efficient, and cloud resources are affordable and strong enough to create real live applications with machine learning (that don't cost users bucket loads).

## What's next for Henry
More data. More parameters. More accuracy. More frontend features. All of them are possible with some more time.

## Built with
azure
azure-kubernates
azure-static-web-apps
azure-virtual-machine
javascript
kubernetes
machine-learning
node.js
react
