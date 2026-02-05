# Tests for Don't Watch Later

This directory contains automated tests for the Don't Watch Later Chrome extension using Puppeteer and Jest.

## Setup

Install dependencies:

```bash
cd test
npm install
```

## Running Tests

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## What's Tested

The test suite validates that the extension correctly handles all case variations of YouTube's Watch Later playlist parameter:

1. ✓ `list=WL` (uppercase) - removes list parameter
2. ✓ `list=wl` (lowercase) - removes list parameter
3. ✓ `list=Wl` (mixed case) - removes list parameter
4. ✓ `list=wL` (mixed case) - removes list parameter
5. ✓ URLs without Watch Later parameter - not modified
6. ✓ URLs with other playlist parameters - not modified

## Notes

- Tests run in non-headless mode because Chrome extensions require a visible browser
- Each test navigates to a YouTube URL and verifies the extension redirects correctly
- The test timeout is set to 30 seconds to accommodate network requests
