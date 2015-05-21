![Adieu.io](http://i.imgur.com/I4Br4c9.png?1)

Adieu.io Javascript API
=======================

Simple access to the Adieu.io API.

## About Adieu.io

Adieu.io is a service that lets users take back control of the ads they see while 
browsing the web. Adieu.io enables web viewers to see things they want to see inside of ad units
instead of things they don't--namely ads.

Unlike many "ad blocking" extensions, Adieu.io is a *service* that works within (or on top of) the existing advertising ecosystem. You can think of Adieu as extending advertising to add a consumer-customization layer. Adieu consumers directly buy their own ads (automatically, for a fluctuating market rate that is usually a fraction of a penny) and control the content shown within the advertising "boxes".

## Building with the API

Use the API to programmatically create images--called "rads"--which will show up in place of ads for users of the Adieu.io service.

In Adieu, "rads" are associated into collections called "boards", similar to the way that "pins" are added to "pinboards" in Pinterest. 

Boards can public or private, and if boards are private, they may be shared individually with other users. In turn, rads may be added to boards.

## API Tokens

Each request requires an API token. The token is associated with an individual board, and grants complete control over the board. Consequently, tokens should be kept private.

You may retrieve tokens by logging into [adieu.io](https://www.adieu.io/) and navigating to Boards->Upload->API.

### FairTread

Adieu is a product of FairTread, a company that is imagining a future web where users come first, content
creators are justly compensated, where individual contributions carry the same weight as
institutional publishers, and most importantly where content is as freely accessible as it is today.

### Installation

Install it via [npm](http://npmjs.org/)

```bash
npm install --save adieu-api
```

### Usage

See the examples folder for examples of how to use this.
