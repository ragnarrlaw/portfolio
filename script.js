document.addEventListener("DOMContentLoaded", () => {
    const bootLog = document.getElementById("boot-log");
    const bootScreen = document.getElementById("boot-screen");
    const mainScreen = document.getElementById("main-screen");
    const outputDiv = document.getElementById("output");
    const inputLine = document.getElementById("input-line");
    const inputField = document.getElementById("command-input");

    const bootMessages = [
        "Initializing system...",
        "Loading modules...",
        "Starting services...",
        "Welcome to Portfolio Terminal OS v1.0 (Minimal Version)"
    ];

    // prettier-ignore
    const asciiArt = `
<- DARTH VADER ->

                       .-.
                      |_:_|
                     /(_Y_)\\
.                   ( \\/M\\/ )
 '.               _.'-/'-'\-'._
   ':           _/.--'[[[[]'--.\\_
     ':        /_'  : |::"| :  '.\\
       ':     //   ./ |oUU| \.'  :\\
         ':  _:'..' \\_|___|_/ :   :|
           ':.  .'  |_[___]_|  :.':\\
            [::\\ |  :  | |  :   ; : \\
             '-'   \\/'.| |.' \\  .;.' |
             |\\_    \\  '-'   :       |
             |  \\    \\ .:    :   |   |
             |   \\    | '.   :    \\  |
             /       \\   :. .;       |
            /     |   |  :__/     :  \\
           |  |   |    \\:   | \\   |   ||
          /    \\  : :  |:   /  |__|   /|
          |     : : :_/_|  /'._\\  '--|_\\
          /___.-/_|-'   \\  \\
`;

    let messageIndex = 0;

    function showBootMessages() {
        if (messageIndex < bootMessages.length) {
            bootLog.innerText += bootMessages[messageIndex] + "\n";
            messageIndex++;
            setTimeout(showBootMessages, 1000);
        } else {
            const asciiArtDiv = document.createElement("div");
            asciiArtDiv.innerHTML = `<pre>${asciiArt}</pre>`;
            bootLog.appendChild(asciiArtDiv);
            setTimeout(() => {
                bootScreen.style.display = "none";
                mainScreen.style.display = "flex";
                displaySystemInfo();
                inputField.focus();
            }, 2000);
        }
    }

    function displaySystemInfo() {
        const systemInfo = `
Portfolio Terminal OS v1.0
All rights reserved.
        `;
        const infoDiv = document.createElement("div");
        infoDiv.textContent = systemInfo.trim();
        outputDiv.appendChild(infoDiv);

        addNewPrompt();
    }

    inputField.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const command = inputField.value.trim();
            executeCommand(command);
            inputField.value = "";
        }
    });

    function executeCommand(command) {
        // Display the command in the terminal
        const commandOutput = document.createElement("div");
        commandOutput.innerHTML = `<span class="prompt">user@portfolio:~$</span> ${command}`;
        outputDiv.appendChild(commandOutput);

        // Process the command
        if (command.startsWith("man")) {
            displayMan(command.split(" ")[1]);
        } else if (command === "clear") {
            clearTerminal();
        } else if (command === "date") {
            displayDate();
        } else if (command === "weather") {
            displayWeather();
        } else if (command === "joke") {
            displayJoke();
        } else if (command === "calendar") {
            displayCalendar();
        } else if (command === "shutdown") {
            shutdownSystem();
        } else if (command === "neofetch") {
            displayNeofetchInfo();
        } else {
            const errorMessage = document.createElement("div");
            errorMessage.textContent = `Command not found: ${command}`;
            outputDiv.appendChild(errorMessage);
        }

        // Add a new prompt line
        addNewPrompt();

        // Auto-scroll terminal
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }

    function shutdownSystem() {
        const shutdownMessage = "Shutting down...";
        const shutdownOutput = document.createElement("div");
        shutdownOutput.textContent = shutdownMessage;
        outputDiv.appendChild(shutdownOutput);

        setTimeout(() => {
            mainScreen.style.display = "none";
            bootScreen.style.display = "flex";
            bootLog.innerText = "";
            messageIndex = 0;
            showBootMessages();
        }, 2000);
    }

    function displayMan(command) {
        let manMessage;
        switch (command) {
            case "clear":
                manMessage = `
NAME
    clear - clear the terminal screen

SYNOPSIS
    clear

DESCRIPTION
    The clear command clears the terminal screen.
                `;
                break;
            case "date":
                manMessage = `
NAME
    date - display the current date and time

SYNOPSIS
    date

DESCRIPTION
    The date command displays the current date and time.
                `;
                break;
            case "weather":
                manMessage = `
NAME
    weather - display the current weather

SYNOPSIS
    weather

DESCRIPTION
    The weather command displays the current weather.
                `;
                break;
            case "joke":
                manMessage = `
NAME
    joke - display a random joke

SYNOPSIS
    joke

DESCRIPTION
    The joke command displays a random joke.
                `;
                break;
            case "calendar":
                manMessage = `
NAME
    calendar - display the current month's calendar

SYNOPSIS
    calendar

DESCRIPTION
    The calendar command displays the current month's calendar.
                `;
                break;
            case "shutdown":
                manMessage = `
NAME
    shutdown - shutdown and restart the system

SYNOPSIS
    shutdown

DESCRIPTION
    The shutdown command shuts down and restarts the system.
                `;
                break;
            case "neofetch":
                manMessage = `
NAME
    neofetch - display system information

SYNOPSIS
    neofetch

DESCRIPTION
    The neofetch command displays system information.
                `;
                break;
            default:
                manMessage = `
Available commands:
  - man: Display this help message
  - clear: Clear the terminal screen
  - date: Display the current date and time
  - weather: Display the current weather
  - joke: Display a random joke
  - calendar: Display the current month's calendar
  - shutdown: Shutdown and restart the system
  - neofetch: Display system information
                `;
                break;
        }
        const manOutput = document.createElement("div");
        manOutput.textContent = manMessage;
        outputDiv.appendChild(manOutput);
    }

    function clearTerminal() {
        outputDiv.innerHTML = "";
        displaySystemInfo();
    }

    function addNewPrompt() {
        // Move the input line to the end of the terminal
        inputLine.remove();
        outputDiv.appendChild(inputLine);
        inputField.focus();
    }

    function displayDate() {
        const date = new Date();
        const dateMessage = `Current date and time: ${date.toString()}`;
        const dateOutput = document.createElement("div");
        dateOutput.id = "date-info";
        dateOutput.textContent = dateMessage;
        outputDiv.appendChild(dateOutput);
    }

    function displayWeather() {
        const weatherMessage = "Current weather: Sunny, 25°C"; // Placeholder for actual weather data
        const weatherOutput = document.createElement("div");
        weatherOutput.id = "weather-info";
        weatherOutput.textContent = weatherMessage;
        outputDiv.appendChild(weatherOutput);
    }

    function displayJoke() {
        const jokeMessage = "Why do programmers prefer dark mode? Because light attracts bugs!";
        const jokeOutput = document.createElement("div");
        jokeOutput.id = "joke";
        jokeOutput.textContent = jokeMessage;
        outputDiv.appendChild(jokeOutput);
    }

    function displayCalendar() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const today = now.getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let calendar = "Sun Mon Tue Wed Thu Fri Sat\n";
        for (let i = 0; i < firstDay; i++) {
            calendar += "    ";
        }
        for (let day = 1; day <= daysInMonth; day++) {
            if (day === today) {
                calendar += `<u>${day.toString().padStart(3, " ")}</u> `;
            } else {
                calendar += day.toString().padStart(3, " ") + " ";
            }
            if ((day + firstDay) % 7 === 0) {
                calendar += "\n";
            }
        }

        const calendarOutput = document.createElement("div");
        calendarOutput.id = "calendar-info";
        calendarOutput.innerHTML = calendar;
        outputDiv.appendChild(calendarOutput);
    }

    function displayNeofetchInfo() {
        const fetchInfo = `
user@portfolio
---------------
OS: Portfolio Terminal OS v1.0
Host: User's Personal Computer
Kernel: JavaScript
Uptime: A few moments
Packages: 5 (npm)
Shell: Portfolio Terminal
Resolution: 1920x1080
DE: Custom
WM: Custom
Terminal: Portfolio Terminal
CPU: Intel Core i7
GPU: NVIDIA GTX 1080
Memory: 16GB
        `;
        const fetchArt = `
         _nnnn_                      
        dGGGGMMb     ,"""""""""""""".
       @p~qp~~qMb    | Linux Rules! |
       M|@||@) M|   _;..............'
       @,----.JM| -'
      JS^\\__/  qKL
     dZP        qKRb
    dZP          qKKb
   fZP            SMMb
   HZM            MMMM
   FqM            MMMM
 __| ".        |\\dS"qML
 |    \`.       | \`' \\Zq
_)      \\.___.,|     .'
\\____   )MMMMMM|   .'
        `;

        const fetchContainer = document.createElement("div");
        fetchContainer.id = "fetch-container";

        const fetchArtDiv = document.createElement("div");
        fetchArtDiv.id = "fetch-art";
        fetchArtDiv.innerHTML = `<pre>${fetchArt}</pre>`;

        const fetchInfoDiv = document.createElement("div");
        fetchInfoDiv.id = "fetch-info";
        fetchInfoDiv.innerHTML = `<pre>${fetchInfo}</pre>`;

        fetchContainer.appendChild(fetchArtDiv);
        fetchContainer.appendChild(fetchInfoDiv);

        outputDiv.appendChild(fetchContainer);
    }

    showBootMessages();
});
