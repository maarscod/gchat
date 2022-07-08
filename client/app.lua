local gg = gg
local debug

local SERVER = "https://gameguardianchat.herokuapp.com/"
local TOKEN = ""

local username = (function()
  local prompt = gg.prompt({"username", "Remember"}, nil, {"text", "checkbox"})
  if not prompt then
    return nil
  end
  return prompt[1]
end)()

local function forEach(arr, callback)
  for index, value in pairs(arr) do
    callback(value, index)
  end
end

local function separator()
  local separator = ""
  for i = 0, 20 do
    separator = separator .. "-"
  end
  return separator
end

local function formatMsg(messages)
  local result = ""
  forEach(messages, function(message)
    result =
      result .. "🧑‍💻 " .. message.name .. "\n" .. "🕥 " .. message.date ..
        "\n\n" .. message.message .. "\n" .. (separator()) .. "\n\n"
  end)
  return result
end

local function getMessage()
  local result = gg.makeRequest(SERVER).content
  local _, messages = pcall(load(result))
  return messages
end

local function sendMessage()
  local prompt = gg.prompt({"Enter message"}, nil, {"text"})
  if not prompt then
    return nil
  end

  local message = prompt[1]
  local data = string.format("name=%s&message=%s", username, message)
  local _, result = pcall(load(gg.makeRequest(SERVER, nil, data).content))
  gg.alert(result.result)
end

local function main()
  debug = false
  while (true) do
    local messages = getMessage()
    -- table.sort(messages)
    local action = gg.alert(formatMsg(messages), "Refresh", "Send", "Close")
    if (action == 2) then
      sendMessage()
    end
    if (action == 3) then
      gg.setVisible(false)
    end
  end
end

while (true) do
  if (gg.isVisible()) then
    debug = true
    gg.setVisible(false)
  end
  if (debug) then
    main()
  end
end
