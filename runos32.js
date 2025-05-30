function doRunOS() {
  // NuclearOS - minimalist operating system in pure JavaScript
  
  // 1. Things, that OS need
  function logarray(array=Array) {
      console.log(array);
  };
  function applyInlineStyles(element, styles) {
    Object.assign(element.style, styles);
  };
  function getRandomInt(min=Number, max=Number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  let topZIndex = 10;
  
  // 2. Boot screen
  document.body.style.backgroundColor = "black";
  document.body.style.color = "lime";
  document.body.style.fontFamily = "monospace";
  document.body.style.margin = "0";
  document.body.style.padding = "10px";
  document.body.type = "boot";
  
  document.body.innerHTML = "Loading...";
  
  // 3. Style
  const style = document.createElement("style");
  style.textContent = `
  @keyframes windowOpen {
    0% { opacity: 0; transform: scale(0); }
    50% { opacity: 0.5; transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes windowClose {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1);
    100% { opacity: 0; transform: scale(0); }
  }
  .window {
    animation: windowOpen 0.5s ease-out;
    transition: left 0.1s ease, top 0.1s ease;
  }
  .windowClosing {
    animation: windowClose 0.8s ease-in forwards;
  }
  [type=boot] {
    overflow: unset;
  }
  `;
  document.head.appendChild(style);
  
  // 4. Basic window system
  setTimeout(() => {
    document.body.innerHTML = "";
  
    const desktop = document.createElement("div");
    desktop.style.width = "100vw";
    desktop.style.height = "100vh";
    desktop.style.backgroundColor = "#222";
    desktop.style.position = "relative";
    desktop.style.overflow = "hidden";
    document.body.appendChild(desktop);
  
    // Recycle Bin icon
    const recycleBin = document.createElement("div");
    recycleBin.textContent = 'Recycle Bin';
    recycleBin.style.position = "absolute";
    recycleBin.style.top = "20px";
    recycleBin.style.left = "20px";
    recycleBin.style.color = "#0f0";
    recycleBin.style.fontFamily = "monospace";
    recycleBin.style.cursor = "pointer";
    recycleBin.onclick = () => createWindow("Recycle Bin", "<p style='color:#0f0;'>REMINDER: This Recycle Bin is not functionable.\n\nRecycle Bin is empty.</p>");
    desktop.appendChild(recycleBin);
  
    const taskbar = document.createElement("div");
    taskbar.style.position = "absolute";
    taskbar.style.bottom = "0";
    taskbar.style.left = "0";
    taskbar.style.width = "100%";
    taskbar.style.height = "30px";
    taskbar.style.backgroundColor = "#000";
    taskbar.style.display = "flex";
    taskbar.style.alignItems = "center";
    taskbar.style.justifyContent = "space-between";
    taskbar.style.padding = "0 10px";
    desktop.appendChild(taskbar);
  
    const appsButton = document.createElement("button");
    appsButton.textContent = "Menu";
    appsButton.style.backgroundColor = "#060";
    appsButton.style.color = "#0f0";
    appsButton.style.border = "1px solid #0f0";
    appsButton.style.fontFamily = "monospace";
    appsButton.style.cursor = "pointer";
    taskbar.appendChild(appsButton);
  
    const filler = document.createElement("div");
    taskbar.appendChild(filler);
  
    const appsMenu = document.createElement("div");
    appsMenu.style.position = "absolute";
    appsMenu.style.bottom = "30px";
    appsMenu.style.left = "10px";
    appsMenu.style.backgroundColor = "#111";
    appsMenu.style.border = "2px solid #0f0";
    appsMenu.style.padding = "10px";
    appsMenu.style.display = "none";
    appsMenu.style.flexDirection = "column";
    appsMenu.style.gap = "5px";
    appsMenu.style.resize = "horizontal";
    appsMenu.style.overflow = "auto";
    desktop.appendChild(appsMenu);
  
    function createAppButton(name, onclick) {
      const btn = document.createElement("button");
      btn.textContent = name;
      btn.style.backgroundColor = "#222";
      btn.style.color = "#fff";
      btn.style.border = "1px solid #0f0";
      btn.style.fontFamily = "monospace";
      btn.style.cursor = "pointer";
      btn.onclick = onclick;
      appsMenu.appendChild(btn);
    }
  
    const apps = [
      {
        name: "Notepad",
        content: `<textarea style='width:100%;height:100%;background:#111;color:#0f0;border:none;font-family:monospace;resize:none;outline:none;'></textarea>`
      },
      {
        name: "Browser",
        content: `<iframe src='https://google.com' style='width:100%;height:100%;border:none;'></iframe>`
      },
      {
        name: "ChatGPT",
        content: `<iframe src='https://chatgpt.com' style='width:100%;height:100%;border:none;'></iframe>`
      },
      {
        name: "Scratch",
        content: `<iframe src='https://scratch.mit.edu' style='width:100%;height:100%;border:none;'></iframe>`
      },
      {
        name: "Calculator",
        content: `<iframe src='https://www.online-calculator.com/full-screen-calculator/' style='width:100%;height:100%;border:none;'></iframe>`
      },
      {
        name: "HatJar",
        content: `<iframe src='https://hatjar.wordpress.com' style='width:100%;height:100%;border:none;'></iframe>`
      },
      {
        name: "YouTube",
        content: `<iframe src='https://www.youtube.com' style='width:100%;height:100%;border:none;'></iframe>`
      },
      {
        name: "about:blank",
        content: ``,
        about: {
          blank: true
        }
      },
      {
        name: "Files",
        content: `<iframe src='file:///C:\\' style='width:100%;height:100%;border:none;'></iframe>`
      },
      {
        name: "Paint",
        content: `<iframe src='https://jspaint.app/' style='width:100%;height:100%;border:none;'></iframe>`
      },
      {
        name: "CloudVM",
        content: `<iframe src='index.html' style='width:100%;height:100%;border:none;'></iframe>`,
        about: {
          vm: true
        }
      },
      {
        name: "NuclearDaily",
        content: `<iframe src='https://http://hatjar.wordpress.com/nucleardaily' style='width:100%;height:100%;border:none;'></iframe>`,
        about: {
          vm: true
        }
      },
      {
        name: "NuclearSite",
        content: `<iframe src='https://http://hatjar.wordpress.com/nuclearos' style='width:100%;height:100%;border:none;'></iframe>`,
        about: {
          vm: true
        }
      },
    ];
  
    apps.forEach(app => {
      createAppButton(app.name, () => {createWindow(app.name, app.content);appsMenu.style.display = "none"});
    });
  
    appsButton.onclick = () => {
      appsMenu.style.display = appsMenu.style.display === "none" ? "flex" : "none";
    };
  
    function createWindow(title, content) {
      const win = document.createElement("div");
      win.addEventListener("mousedown", () => {
        topZIndex++;
        win.style.zIndex = topZIndex;
      });
      win.style.position = "absolute";
      win.style.top = Math.random() * 300 + "px";
      win.style.left = Math.random() * 500 + "px";
      win.style.width = "700px";
      win.style.height = "500px";
      win.style.minWidth = "1px";
      win.style.minHeight = "1px";
      win.style.resize = "both";
      win.style.overflow = "auto";
      win.style.border = "2px solid #0f0";
      win.style.backgroundColor = "#111";
      win.style.color = "#0f0";
      win.style.fontFamily = "monospace";
      win.style.zIndex = 10;
      win.style.display = "flex";
      win.style.flexDirection = "column";
      win.classList.add("window");
  
      const header = document.createElement("div");
      header.style.background = "#060";
      header.style.padding = "5px";
      header.style.display = "flex";
      header.style.justifyContent = "space-between";
      header.style.gap = "5px";
      header.style.alignItems = "center";
  
      const titleSpan = document.createElement("span");
      titleSpan.textContent = title;
      header.appendChild(titleSpan);
  
      const closeBtn = document.createElement("span");
      closeBtn.style.border = "2px solid rgb(189, 0, 0)";
      closeBtn.style.backgroundColor = "rgb(255, 55, 55)";
      closeBtn.style.width = "11px";
      closeBtn.style.height = "11px";
      closeBtn.style.marginLeft = "1px";
      closeBtn.onclick = () => {
        win.classList.add("windowClosing");
        setTimeout(() => {
          win.remove();
        }, 1000); // tyle trwa animacja zamknięcia
      };
  
      const flouraBtn = document.createElement("span");
      flouraBtn.style.border = "2px solid rgb(0, 113, 189)";
      flouraBtn.style.backgroundColor = "rgb(55, 142, 255)";
      flouraBtn.style.width = "11px";
      flouraBtn.style.height = "11px";
      flouraBtn.style.marginLeft = "1px";
      flouraBtn.onclick = () => {
        print();
      };
      const buttons = document.createElement("div");
      buttons.style.display = "flex";
      buttons.appendChild(closeBtn);
      buttons.appendChild(flouraBtn);
      header.appendChild(buttons);
  
      win.appendChild(header);
  
      const windowContent = document.createElement("div");
      windowContent.innerHTML = content;
      windowContent.style.flex = "1";
      windowContent.style.padding = "10px";
      windowContent.style.overflow = "auto";
      win.appendChild(windowContent);
  
      let offsetX, offsetY;
      header.addEventListener("mousedown", (e) => {
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        document.body.style.userSelect = "none";
        function onMove(e) {
          win.style.left = e.clientX - offsetX + "px";
          win.style.top = e.clientY - offsetY + "px";
        }
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", () => {
          document.removeEventListener("mousemove", onMove);
          document.body.style.userSelect = "auto";
        }, { once: true });
      });
  
      desktop.appendChild(win);
    }
  }, getRandomInt(1000, 5000));
}