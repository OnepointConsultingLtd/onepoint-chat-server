# Chat Sharing Feature

## Overview

The chat sharing feature allows users to share their conversations by generating a URL that contains all the necessary chat data. When someone opens the shared URL, the chat will be loaded with the exact same conversation history and context.

## How It Works

### 1. **Share Button**

- A floating share button appears in the bottom-right corner when there are messages in the chat
- Click the button to generate a shareable URL
- The URL is automatically copied to the clipboard
- Visual feedback shows when the URL is copied (checkmark icon)

### 2. **URL Generation**

The shareable URL contains:

- **Messages**: Complete conversation history (user and agent messages)
- **Selected Topic**: Current context and topic information
- **Metadata**: Version info and sharing timestamp
- **Encoding**: Data is base64 encoded to keep URLs manageable

### 3. **Loading Shared Chats**

When someone opens a shared URL:

- The app automatically detects the `shared` parameter
- Decodes and validates the shared data
- Loads the conversation into the chat interface
- Cleans up the URL by removing the parameter
- Creates a new session for the recipient

## Technical Implementation

### Store Functions

- `generateShareableUrl()`: Creates shareable URL with encoded chat data
- `loadSharedChat(encodedData)`: Loads shared chat from encoded data

### Components

- `ShareButton`: Floating button for generating and copying shareable URLs
- URL handling logic in `Home` component

### Data Structure

```typescript
{
  messages: [
    {
      id: string,
      text: string,
      type: 'user' | 'agent',
      timestamp: string,
      conversationId?: string
    }
  ],
  selectedTopic: {
    name: string,
    description: string,
    type: string,
    questions: string[]
  } | null,
  sessionId: string, // Critical for maintaining conversation context
  version: '1.0',
  sharedAt: string
}
```

## Security & Privacy

- Data is encoded but not encrypted (URLs are visible)
- No sensitive information is shared (only chat content)
- **Session ID is shared to maintain conversation continuity**
- URLs can be shared via any method (email, messaging, etc.)

## Key Features

- **Session Continuity**: The `sessionId` ensures the shared chat maintains the same conversation context
- **Backend Integration**: Recipients can continue the conversation with the same session
- **Local Storage Sync**: Session ID is automatically set in the recipient's browser

## Limitations

- URL length limits may apply for very long conversations
- Browser compatibility for clipboard API
- No real-time synchronization (static snapshot)

## Future Enhancements

- Encrypted sharing for sensitive conversations
- Expiring links
- Share with specific users
- Real-time collaborative chat
