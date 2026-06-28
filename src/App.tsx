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
Hi! I'm Sourish Chandra.

Software Engineer at ITILITE and a Computer Science graduate from IIIT Kalyani (2026).

I enjoy building distributed backend systems, developer tools, AI-powered automation, and systems software. My interests span Backend Engineering, Distributed Systems, Cryptography, and Applied AI.

Currently exploring Spring Boot, cloud-native architectures, and intelligent agentic systems.

Type 'skills' to see my technical stack.

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
Backend:   Django, Django REST Framework, Flask, Celery, Redis, WebSocket , Springboot, PHP 
Database:  PostgreSQL, SQLite, MySQL, MongoDB 
Data/ML:   NumPy, Pandas, Matplotlib, scikit-learn, TensorFlow 
Tools:     Git, GitHub, Docker, Auth0, Swagger, Vercel, Render 
Cloud:     Docker • AWS • Linux • Git

Other:     REST APIs • System Design • WebSockets • Background Jobs • Authentication

Type 'projects' to see my work!
      `
    },
    projects: {
      description: 'View my portfolio projects',
      usage: 'projects',
      fn: () => `
Featured Projects:
=================

1. GeoTrack ⭐
   Secure multi-hop LoRa mesh communication system with encrypted routing and custom forwarding algorithms.
   Tech: ESP32 • LoRa • Python • React Native • ECC • AES-256

2. Movies Now - A social movie streaming platform with synchronized playback and real-time video meetings. 
   Tech: React, Django, Redis, Celery, TypeScript, LiveKit 

3. SJ-Website - A full-stack jewelry e-commerce application with dynamic product catalogs and user profiles. 
   Tech: React, TypeScript, Tailwind CSS, Django, PostgreSQL, Auth0 

4. Parallax - A domain-specific SIMD/LLVM language with a modular design and detailed tutorials. 
   Tech: C++, LLVM, MLIR 

5. Fight Club - A multiplayer 2D fighting game with real-time client-server synchronization. 
   Tech: Python, Pygame, UDP/TCP Sockets 

6. MeowAPI - A minimalist Python web framework supporting function- and class-based routing with middleware. 
   Tech: Python, WSGI, SQLite, Jinja2

7. AI Incident Management Agent (In Progress) - Automatically analyzes New Relic alerts, queries CloudWatch, creates Jira tickets and assigns incidents using LLMs.
   Tech: Python • Gmail API • AWS CloudWatch • New Relic • Jira • OpenAI

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
Software Engineer @ITILITE (June 2026 - Present)

• Building scalable backend services and internal platform features.
• Working with Django, MySQL and enterprise integrations.
• Improving platform reliability, automation and security.

Software Engineering Intern @ ITILITE (Jan 2026 - June 2026)

