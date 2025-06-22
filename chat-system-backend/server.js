const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let personas = new Map();
let conversations = new Map();
let messageQueue = [];
let activeUsers = new Map();

// Configuration
const CONFIG = {
  openaiApiKey:
    process.env.OPENAI_API_KEY ||
    "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",
  typingSpeed: { min: 50, max: 150 }, // characters per minute
  pauseBetweenMessages: { min: 2000, max: 8000 }, // milliseconds
  maxRetries: 3,
};

// Utility functions
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const simulateTypingTime = (messageLength) => {
  const speed =
    Math.random() * (CONFIG.typingSpeed.max - CONFIG.typingSpeed.min) +
    CONFIG.typingSpeed.min;
  return (messageLength / speed) * 60000; // Convert to milliseconds
};

const generatePause = () => {
  return (
    Math.random() *
      (CONFIG.pauseBetweenMessages.max - CONFIG.pauseBetweenMessages.min) +
    CONFIG.pauseBetweenMessages.min
  );
};

// OpenAI API integration
async function generateResponse(prompt, persona, conversationHistory = []) {
  try {
    const systemMessage = {
      role: "system",
      content: `You are ${persona.name}. ${persona.description}.
      Tone: ${persona.tone}.
      Style: ${persona.style}.
      Rules: ${persona.rules.join(", ")}.
      Keep responses brief and natural for a DM conversation.`,
    };

    const messages = [
      systemMessage,
      ...conversationHistory.slice(-10), // Last 10 messages for context
      { role: "user", content: prompt },
    ];

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 150,
        temperature: 0.8,
      },
      {
        headers: {
          Authorization: `Bearer ${CONFIG.openaiApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    throw new Error("Failed to generate response");
  }
}

// Routes

// Persona management
app.post("/api/personas", (req, res) => {
  const { name, description, tone, style, rules, templates } = req.body;
  const personaId = uuidv4();

  const persona = {
    id: personaId,
    name,
    description,
    tone,
    style,
    rules: rules || [],
    templates: templates || [],
    createdAt: new Date().toISOString(),
  };

  personas.set(personaId, persona);
  res.json({ success: true, persona });
});

app.get("/api/personas", (req, res) => {
  res.json({ personas: Array.from(personas.values()) });
});

app.get("/api/personas/:id", (req, res) => {
  const persona = personas.get(req.params.id);
  if (!persona) {
    return res.status(404).json({ error: "Persona not found" });
  }
  res.json({ persona });
});

app.put("/api/personas/:id", (req, res) => {
  const persona = personas.get(req.params.id);
  if (!persona) {
    return res.status(404).json({ error: "Persona not found" });
  }

  const updatedPersona = {
    ...persona,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  personas.set(req.params.id, updatedPersona);
  res.json({ success: true, persona: updatedPersona });
});

// Message handling
app.post("/api/messages/process", async (req, res) => {
  try {
    const { personaId, incomingMessage, conversationId, userId } = req.body;

    const persona = personas.get(personaId);
    if (!persona) {
      return res.status(404).json({ error: "Persona not found" });
    }

    // Get conversation history
    const conversation = conversations.get(conversationId) || [];

    // Generate response
    const response = await generateResponse(
      incomingMessage,
      persona,
      conversation
    );

    // Calculate timing
    const typingTime = simulateTypingTime(response.length);
    const pauseTime = generatePause();

    // Create message object
    const messageData = {
      id: uuidv4(),
      conversationId,
      userId,
      personaId,
      incomingMessage,
      response,
      typingTime,
      pauseTime,
      status: "queued",
      createdAt: new Date().toISOString(),
    };

    // Add to queue
    messageQueue.push(messageData);

    // Update conversation history
    conversation.push(
      { role: "user", content: incomingMessage },
      { role: "assistant", content: response }
    );
    conversations.set(conversationId, conversation);

    res.json({
      success: true,
      messageId: messageData.id,
      response,
      estimatedDelay: typingTime + pauseTime,
    });

    // Process message asynchronously
    processMessageQueue();
  } catch (error) {
    console.error("Message processing error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Message queue processing
async function processMessageQueue() {
  if (messageQueue.length === 0) return;

  const message = messageQueue.shift();

  try {
    // Simulate typing indicator
    message.status = "typing";
    console.log(
      `[${message.personaId}] Started typing for conversation ${message.conversationId}`
    );

    // Wait for typing time
    await delay(message.typingTime);

    // Simulate sending message
    message.status = "sending";
    console.log(
      `[${message.personaId}] Sending message: "${message.response}"`
    );

    // Here you would integrate with the actual platform API
    // await sendMessageToPlatform(message);

    message.status = "sent";
    message.sentAt = new Date().toISOString();

    // Wait for pause before next message
    await delay(message.pauseTime);

    console.log(`[${message.personaId}] Message sent successfully`);
  } catch (error) {
    console.error("Error processing message:", error);
    message.status = "failed";
    message.error = error.message;
  }

  // Continue processing queue
  if (messageQueue.length > 0) {
    setTimeout(processMessageQueue, 100);
  }
}

// Queue status
app.get("/api/queue/status", (req, res) => {
  res.json({
    queueLength: messageQueue.length,
    messages: messageQueue.map((m) => ({
      id: m.id,
      status: m.status,
      personaId: m.personaId,
      conversationId: m.conversationId,
      createdAt: m.createdAt,
    })),
  });
});

// User activity management
app.post("/api/users/:userId/activity", (req, res) => {
  const { userId } = req.params;
  const { status, personaId } = req.body; // online, away, offline

  activeUsers.set(userId, {
    status,
    personaId,
    lastSeen: new Date().toISOString(),
  });

  res.json({ success: true });
});

app.get("/api/users/active", (req, res) => {
  res.json({ activeUsers: Object.fromEntries(activeUsers) });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    queueLength: messageQueue.length,
    activePersonas: personas.size,
  });
});

// Settings
app.get("/api/settings", (req, res) => {
  res.json({
    typingSpeed: CONFIG.typingSpeed,
    pauseBetweenMessages: CONFIG.pauseBetweenMessages,
    maxRetries: CONFIG.maxRetries,
  });
});

app.put("/api/settings", (req, res) => {
  const { typingSpeed, pauseBetweenMessages, maxRetries } = req.body;

  if (typingSpeed) CONFIG.typingSpeed = typingSpeed;
  if (pauseBetweenMessages) CONFIG.pauseBetweenMessages = pauseBetweenMessages;
  if (maxRetries) CONFIG.maxRetries = maxRetries;

  res.json({ success: true, settings: CONFIG });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("API Error:", error);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Auto Typer Backend running on port ${PORT}`);
  console.log(`📝 Remember to set OPENAI_API_KEY environment variable`);
});

module.exports = app;
