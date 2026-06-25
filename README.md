# ChatExporter 💬✨

**ChatExporter** is an ultra-modern, privacy-first web application designed to bring your exported WhatsApp chats back to life. Instead of scrolling through an endless, unformatted `.txt` file, ChatExporter instantly parses your chat history and renders it in a beautiful, native-feeling chat interface directly in your browser.

---

## 🌟 Key Features

- **🔒 100% Private (Local Processing):** Your exported chat files never leave your device. All parsing and rendering are done locally in your browser using JavaScript's `FileReader`.
- **⚡ Lightning Fast Parsing:** Optimized regex-based parsing capable of handling massive chat histories (years of messages) in milliseconds.
- **🎨 Ultra-Modern UI/UX:** Built with a stunning glassmorphic design, smooth Framer Motion entrance animations, and dynamic mesh background gradients.
- **📅 Smart Grouping & Filtering:** Automatically extracts all participants and groups messages by date. Use simple dropdowns to navigate through time.
- **🔍 Universal Search:** Instantly search for specific keywords or names across your entire chat history.
- **🖼️ Media Placeholders:** Intelligently recognizes omitted media (like `<image omitted>`, `<sticker omitted>`, `<video omitted>`) and renders them with beautiful corresponding icons.
- **🟢 Sender Identification:** Select "Your Name" from the participants list to accurately render your sent messages on the right side with green bubbles, mimicking the native messaging experience.

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** [Poppins](https://fonts.google.com/specimen/Poppins) (Google Fonts)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone or download the repository to your local machine.
2. Open a terminal in the project root folder.
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## 📱 How to Use

1. **Export Your Chat from WhatsApp:**
   - Open WhatsApp on your phone.
   - Go to the chat you want to export.
   - Tap the contact's name or group name at the top -> **Export Chat**.
   - Choose **"Without Media"**.
   - Save or share the resulting `.txt` (often named `_chat.txt` or `WhatsApp Chat.txt`) to your computer.
2. **Upload & Visualize:**
   - Open ChatExporter in your browser.
   - Drag and drop your `.txt` file into the upload area or click to browse.
   - The app will instantly process your chat!
3. **Navigate:**
   - Use the sidebar to select your name so your messages appear on the right side.
   - Use the date dropdown to jump to specific days in your history.
   - Use the search bar to find hidden gems and memorable quotes in your conversation.

## 🧠 How the Parsing Works

WhatsApp chat exports vary slightly depending on the operating system (iOS vs. Android) and device locale settings. ChatExporter employs a highly robust regex parsing strategy in `src/lib/parser.ts` that:
- Normalizes invisible zero-width formatting characters (like `\u200E` Left-To-Right marks) commonly injected by iOS.
- Supports varied date formats, including `YYYY-MM-DD`, `DD/MM/YYYY`, and `MM/DD/YYYY`.
- Identifies system messages (e.g., "Messages and calls are end-to-end encrypted").
- Gracefully handles multi-line messages by appending unmatched lines to the preceding message block.

## 📁 Project Structure

```text
/src
  /app
    page.tsx           # Main application orchestrator
    layout.tsx         # Global layout and Poppins font configuration
    globals.css        # Global CSS variables and Tailwind setup
  /components
    UploadArea.tsx     # Animated landing page and drag-drop zone
    ChatViewer.tsx     # WhatsApp-style chat bubble rendering
    Sidebar.tsx        # Filters, search, and statistics
  /lib
    parser.ts          # Robust regex text parsing logic
  /types
    index.ts           # Shared TypeScript interfaces
```

---
*Built to bring your digital memories back to life.*
