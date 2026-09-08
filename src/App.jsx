import React from "react";
import Navbar from "./components/Navbar";
import { Window } from "./components/Window";
import { DesktopProvider } from "./contexts/DesktopContext";
import { useWindowManager } from "./hooks/useWindowManager";

const windowConfigs = [
  { id: 1, name: "Projects", type: "finder" },
  { id: 3, name: "Contact", type: "contact" },
  { id: 4, name: "Resume", type: "resume" },
];

const App = () => {
  const manager = useWindowManager(windowConfigs);

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <DesktopProvider value={manager}>
        <Navbar />
        {Array.from(manager.windows.values()).map(
          ({ config, state, actions }, index) => (
            <Window
              key={config.id}
              config={config}
              state={state}
              actions={actions}
              cascadeIndex={index}
            />
          ),
        )}
      </DesktopProvider>
    </main>
  );
};

export default App;
