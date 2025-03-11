import { useState, useRef, useEffect } from 'react';
import WebSocket from 'isomorphic-ws'

export interface Question {
    id: number;
    text: string;
}

export interface Message {
    id: string;
    text: string;
    type: 'user' | 'agent';
    timestamp: Date;
}


function sendMessage(
    socket: WebSocket | null,
    event: string,
    message: string
  ) {
    if (!!socket) {
      socket.send(JSON.stringify({ type: event, content: message }));
      console.info(`Sent ${event} ${message}!`);
    } else {
      console.warn(`Socket is null, cannot send ${event} message.`);
    }
  }


function messageFactoryAgent(text: string): Message {
    return {
        id: Date.now().toString(),
        text,
        type: 'agent',
        timestamp: new Date()
    };
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const wsOpen = useRef<boolean>(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Create WebSocket connection only once
        wsRef.current = new WebSocket(`ws://${window.location.hostname}:4000`);
        const ws = wsRef.current;

        // Browser WebSocket uses 'onopen' instead of 'on("open")'
        ws.onopen = () => {
            const connectionMessage: Message = messageFactoryAgent("Connected to server");
            setMessages(prev => [...prev, connectionMessage]);
            wsOpen.current = true;
        };

        // Browser WebSocket uses 'onmessage' instead of 'on("message")'
        ws.onmessage = (event: any) => {
            try {
                const message = JSON.parse(event.data);
                console.log("message", message)
                switch (message.type) {
                    case "stream-start":
                        setMessages(prev => [...prev, messageFactoryAgent("")]);
                        break;
                    case "stream-chunk":
                        setMessages(prev => {
                            const lastMessage = {...prev[prev.length - 1]};
                            lastMessage.text += message.chunk;
                            return [...prev.slice(0, -1), lastMessage];
                        });
                        break;
                    case "stream-end":
                        if (message.subType === "streamEndError") {
                            setMessages(prev => [...prev, messageFactoryAgent(message.message)]);
                        }
                        break;
                    case "message":
                        setMessages(prev => [...prev, messageFactoryAgent(message.message.content)]);
                        break;
                }
            } catch (error) {
                console.error("Error parsing message:", error);
            }
        };

        // Use 'onerror' instead of 'on("error")'
        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            const errorMessage: Message = messageFactoryAgent(`Connection error: Unable to connect to server`);
            setMessages(prev => [...prev, errorMessage]);
        };

        // Use 'onclose' instead of 'on("close")'
        ws.onclose = () => {
            const closeMessage: Message = messageFactoryAgent("Connection closed");
            setMessages(prev => [...prev, closeMessage]);
            wsOpen.current = false;
        };

        return () => {
            // Clean up WebSocket
            if(wsOpen.current && wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleQuestionClick = (question: Question) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            text: question.text,
            type: 'user',
            timestamp: new Date()
        };

        sendMessage(wsRef.current, "message", question.text);
        setMessages(prev => [...prev, userMessage]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            type: 'user',
            timestamp: new Date()
        };

        sendMessage(wsRef.current, "message", inputText);
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
    };

    return {
        messages,
        inputText,
        setInputText,
        messagesEndRef,
        handleQuestionClick,
        handleSubmit
    };
} 