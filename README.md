
# Kidocode Roblox NPC Teacher

A Roblox NPC that uses AI and an FSM model that aims to teach Kidocode's students through Roblox as its medium.

## Description
Kidocode Roblox NPC Teacher is a Roblox-based educational NPC that leverages a Finite-State Machine (FSM) to interact with students and facilitate learning. The NPC integrates with Google's Gemini 2.0 Flash (Experimental) AI model to generate dynamic, curriculum-aligned questions based on Kidocode's learning syllabus.

The backend is built with NodeJS and hosted on Glitch, where it uses the Gemini API to generate content. Roblox fetches these questions asynchronously using Promise's service, ensuring smooth integration and real-time responsiveness within the game environment.
## Installation

### **Prerequisites**
Ensure you have the following installed:

- [Roblox Studio](https://create.roblox.com) - Main Development Tool for Roblox.
## Structure
```sh
📦 Kidocode-NPCTeacher
├── 📂 src
│   ├── 📂 StarterGui                # Files that belong in StarterGui Folder in Roblox
│   │   └── 📜 dialogueGUI.rbxm      # Insert into StarterGui in Roblox
│   │
│   ├── 📂 ServerScriptService       # Files that belong in ServerScriptService
│   │   └── 📜 qstnGenerator.rbxm    # Handles API Interaction (Insert into ServerScriptService in Roblox)
│   │
│   ├── 📂 ReplicatedStorage         # Files that belong in ReplicatedStorage
│   │   └── 📜 RemoteItems.rbxm      # RemoteEvents, Functions, that belong in the ReplicatedStorage
│   │
│   └── 📂 Workspace                 # Files that belong in the Workspace
│       └── 📜 NPC_Teacher.rbxm      # NPC Teacher Object, belongs in the Workspace
│
└── 📂 apiserver/              # API server to interact with Gemini AI (hosted on Glitch during testing)
│   ├── 📜 server.js           # NodeJS backend logic
│   ├── 📜 package.json        # Dependency configuration
│   └── 📜 .env                # Environment variables (ignored by Git)
│
└── 📜 README.md         # Project documentation
 ```

## How It Works

### NPC Teaching Flow
    1. NPC checks if there are any players in its range.

    2. If there are any, NPC walks up to the nearest player in range.

    3. FSM transitions into an AskQuestion state.

    4. Roblox sends a request to the external NodeJS API server.

    5. Gemini AI generates a question and answer set.

    6. The NPC presents the question via a GUI and awaits a response.

    7. FSM handles player answer and transitions accordingly.

### Edge Case Handling
    - If API is unreachable, a fallback message is shown.

    - If the student answers incorrectly, the NPC transitions to an AttackPlayer state (for gamified feedback).

    - If the student is correct, the NPC responds positively and resets, going back to its spawn.

### API Setup
>[!WARNING]
> **DO NOT UPLOAD YOUR API KEY TO THE GITHUB REPO**
1. Get an API key from the LLM provider of your choice.
2. Safely keep your API key. (NEVER PUSH IT ONTO GITHUB.)
3. Add your API key to the server.js file.
4. After making modifications, restart the NodeJS server.
