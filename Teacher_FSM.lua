local NPC = script.Parent  -- NPC REF
local Humanoid = NPC:FindFirstChild("Humanoid")
local RootPart = NPC:FindFirstChild("HumanoidRootPart")
local Players = game:GetService("Players")

-- STATES DICT (TABLE)
local STATES = {
	IDLE = "Idle",
	GOPLYR = "GoToPlayer",
	ASK = "AskQuestion",
	WAITANS = "WaitForAnswer",
	CHECKANS = "CheckAnswer",
	ATKPLYR = "AttackPlayer",
	RETURN_TO_SPAWN = "ReturnToSpawn"
}

-- IMPORTANT NPC VARIABLES [INITIALISE HERE]
local npcFSM = {
	currentState = STATES.IDLE,
	targetPlayer = nil,
	spawnPosition = RootPart.Position
}

-- FSM Handlers
local function enterIdle()
	
end

local function enterGoToPlayer()
	
end

local function enterAskQuestion()
	
end

local function enterWaitForAnswer()
	
end

local function enterCheckAnswer()
	
end

local function enterAttackPlayer()
	
end

local function enterReturnToSpawn()
	
end

-- LOOP HANDLER (Acts as Void Update)
while true do
	if npcFSM.currentState == STATES.IDLE then
		enterIdle()
	elseif npcFSM.currentState == STATES.GOPLYR then
		enterGoToPlayer()
	elseif npcFSM.currentState == STATES.ASK then
		enterAskQuestion()
	elseif npcFSM.currentState == STATES.WAITANS then
		enterWaitForAnswer()
	elseif npcFSM.currentState == STATES.CHECKANS then
		enterCheckAnswer()
	elseif npcFSM.currentState == STATES.ATKPLYR then
		enterAttackPlayer()
	elseif npcFSM.currentState == STATES.RETURN_TO_SPAWN then
		enterReturnToSpawn()
	end
	task.wait(0.5)  -- SO LOOP DOESNT GO TOO FAST
end
