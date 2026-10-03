import React from "react";
import { Navbar } from "./components/Navbar";
import { Window } from "./components/Window";
import { DesktopProvider } from "./contexts/DesktopContext";
import { useWindowManager } from "./hooks/useWindowManager";
import Dock from "./components/Dock";

const windowConfigs = [
  { id: 1, name: "Projects", type: "projects" },
  { id: 3, name: "Contact", type: "contact" },
  // { id: 4, name: "Resume", type: "resume" },
  { id: 5, name: "Finder", img: "/icons/finder.png", open: true },
  { id: 6, name: "Terminal", img: "/icons/terminal.png", open: false },
  // { id: 2, name:"VS Code", img:},
  { id: 8, name: "Trash", img: "/icons/trash.png", open: true },
];

const App = () => {
  const manager = useWindowManager(windowConfigs);

  return (
    <main>
      <DesktopProvider value={manager}>
        <Navbar />
        <Dock />
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
