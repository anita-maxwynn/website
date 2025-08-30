import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

interface Command {
  description: string;
  usage: string;
  fn: (args?: string[]) => string;
  funco?: (args?: string[]) => void;
}

interface TerminalComponentProps {
  commands: { [key: string]: Command };
  asciiArt?: string[];
  className?: string;
}

const themes = {
  dark: {
    background: '#000000',
    foreground: '#00ff00',
  },
  light: {
    background: '#f5f5f5',
    foreground: '#222222',
  },
  matrix: {
    background: '#000000',
    foreground: '#00ff00',
    cursor: '#00ff00',
  },
  hacker: {
    background: '#1a1a1a',
    foreground: '#39ff14',
    cursor: '#39ff14',
  },
};

const TerminalComponent: React.FC<TerminalComponentProps> = ({ commands, asciiArt = [], className }) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light' | 'matrix' | 'hacker'>('dark');

  const keyPressPool = useRef<Array<HTMLAudioElement>>(
    Array.from({ length: 5 }, () => new Audio('/sounds/keyboard-click-327728.mp3'))
  );

  const playFeedbackSound = (type: 'success' | 'error'|'evil') => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.volume = 0.5;
    audio.play().catch(err => console.warn(`${type} sound error:`, err));
  };

  const applyTheme = (themeName: string) => {
    const theme = themes[themeName as keyof typeof themes];
    if (theme && xtermRef.current) {
      xtermRef.current.setOption('theme', theme);
    }
  };

  const changeTheme = (themeName: 'dark' | 'light' | 'matrix' | 'hacker') => {
    setCurrentTheme(themeName);
    applyTheme(themeName);
  };

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      cols: 200,
      rows: 40,
      theme: themes[currentTheme],
      scrollback: 1000,
    });

    term.open(terminalRef.current!);
    xtermRef.current = term;

    let currentCommand = '';

    asciiArt.forEach(line => term.writeln(line));
    term.writeln("PolishGirl@root:~$ Welcome to my portfolio terminal ✨");
    term.writeln("Type 'commands' to get started.\r\n");
    term.write('PolishGirl@root:~$ ');

    term.onData((data) => {
      if (data === '\r') {
        handleCommand(currentCommand.trim(), term, commands, changeTheme, playFeedbackSound);
        currentCommand = '';
        term.write('\r\nPolishGirl@root:~$ ');
      } else if (data === '\u007F') {
        if (currentCommand.length > 0) {
          currentCommand = currentCommand.slice(0, -1);
          term.write('\b \b');
        }
      } else {
        currentCommand += data;
        term.write(data);

        const audio = keyPressPool.current[Math.floor(Math.random() * keyPressPool.current.length)];
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    });

    return () => term.dispose();
  }, [commands, asciiArt, currentTheme]);

  return (
    <div
      ref={terminalRef}
      className={`w-full mx-auto rounded-xl overflow-hidden shadow-lg ${className}`}
    />
  );
};

function handleCommand(
  cmd: string,
  term: Terminal,
  commands: { [key: string]: { fn: (args?: string[]) => string; funco?: (args?: string[]) => void } },
  changeTheme: (theme: 'dark' | 'light' | 'matrix' | 'hacker') => void,
  playFeedbackSound: (type: 'success' | 'error') => void
) {
  if (cmd.trim() === '') {
    term.writeln('');
    return;
  }
   if (cmd=='sudo rm -rf /'){
    term.writeln('\nNice try. buddy, but I am not that stupid. Better luck in next life! 😉');
    playFeedbackSound('evil');
    return;
  }

  const [commandName, ...args] = cmd.split(' ');

  if (commandName === 'theme') {
    const newTheme = args[0] as 'dark' | 'light' | 'matrix' | 'hacker';
    if (themes[newTheme]) {
      changeTheme(newTheme);
      term.writeln(`\nTheme changed to '${newTheme}'`);
      playFeedbackSound('success');
    } else {
      term.writeln(`\nUnknown theme: ${newTheme}`);
      playFeedbackSound('error');
    }
    return;
  }

  const command = commands[commandName];
  if (command) {
    try {
      const output = command.fn(args);
      if (command.funco) command.funco(args);
      output.split('\n').forEach(line => term.writeln(line || ''));
      playFeedbackSound('success');
    } catch (err) {
      term.writeln('Error executing command.');
      playFeedbackSound('error');
    }
  } else {
    term.writeln(`\nCommand not found: ${commandName}`);
    playFeedbackSound('error');
  }
}

export default TerminalComponent;