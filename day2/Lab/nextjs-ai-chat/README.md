# Next.js AI Chat

A simple chat application built with Next.js and the AI SDK.

## Features

- Chat UI with a sidebar and message area
- Sends messages to a local API route
- Streams AI responses back to the page

## Requirements

- Node.js 18 or newer
- npm

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create an environment file with your model token:
   ```bash
   HF_TOKEN=your_token_here
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser.

## Project Structure

- app/page.tsx - Chat UI
- app/api/chat/route.ts - API route for chat requests

## Build

```bash
npm run build
```
