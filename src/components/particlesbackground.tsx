import { useEffect, useState} from "react";
import type { ReactNode } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

interface ParticlesBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ 
  className,
  style = {},
  children
}) => {
  const [init, setInit] = useState(false);
  const [particlesConfig, setParticlesConfig] = useState<any>(null);

  useEffect(() => {
    fetch('/particles.json')
      .then(response => response.json())
      .then(config => setParticlesConfig(config))
      .catch(error => console.error('Error loading particles config:', error));

    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (container: Container | undefined): Promise<void> => {
    console.log("Particles Loaded:", container);
  };

  const defaultStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    ...style
  };

  return (
    <div className={className} style={defaultStyle}>
      {/* Background Particles */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none"  // So particles don't block UI clicks
      }}>
        {init && particlesConfig && (
          <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={particlesConfig}
          />
        )}
      </div>

      {/* Foreground UI */}
      <div style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default ParticlesBackground;
