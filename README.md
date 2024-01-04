<br />

<p align="center"> 
  <img src="https://github.com/pimslr-ai/language-service/assets/56337726/5272bb5e-25e6-4096-af80-e97ba9434e5e" width="auto" height="200">
</p>

<br />

<h2 align="center">Learn a second language tailored to your level simply through listening and speaking!</h2>
<p align="center">PimslrAI makes use of various AI for voice generation, course generation, and pronunciation assessments.</p>

<br />

## About

PimslrAI is a university project whose aim is to combine both software and UX/UI research. The name stems from the Pimsleur Method, which emphasises oral communication to help learners develop practical conversational skills through audio lessons. 

The app was developed on React Native and is paired with an ASP.NET backend. More information regarding the backend and the system as a whole can be found [here](https://github.com/pimslr-ai/language-service).

The app was made available for download on the [iOS App Store](https://apps.apple.com/nl/app/pimslrai/id6467199290?l=en-GB) and [Android](https://appdistribution.firebase.dev/i/e1d52b48e2500372) through Firebase side loading. 

> ⚠️ If you are reading this after January 2023, the app may no longer be in working condition.

Below is a demo that showcases the current state of the app and its functional features:

<div align="center">
  <video src="https://github.com/pimslr-ai/pimslr-ai-app/assets/56337726/59c2c218-3839-469f-9611-1d8a9ed89a42" width="400" />
</div>

## AI Integration

PimslrAI supports just under 100 languages as it heavily relies on the use of AI for various features. To make the learning tailod and unique for each user, lessons are generated using OpenAI's ChatGPT along side user-provided topics in freeform text. Once generated, voices are generated for each sentences using Narakeet's API for users to listen during the learning process. Finally, get per-syllable score on your pronunciation of the sentences. 

Below is an image displying a heatmap score of the uttered sentence by a learner:
<div align="center">
  <img src="https://github.com/pimslr-ai/pimslr-ai-app/assets/56337726/c423e6b6-3542-4090-997e-7ddda87f06d4" width="300" />
</div>

## Prototypes

The app was developed in iterations. Some of its prototypes can be found under branches with the `proto` alias.
