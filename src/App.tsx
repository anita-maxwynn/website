import ParticlesBackground from "./components/particlesbackground";
import TerminalComponent from "./components/TerminalComponents";
import './App.css';
import figlet from 'figlet';
import { useEffect, useState } from 'react';

const App = () => {
  const [asciiArt, setAsciiArt] = useState<string>('Kisuke');
  const [showSimpleView, setShowSimpleView] = useState(false); // Button visibility
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light' | 'matrix' | 'hacker'>('dark');

  const themeStyles: Record<typeof currentTheme, { text: string; border: string }> = {
    dark: { text: 'text-green-400', border: 'border-green-400' },
    light: { text: 'text-gray-800', border: 'border-gray-800' },
    matrix: { text: 'text-green-400', border: 'border-green-400' },
    hacker: { text: 'text-lime-400', border: 'border-lime-400' },
  };
  useEffect(() => {
    const generateAscii = async () => {
      const fallback = `
 _  _   ____  ___  __  __  _  __   ____ 
( )/ ) (_  _)/ __)(  )(  )( )/  )( ___)
 )  (   _)(_ \\__ \\ )(__)(  )  ( )__) 
(_)\\_)(____)(___/(______)(_)\\_)(____)
      `;

      const fontName = 'Bulbhead';
      const fontUrl = `/Bulbhead.flf`;

      fetch(fontUrl)
        .then(res => res.text())
        .then(fontData => {
          figlet.parseFont(fontName, fontData);
          figlet.text('Kisuke', {
            font: fontName,
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 120,
            whitespaceBreak: true
          }, (err, data) => {
            if (err || !data) {
              console.error('Error generating ASCII art:', err);
              setAsciiArt(fallback);
            } else {
              setAsciiArt(data);
            }
          });
        })
        .catch(err => {
          console.error("Failed to load custom .flf font:", err);
          setAsciiArt(fallback);
        });
    };

    generateAscii();

    // Show button after 1 minute (60000 ms)
    const timer = setTimeout(() => setShowSimpleView(true), 10000);
    return () => clearTimeout(timer);

  }, []);

  const commands1 = {
    about: {
      description: 'Learn about me',
      usage: 'about',
      fn: () => `
Hi! I'm Sourish Chandra
A Bachelor of Technology in Computer Science and Engineering student at IIIT Kalyani, expecting to graduate in May 2026.
Passionate about Backend Development, Cryptography, and Algorithms.
Currently maintaining a CGPA of 8.48.

Type 'skills' to see my technical expertise!
      `,
      funco: () => console.log('About command executed at:', new Date().toISOString())
    },
    skills: {
      description: 'View my technical skills',
      usage: 'skills',
      fn: () => `
Technical Skills:
================
Languages: Python, TypeScript, JavaScript, C, C++, SQL, Java, Assembly, MIPS 
Frontend:  React.js, Next.JS, HTML5, CSS3, Tailwind CSS, Vite 
Backend:   Django, Django REST Framework, Flask, Celery, Redis, WebSocket 
Database:  PostgreSQL, SQLite, MySQL, MongoDB 
Data/ML:   NumPy, Pandas, Matplotlib, scikit-learn, TensorFlow 
Tools:     Git, GitHub, Docker, Auth0, Swagger, Vercel, Render 

Type 'projects' to see my work!
      `
    },
    projects: {
      description: 'View my portfolio projects',
      usage: 'projects',
      fn: () => `
Featured Projects:
=================
1. Movies Now - A social movie streaming platform with synchronized playback and real-time video meetings. 
   Tech: React, Django, Redis, Celery, TypeScript, LiveKit 

2. SJ-Website - A full-stack jewelry e-commerce application with dynamic product catalogs and user profiles. 
   Tech: React, TypeScript, Tailwind CSS, Django, PostgreSQL, Auth0 

3. Parallax - A domain-specific SIMD/LLVM language with a modular design and detailed tutorials. 
   Tech: C++, LLVM, MLIR 

4. Fight Club - A multiplayer 2D fighting game with real-time client-server synchronization. 
   Tech: Python, Pygame, UDP/TCP Sockets 

5. MeowAPI - A minimalist Python web framework supporting function- and class-based routing with middleware. 
   Tech: Python, WSGI, SQLite, Jinja2

Type 'contact' to get in touch!
      `
    },
    contact: {
      description: 'Get my contact information',
      usage: 'contact',
      fn: () => `
Let's Connect:
=============
Email     : sourishchandra08@gmail.com
GitHub-1  : github.com/anita-maxwynn
GitHub-2  : github.com/sourish0
X         : x.com/manOf_100
Portfolio : anita-maxwynn.vercel.app
CodeChef  : codechef.com/users/team_tryst_51
GfG       : gfg.com/users/csexxfj46
LinkedIn  : linkedin.com/in/sourish-chandra-a68b77262 

Available for internship and research opportunities!
      `,
      funco: () => {
        navigator.clipboard.writeText('sourishchandra08@gmail.com').then(() => {
          console.log('Email copied to clipboard!');
        });
        console.log('Contact information viewed');
      }
    },
    experience: {
      description: 'View my work experience',
      usage: 'experience',
      fn: () => `
💼 Work Experience:
──────────────────
Research Intern @ Indian Institute of Information Technology, Kalyani (June 2025 - July 2025)

• Worked on the design and implementation of a custom cryptographic signature scheme in C, focusing on efficiency and security. 
• Developed detailed technical documentation explaining the scheme's mathematical foundation and implementation details.
• Published the project and documentation on GitHub for reproducibility and accessibility. 
• Collaborated with peers and mentors to review, test, and refine the proposed scheme. 
      `
    },
    resume: {
      description: 'Download my resume',
      usage: 'resume',
      fn: () => `
Resume Download:
===============
✓ Opening resume in new tab...
✓ Resume file: resume.pdf
✓ Download initiated successfully!

Alternative: Type 'contact' for my email to request a copy!
      `,
      funco: () => {
        window.open('/resume.pdf', '_blank');
        console.log('Resume download initiated at:', new Date().toISOString());
      }
    },
    commands: {
      description: 'Show available commands',
      usage: 'commands',
      fn: () => `
Available Commands:
==================
about      - Learn about me
skills     - View my technical skills
projects   - See my portfolio projects
experience - Check my work history
contact    - Get my contact info
resume     - Download my resume
clear      - Clear the terminal screen
commands   - Show this help message
whoami     - Display current user
ls         - List available sections
pwd        - Print working directory
theme      - Change terminal theme
echo       - Echo the input text
Tip: Just type any command and press Enter!
      `
    },
    whoami: { description: 'Display current user', usage: 'whoami', fn: () => `\nsourish.chandra` },
    ls: { description: 'List available sections', usage: 'ls', fn: () => `\nabout \nskills  \nprojects  \nexperience  \ncontact  \nresume\n` },
    pwd: { description: 'Print working directory', usage: 'pwd', fn: () => `\n/Visca/ El/ Barca` },
    clear: { description: 'Clear the terminal screen', usage: 'clear', fn: () => '\x1b[2J\x1b[H' },
    clr: { description: 'Clear the terminal screen (alias for clear)', usage: 'clr', fn: () => '\x1b[2J\x1b[H' },
    cls: { description: 'Clear the terminal screen (Windows-style alias)', usage: 'cls', fn: () => '\x1b[2J\x1b[H' },
    echo: { description: 'Echo the input text', usage: 'echo <text>', fn: (args = []) => args.length ? '\n'+args.join(' ') : '\nNo text provided' },
    hacking: {
      description: '???',
      usage: 'hacking',
      fn: () => `\nInitializing hacking protocol...`,
      funco: () => {
        const overlay = document.getElementById('easteregg-overlay');
        const audio = document.getElementById('hacker-audio') as HTMLAudioElement;
        if (overlay && audio) {
          overlay.classList.remove('hidden');
          audio.currentTime = 0;
          audio.play().catch(err => console.log('Audio play failed:', err));
          const video = document.getElementById('hacker-video') as HTMLVideoElement;
          if (video) video.play().catch(err => console.log('Video play failed:', err));
          setTimeout(() => {
            overlay.classList.add('hidden');
            audio.pause();
            if (video) video.pause();
          }, 8000);
        } else console.log('Elements not found:', { overlay, audio });
      }
    }
  };

  return (
    <div className="w-full overflow-auto bg-black text-white relative">
      <ParticlesBackground>
        <div className="mx-auto p-3 w-full container">
          <div className="flex justify-center py-6">
            <pre className="ascii-bulbhead">{asciiArt}</pre>
          </div>

          {/* Hacking Easter Egg Overlay */}
          <div
            id="easteregg-overlay"
            className="fixed top-0 left-0 w-full h-full z-50 hidden bg-black"
          >
            <video
              id="hacker-video"
              src="/sounds/hacker.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
            />
          </div>

          <audio id="hacker-audio" src="/sounds/hacking.mp3" preload="auto" />

          <TerminalComponent className="p-10" commands={commands1} />

          {/* Delayed Button */}
          {showSimpleView && (
            <a
              href="https://me-api-frontend.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              title="Want Simpler View??" // Tooltip text on hover
              className="fixed bottom-4 right-4 px-4 py-2 rounded-lg border transition-colors duration-300 hover:bg-opacity-20 hover:bg-white ${themeStyles[currentTheme].text} ${themeStyles[currentTheme].border}"
            >
              Click here
            </a>
          )}

        </div>
      </ParticlesBackground>
    </div>
  );
};

export default App;
