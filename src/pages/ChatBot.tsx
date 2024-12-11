import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DotsLoading from '@/customComponents/LoadingComponent/DotsLoading';
import { MarkdownRenderer } from '@/customComponents/MarkDown';
import { generatePDF } from '@/hooks/generate-pdf';
import { cn } from '@/lib/utils';
import axios from 'axios';
// import { randomUUID } from 'crypto';
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
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { v4 as uuidv4 } from 'uuid';

import { useSpeechSynthesis } from 'react-speech-kit';

interface MenuItem {
  id: number;
  name: string;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  loading?: boolean;
}

const Chatbot: React.FC = () => {
  const navigate = useNavigate();
  const { speak } = useSpeechSynthesis();
  const contentRef = useRef(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isListening, setIsListening] = useState<boolean>(false);

  const randomUUID = uuidv4();

  useEffect(() => {
    // console.log(process.env.FIREBASE_API_KEY);
    setMessages([
      // { sender: 'user', text: 'Hello!' },
      // {
      //   sender: 'bot',
      //   text: 'Here is some **bold text** and a [link](https://example.com).',
      // },
      // {
      //   sender: 'bot',
      //   text: 'Code example:\n\n```js\nconsole.log("Hello world")\n```',
      // },
      { sender: 'user', text: 'Can you show me a table?' },
      {
        sender: 'bot',
        text: `# Markdown Data for Testing

## 1. Introduction
This is a test of various Markdown syntax features.


## 2. Lists

### Ordered List:
1. First item
2. Second item
   1. Sub-item 1
   2. Sub-item 2

### Unordered List:
- Item 1
- Item 2
  - Sub-item 1
  - Sub-item 2
  - [x] Options

---

## 3. Text Formatting

- **Bold**: This text is **bold**.
- *Italic*: This text is *italic*.
- ***Bold and Italic***: This text is ***bold and italic***.
- ~~Strikethrough~~: This text has ~~strikethrough~~.

---

## 5. Code

### Inline Code:
greet("World");
| Column 1    | Column 2    | Column 3    |
|-------------|-------------|-------------|
| Row 1 Cell  | Row 1 Cell  | Row 1 Cell  |
| Row 2 Cell  | Row 2 Cell  | Row 2 Cell  |
| Row 3 Cell  | Row 3 Cell  | Row 3 Cell  |

`,
      },
    ]);
    // if (contentRef.current) {
    //   console.log('I just did it , BITCH');
    //   console.log(contentRef.current);
    //   contentRef.current.scrollTop = contentRef.current.scrollHeight;
    //   // contentRef.current.scrollIntoView({ behavior: 'smooth' });
    // }
    scroller.scrollTo('scroll-target', {
      duration: 300,
      smooth: true,
      containerId: 'chat-container',
    });
  }, []);

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const markdownParser = new MarkdownIt();
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const cookies = new Cookies();
    const userCookie = cookies.get('user');

    const userMessage = { sender: 'user', text: userInput };
    const botMessage = { sender: 'bot', text: '', loading: true };

    // const [cookies] = useCookies(['user']);

    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    setUserInput('');

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/chat/${randomUUID}`,
        {
          user_id: userCookie,
          user_input: userInput,
        },
      );

      const botReply = response.data;

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const botMessageIndex = updatedMessages.findIndex(
          (msg) => msg.sender === 'bot' && msg.loading,
        );

        if (botMessageIndex !== -1) {
          updatedMessages[botMessageIndex] = {
            sender: 'bot',
            text: botReply,
            loading: false,
          };
        }

        return updatedMessages;
      });
    } catch (error) {
      console.error('Error with the API request:', error);
    }
  };

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
        <div
          className='flex-1 p-6 space-y-4 h-[600px] overflow-y-auto'
          id='chat-container'
          // ref={contentRef}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-extend-accentIceBlue text-left'
                  : ' text-left'
              }`}
            >
              {message.loading ? (
                <div className='flex items-center align-middle w-[70px] bg-gray-600 rounded-bl-none pt-2 rounded-lg h-6 px-2 p-4 m-0'>
                  <DotsLoading />
                </div>
              ) : (
                <>
                  {message.text && <MarkdownRenderer markdown={message.text} />}
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
                </>
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