• Developed secure onboarding workflows.
• Built backend APIs and automation services.
• Implemented client synchronization pipelines.
• Fixed production issues and VAPT findings.

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
        window.open('/Sourish_Chandra_v2.pdf', '_blank');
        console.log('Resume download initiated at:', new Date().toISOString());
      }
    },
    commands: {
      description: 'Show available commands',
      usage: 'commands',
      fn: () => `
Available Commands
==================

Profile
-------
about        Learn about me
skills       View my technical skills
projects     See my portfolio projects
experience   Check my work history
contact      Get my contact information
resume       Download my resume

Developer
---------
stack        View my current tech stack
stats        Display developer statistics
timeline     View my career timeline
now          See what I'm currently working on
github       View my GitHub profiles

Terminal
--------
whoami       Display current user
ls           List available sections
pwd          Print working directory
echo         Echo the input text
clear        Clear the terminal screen
clr          Alias for clear
cls          Windows-style clear

Fun
---
coffee       Coffee monitor
fortune      Random engineering quote
neofetch     Display system information
banner       Display startup banner
matrix       Wake up, Neo...
sudo         Try becoming root
hacking      ???

Tip: There are hidden commands ;)
`
    },
    whoami: { description: 'Display current user', usage: 'whoami', fn: () => `\nsourish.chandra` },
    ls: { description: 'List available sections', usage: 'ls', fn: () => `\nabout \nskills  \nprojects  \nexperience  \ncontact  \nresume\n` },
    pwd: { description: 'Print working directory', usage: 'pwd', fn: () => `\n/Visca/ El/ Barca` },
    clear: { description: 'Clear the terminal screen', usage: 'clear', fn: () => '\x1b[2J\x1b[H' },
    clr: { description: 'Clear the terminal screen (alias for clear)', usage: 'clr', fn: () => '\x1b[2J\x1b[H' },
    cls: { description: 'Clear the terminal screen (Windows-style alias)', usage: 'cls', fn: () => '\x1b[2J\x1b[H' },
    echo: { description: 'Echo the input text', usage: 'echo <text>', fn: (args = []) => args.length ? '\n' + args.join(' ') : '\nNo text provided' },
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
    },

    stats: {
      description: 'Display developer statistics',
      usage: 'stats',
      fn: () => `
Developer Statistics
====================

Role              : Software Engineer
Experience        : Backend Engineering
Languages         : Python, Java, TypeScript
Primary Stack     : Django + MySQL + Redis
Projects          : 7+
Coffee            : █████████░ 90%
Sleep             : ███░░░░░░░ 30%
Production Bugs   : Survived
`
    },

    timeline: {
      description: 'Career timeline',
      usage: 'timeline',
      fn: () => `
Career Timeline
===============

2022 ─ Started B.Tech @ IIIT Kalyani

2024 ─ Built multiple full-stack applications

2025 ─ Research Intern
       IIIT Kalyani

2026 ─ Software Engineering Intern
       ITILITE

2026 ─ Software Engineer
       ITILITE
`
    },

    stack: {
      description: 'Current development stack',
      usage: 'stack',
      fn: () => `
Current Stack
=============

Backend
-------
Python
Java
Django
Spring Boot

Database
--------
MySQL
PostgreSQL
Redis

Cloud
-----
Docker
AWS
Linux

Frontend
--------
React
TypeScript
`
    },

    now: {
      description: 'Current focus',
      usage: 'now',
      fn: () => `
Currently Working On
====================

• Spring Boot
• AI Incident Management Agent
• Backend System Design
• Distributed Systems
• AWS

Learning never stops :)
`
    },

    coffee: {
      description: 'Coffee level',
      usage: 'coffee',
      fn: () => `
Coffee Monitor
==============

Current Level

█████████░ 90%

Status:
Ready for another production deployment ☕
`
    },

    fortune: {
      description: 'Random engineering quote',
      usage: 'fortune',
      fn: () => {
        const quotes = [
          `"Programs must be written for people to read, and only incidentally for machines to execute." - Harold Abelson`,
          `"First, solve the problem. Then, write the code." - John Johnson`,
          `"Talk is cheap. Show me the code." - Linus Torvalds`,
          `"Deleted code is debugged code." - Jeff Sickel`,
          `"Simplicity is prerequisite for reliability." - Edsger Dijkstra`,
          `"The best error message is the one that never shows up." - Thomas Fuchs`,
          `"Weeks of coding can save you hours of planning."`,
          `"It's not a bug, it's an undocumented feature."`
        ];

        return `\n${quotes[Math.floor(Math.random() * quotes.length)]}`;
      }
    },

    neofetch: {
      description: 'Display system information',
      usage: 'neofetch',
      fn: () => `
                   sourish@portfolio
        -----------------------------------
OS:            HumanOS 22.0 LTS
Host:          Bengaluru
Kernel:        Backend Engineer
Uptime:        Since 2004
Shell:         zsh
Editor:        VS Code
Languages:     Python, Java, TypeScript
Frameworks:    Django, Spring Boot, React
Database:      MySQL, PostgreSQL, Redis
Terminal:      Kisuke-Term
CPU:           Sleep Deprived
Memory:        16 GB (Need More)
GPU:           Coffee
`
    },

    matrix: {
      description: 'Wake up, Neo...',
      usage: 'matrix',
      fn: () => `
Wake up, Neo...

The Matrix has you.

Follow the white rabbit.

...or just deploy to production.
`
    },

    sudo: {
      description: 'Try becoming root',
      usage: 'sudo',
      fn: () => `
[sudo] password for sourish:

Nice try :)

Permission denied.
`
    },

    banner: {
      description: 'Display welcome banner',
      usage: 'banner',
      fn: () => `
██╗  ██╗██╗███████╗██╗   ██╗██╗  ██╗███████╗
██║ ██╔╝██║██╔════╝██║   ██║██║ ██╔╝██╔════╝
█████╔╝ ██║███████╗██║   ██║█████╔╝ █████╗
██╔═██╗ ██║╚════██║██║   ██║██╔═██╗ ██╔══╝
██║  ██╗██║███████║╚██████╔╝██║  ██╗███████╗
╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

Software Engineer @ ITILITE

Type 'commands' to begin.
`
    },
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
        </div>
      </ParticlesBackground>
    </div>
  );
};

export default App;
