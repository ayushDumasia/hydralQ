import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MarkdownRenderer } from '@/customComponents/MarkDown';
import { generatePDF } from '@/hooks/generate-pdf';
import { cn } from '@/lib/utils';
import {
  ArrowDownToLine,
  Mic,
  PanelLeftOpen,
  PanelRightOpen,
  SendHorizontal,
  Volume2,
} from 'lucide-react';
import MarkdownIt from 'markdown-it';
import React, { useEffect, useRef, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

interface MenuItem {
  id: number;
  name: string;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const { speak } = useSpeechSynthesis();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const markdownParser = new MarkdownIt();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load initial messages
  useEffect(() => {
    setMessages([
      { sender: 'user', text: 'Hello!' },
      {
        sender: 'bot',
        text: 'Here is some **bold text** and a [link](https://example.com).',
      },
      {
        sender: 'bot',
        text: 'Code example:\n\n```js\nconsole.log("Hello world")\n```',
      },
      { sender: 'user', text: 'Can you show me a table?' },
      {
        sender: 'bot',
        text: `# Markdown Test Content

## Table of Contents
1. [Introduction](#introduction)
2. [Features of Markdown](#features-of-markdown)
3. [Markdown Syntax](#markdown-syntax)
    - [Headers](#headers)
    - [Emphasis](#emphasis)
    - [Lists](#lists)
    - [Links and Images](#links-and-images)
4. [Advanced Markdown](#advanced-markdown)
    - [Blockquotes](#blockquotes)
    - [Tables](#tables)
    - [Code Blocks](#code-blocks)
5. [Conclusion](#conclusion)

---

## Introduction

Markdown is a lightweight markup language that allows you to format plain text. It was created by John Gruber in 2004 with Aaron Swartz as a collaborator. Markdown is designed to be as easy to read and write as possible. It's commonly used in writing content for the web and is supported by many platforms such as GitHub, Reddit, and Stack Overflow.

## Features of Markdown

Markdown allows you to easily create formatted content without needing to use complex HTML tags. Some of its key features include:
- Simplicity: Markdown syntax is easy to learn and read.
- Portability: Markdown files can be converted into many formats, such as HTML and PDF.
- Flexibility: Markdown can be extended with plugins or used in conjunction with other tools.

## Markdown Syntax

### Headers

# Heading 1
`,
      },
    ]);
  }, []);

  const handleSpeakClick = (text: string) => {
    const plainText = markdownParser
      .render(text)
      .replace(/<\/?[^>]+(>|$)/g, '');
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = 'gu';
    const availableVoices = window.speechSynthesis.getVoices();
    utterance.voice = availableVoices[4] || null;
    utterance.rate = 1;
    utterance.pitch = 1.2;

    console.log('Available voices:', availableVoices);
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = () => {
    if (userInput.trim() === '') return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userInput },
    ]);
    setUserInput('');

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: `You said: "${userInput}"` },
      ]);
    }, 1000);
  };

  // Handle speech-to-text toggle
  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setUserInput(transcript);
      };
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  };

  return (
    <div className='relative flex w-full h-screen transition-all duration-500 bg-extend-backgroundWhite'>
      <button
        className={cn(
          'absolute top-2 left-2 z-10 text-black hover:text-extend-secondaryAzure p-2 rounded-md transition-all duration-300',
          !isSidebarCollapsed && 'hidden',
        )}
        onClick={() => setIsSidebarCollapsed(false)}
      >
        <PanelLeftOpen size={18} />
      </button>

      <div
        className={cn(
          'h-full bg-extend-backgroundWhite border-gray-200 transition-all duration-300',
          isSidebarCollapsed ? 'w-0' : 'w-64',
        )}
      >
        <div
          className={cn(
            'flex flex-col h-full duration-200 shadow-xl translate-all bg-extend-backgroundLight',
            isSidebarCollapsed
              ? 'opacity-0 translate-x-[-100%]'
              : 'opacity-100 translate-x-0',
          )}
        >
          <div className='flex items-center justify-between px-4 py-3 border-b bg-gray-50'>
            <h2 className='m-0 text-lg font-semibold'>HydraQ</h2>
            <button
              className='w-4 h-4 p-0'
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              <PanelRightOpen size={18} />
            </button>
          </div>
          <div className='flex-1 p-4 space-y-4'>
            <h3>Para 1</h3>
            <h3>Para 2</h3>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'flex flex-col mx-auto transition-all duration-300',
          isSidebarCollapsed
            ? 'w-[calc(100%-25rem)] max-w-[1200px]'
            : 'w-[calc(100%-25rem)] max-w-[1200px]',
        )}
      >
        <div className='flex-1 p-6 space-y-4 h-[600px] overflow-y-auto'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-extend-accentIceBlue text-left'
                  : 'bg-extend-backgroundLight text-left'
              }`}
            >
              <MarkdownRenderer markdown={message.text} />
              {message.sender === 'bot' && (
                <div className='flex mt-3 space-x-2'>
                  <button
                    className='w-5 h-5 text-gray-700 hover:text-gray-900'
                    onClick={() => handleSpeakClick(message.text)}
                  >
                    <Volume2 size={20} />
                  </button>
                  <button
                    className='w-5 h-5 text-gray-700 hover:text-gray-900'
                    onClick={() => generatePDF(message.text)}
                  >
                    <ArrowDownToLine size={20} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='bottom-0 flex items-center w-full px-4 py-3'>
          <Input
            type='text'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder='Type your message...'
            className='flex-1 px-4 text-xl border-none rounded-md bg-extend-backgroundWhite focus:ring-0'
          />
          <div className='flex items-center ml-3 space-x-2'>
            <Button
              onClick={sendMessage}
              className='p-2 rounded-md text-extend-backgroundWhite bg-extend-secondaryAzure hover:bg-extend-secondaryBlue'
            >
              <SendHorizontal size={18} />
            </Button>
            <Button
              onClick={toggleListening}
              className='p-2 rounded-md text-extend-backgroundWhite bg-extend-secondaryAzure hover:bg-extend-secondaryBlue'
            >
              <Mic size={18} />
            </Button>
          </div>
        </div>

        <p className='text-gray-500 text-[12px] text-center mb-2'>
          HydraQ can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
