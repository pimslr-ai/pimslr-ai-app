# Pimslr AI

## Voice recognition and word confidence prototype

This version of the application is a prototype that serves two purposes: to test the **candidate voice recognition API** and to display and **convey pronouciation accuracy** to users.

<div align="center">
  <video src="https://github.com/pimslr-ai/pimslr-ai-app/assets/56337726/08d8f023-df04-4827-8a67-6f5c3d00f63e" width="400" />
</div>

In this prototype, the user can select a language to recognize and can record himself spelling words. Recognition is made after the user stops the recording and the results are then displayed in the white card. The words spelled out are colored to represent the pronouciation confidence.

### Voice recognition API

Before the creation of this prototype, a research on existing speech-to-text APIs was conducted to find a candidate best suited for the purposes of this project. Among them was the [Google Cloud Speech-To-Text](https://cloud.google.com/speech-to-text?hl=en) API was selected based on a combination of low costs, low, latency, and more importantly, high accuracy. This service also features speech transcription with word-level confidence, which some services don't offer.

### Convey pronunciation accuracy

A big part of the application relies on users being able to know when they make mistakes in how to pronouce words as well as when they pronouce words well. Prior to this prototype, the full sentence was highlighted when a user mispronouced one word which did not properly convey which word was mispronouced. 

With this prototype, a design for conveying this was made where each word is attributes a color depending on the pronunciation accuracy. Greener colors represent well pronouced words while reder colors, mispronouced ones. Much like a heatmap, the design stemmed from commonly used colors visualization most people are familiar with. To give perspective, results from native speakers display completely green color palette while beginners show a lot or red colors.
