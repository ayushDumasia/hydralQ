import MarkdownIt from 'markdown-it';

// Text to Speak for User
export const handleSpeakClick = (text: string) => {
  const md = new MarkdownIt();
  const plainText = md.render(text).replace(/<\/?[^>]+(>|$)/g, '');
  console.log(plainText);
  const value = new SpeechSynthesisUtterance(plainText);
  value.lang = 'gu';
  const voices = window.speechSynthesis.getVoices();
  value.voice = voices[4];
  value.rate = 1;
  value.pitch = 1.2;

  console.log('Available voices:', voices);
  window.speechSynthesis.speak(value);
};
