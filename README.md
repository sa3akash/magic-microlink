# LinkPreview Component

`LinkPreview` is a React component that generates a preview for a given URL, displaying its title, description, and image (if available). It supports both light and dark themes and includes a skeleton loader while fetching metadata.

## Features

- Responsive design: Displays the preview in a column layout on small screens and switches to row layout on larger screens.
- Skeleton loading state: While the metadata is being fetched, a skeleton loader is shown.
- Supports light and dark themes.
- Automatically truncates long titles and descriptions.
- Extracts and displays the hostname of the URL.
- Fetches metadata for the link using a provided API endpoint.

## Preview

![LinkPreview Component](path_to_your_screenshot_image)

## Installation

To use this component in your React project, follow these steps:

1. Install the necessary dependencies:

```bash
npm install styled-components
npm install --save @types/styled-components
