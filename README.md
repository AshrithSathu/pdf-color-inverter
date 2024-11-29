# PDF Color Inverter

A Chrome extension that instantly inverts PDF colors for better readability and reduced eye strain, especially in dark environments.

![PDF Color Inverter Demo](demo.gif)

## Features

- 🌓 One-click PDF dark mode toggle
- 🚀 Instant color inversion without page reload
- 💡 Smart page detection (only works on PDF files)
- 🎨 Clean, modern user interface
- 👁️ Reduces eye strain in dark environments
- 🔄 Easily toggle between light and dark modes

## Installation

1. Visit the Chrome Web Store (link coming soon)
2. Click "Add to Chrome"
3. Confirm the installation

Or install manually:

1. Clone this repository:
   ```bash
   git clone https://github.com/ashrithsathu/pdf-color-inverter.git
   ```
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `dist` folder from the cloned repository

## Usage

1. Open any PDF file in Chrome
2. Click the PDF Color Inverter extension icon
3. Press the "Enable Dark Mode" button to invert colors
4. Press again to disable dark mode

The extension will automatically detect if you're viewing a PDF and enable/disable the toggle button accordingly.

## Development

This extension is built with:
- React + TypeScript for the UI
- Vite for building
- Chrome Extensions API

To set up the development environment:

1. Clone the repository
   ```bash
   git clone https://github.com/ashrithsathu/pdf-color-inverter.git
   cd pdf-color-inverter
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm run dev
   ```

4. Build for production
   ```bash
   npm run build
   ```

## How It Works

The extension uses the Chrome Extensions API to:
1. Detect when you're viewing a PDF file
2. Inject a transparent overlay with CSS mix-blend-mode
3. Invert the colors of the PDF content without affecting the UI

This approach ensures:
- Fast performance (no image processing)
- Compatibility with most PDF viewers
- Preservation of text selection and interaction

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Bug Reports

Found a bug? Please open an issue on GitHub with:
- A clear description of the bug
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)
- Browser version and OS

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped with code and bug reports
- Inspired by the need for better PDF readability in dark environments

## Contact

Ashrith Sathu - [GitHub](https://github.com/ashrithsathu)

Project Link: [https://github.com/ashrithsathu/pdf-color-inverter](https://github.com/ashrithsathu/pdf-color-inverter)
