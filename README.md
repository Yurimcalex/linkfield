# Online notepad for recording links to Internet resources

Link to the app [Linkfield](https://yurimcalex.github.io/linkfield/)

## Motivation

Often, while surfing the Internet, I found interesting resources that could either be used in the future or were simply interesting to read about later. Previously, I simply wrote down links to these resources in a text file. Over time, there were many such files with unordered links to Internet resources, and eventually, during the next cleaning of my computer, I permanently deleted them. And there could be links to some really unique things there. A new search takes time and is not always successful. Therefore, I decided to create this online notepad.

### About implementation

Of course, it was possible to use a ready-made solution, but I was interested in how to use Redux without React.

React uses virtual DOM to update the structure, so frequent updates in redux store do not cause any special costs. But in order to use Redux without React, I had to think a little. As a result, since each action in redux has a unique type, I implemented a subscription of components to certain actions to update them when redux store values are updated.

The first version of the application uses the browser's local storage to store links.

## Installation

```
git clone the repo
npm i
npm run dev
```