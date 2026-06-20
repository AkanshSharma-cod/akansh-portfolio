import { useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatFab } from './components/chat/ChatFab';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const openChat = () => setChatOpen(true);

  return (
    <>
      <div className="bg-glow-footer" />
      <Nav onOpenChat={openChat} />
      <main className="relative z-10">
        <Hero onOpenChat={openChat} />
        <TechMarquee />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ChatFab open={chatOpen} setOpen={setChatOpen} />
    </>
  );
}
