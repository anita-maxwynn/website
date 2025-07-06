import ParticlesBackground from "./components/particlesbackground";
import TerminalComponent from "./components/TerminalComponents";
import './App.css';
import figlet from 'figlet';
import { useEffect, useState } from 'react';

const App = () => {
  const [asciiArt, setAsciiArt] = useState<string>('KISUKE');

  useEffect(() => {
    const generateAscii = async () => {
      const fallback = `
 _  _  ____  ___  __  __  _  _  ____ 
( )/ )(_  _)/ __)(  )(  )( )/ )( ___)
 )  (  _)(_ \\__ \\ )(__)(  )  (  )__) 
(_)\\_)(____)(___/(______)(_)\\_)(____)
      `;

      // Load custom font from public folder
      const fontName = 'Bulbhead';
      const fontUrl = `/Bulbhead.flf`;

      fetch(fontUrl)
        .then(res => res.text())
        .then(fontData => {
          figlet.parseFont(fontName, fontData);
          figlet.text('KISUKE', {
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
  }, []);

  const commands1 = {
    about: {
      description: 'Learn about me',
      usage: 'about',
      fn: () => `
Hi! I'm Anita MaxWynn
Full-Stack Developer & Creative Technologist
Passionate about building amazing web experiences and Languages
Currently focused on React, TypeScript, Django, Django-Rest, C++,
Celery, Redis and Competitive Programming

Type 'skills' to see my technical expertise!
      `,
      funco: () => {
        console.log('About command executed at:', new Date().toISOString());
      }
    },
    skills: {
      description: 'View my technical skills',
      usage: 'skills',
      fn: () => `
Technical Skills:
================
Frontend:  React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
Backend:   Python, Django, Flask, FastAPI
Database:  MongoDB, PostgreSQL, MySQL
Tools:     Git, VS Code, Figma, Docker
Cloud:     Railway , Vercel, Render

Type 'projects' to see my work!
      `
    },
    projects: {
      description: 'View my portfolio projects',
      usage: 'projects',
      fn: () => `
Featured Projects:
=================
1. Railway Management System - React + Django + MongoDB + PostgreSQL
2. Python-Cpp - My custom language which is like python but written in c++
3. Discord Bot - Custom made bot using Python + Discord API + sqlite3
4. Portfolio Website - React + Particles.js (this site!)
5. MewAPI - Python based backend framework

Type 'contact' to get in touch!
      `
    },
    contact: {
      description: 'Get my contact information',
      usage: 'contact',
      fn: () => `
Let's Connect:
=============
Email     : cse22100@gmail.com
GitHub    : github.com/anita-maxwynn
X         : x.com/manOf_100
Portfolio : anitamaxwynn.dev
CodeChef  : codechef.com/users/team_tryst_51
GeeksforGeeks : gfg.com/users/csexxfj46

Available for freelance projects and full-time opportunities!
      `,
      funco: () => {
        navigator.clipboard.writeText('cse22100@gmail.com').then(() => {
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
Frontend Developer @ TechCorp (2023-Present)
• Built responsive web applications using React & TypeScript
• Improved site performance by 40% through optimization
• Collaborated with design team on user experience improvements

Junior Developer @ StartupXYZ (2022-2023)
• Developed RESTful APIs using Node.js and Express
• Implemented database schemas and queries
• Participated in agile development processes
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
    whoami: {
      description: 'Display current user',
      usage: 'whoami',
      fn: () => 'anita.maxwynn'
    },
    ls: {
      description: 'List available sections',
      usage: 'ls',
      fn: () => '\nabout \nskills  \nprojects  \nexperience  \ncontact  \nresume'
    },
    pwd: {
      description: 'Print working directory',
      usage: 'pwd',
      fn: () => '\n/Visca/El/Barca'
    },
    clear: {
      description: 'Clear the terminal screen',
      usage: 'clear',
      fn: () => '\x1b[2J\x1b[H'
    },
    clr: {
      description: 'Clear the terminal screen (alias for clear)',
      usage: 'clr',
      fn: () => '\x1b[2J\x1b[H'
    },
    cls: {
      description: 'Clear the terminal screen (Windows-style alias)',
      usage: 'cls',
      fn: () => '\x1b[2J\x1b[H'
    },
    echo: {
      description: 'Echo the input text',
      usage: 'echo <text>',
      fn: (args = []) => args.length ? '\n'+args.join(' ') : '\nNo text provided',
    },
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
          
          // Add error handling
          audio.play().catch(err => {
            console.log('Audio play failed:', err);
          });

          // Also play the video explicitly
          const video = document.getElementById('hacker-video') as HTMLVideoElement;
          if (video) {
            video.play().catch(err => {
              console.log('Video play failed:', err);
            });
          }

          setTimeout(() => {
            overlay.classList.add('hidden');
            audio.pause();
            if (video) video.pause();
          }, 8000);
        } else {
          console.log('Elements not found:', { overlay, audio });
        }
      }
    }


  };

  return (
    <div className="w-full overflow-auto bg-black text-white">
      <ParticlesBackground>
        <div className="mx-auto w-full container">
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

          <TerminalComponent commands={commands1} />
        </div>
      </ParticlesBackground>
    </div>
  );
};

export default App;
