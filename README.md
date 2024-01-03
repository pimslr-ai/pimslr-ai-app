# Pimslr AI

## Pronunciation Assessment Prototype

This version of the application is a prototype that serves two purposes: to test the **candidate voice recognition API** and to display and **convey pronouciation accuracy** to users.

In this prototype, the user can select a language to recognize and can record himself spelling words. Recognition is made after the user stops the recording and the pronunciation results are then displayed in the white card. The words spelled out are colored to represent the pronouciation confidence.

A big part of the application relies on users being able to know when they make mistakes in how to pronouce words as well as when they pronouce words well. Prior to this prototype, the full sentence was highlighted when a user mispronouced one word which did not properly convey which word was mispronouced.

With this prototype, a design for conveying this was made where each word is attributed a color depending on the pronunciation accuracy. Greener colors represent well pronouced words while reder colors, mispronouced ones. The design stemmed from a heatmap-like visualization most people are familiar with. To give perspective, results from native speakers display a completely green color palette while beginners show a lot more red colors.

### Version 1

<div align="center">
  <video src="https://github.com/pimslr-ai/pimslr-ai-app/assets/56337726/08d8f023-df04-4827-8a67-6f5c3d00f63e" width="400" />
</div>

The first iteration of this prototype makes use of [Google Cloud Speech-To-Text](https://cloud.google.com/speech-to-text?hl=en) API and makes use of the word-level confidence as a measurement for pronunciation score. This prototype was fundamentally flawed as it made use of an ASR model or Automated Speech Recognition model as a source of assessment. ASR models are designed to recognize both well pronunced and mispronunced words from a speaker and certain words could be commonly mispronuced resulting in the ASR model returning high confidence for those words despite mispronuciation.

### Version 2

<div align="center">
  <video src="https://github.com/pimslr-ai/pimslr-ai-app/assets/56337726/931ca88c-6bce-4ce1-bca1-5e25256d6b09" width="400" />
</div>

> Previous version can be accessed within the new prototype still by pressing *To Version 1* and vice versa

This second iteration of the prototype makes use of [Azure's Cognitive Services](https://learn.microsoft.com/en-us/legal/cognitive-services/speech-service/pronunciation-assessment/transparency-note-pronunciation-assessment) for pronunciation assessment. This API provides in-depth assessments of each words down to the syllables of the words, allowing for much greater granularity in score. Please see the [backend](https://github.com/pimslr-ai/language-service) which implements this API for more information. 

Another improvement on the previous prototype is the heatmap; the previous design featured very choppy color separation between words and disregarded punctuation altogether. This design now as proper color blending with linear gradient which also flows over punctuation.

### Implementation

Below is an image showcasing the prototype's implementation in the PimslrAI app:

<div align="center">
  <img src="https://github.com/pimslr-ai/pimslr-ai-app/assets/56337726/c423e6b6-3542-4090-997e-7ddda87f06d4" width="400" />
</div>
