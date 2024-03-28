const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { VertexAI } = require("@google-cloud/vertexai");
const { getAuth } = require("firebase-admin/auth");

initializeApp();

const vertex_ai = new VertexAI({
  project: "realmspinner-b4902",
  location: "us-central1",
});

const model = "gemini-1.0-pro-001";

const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generation_config: {
    max_output_tokens: 1024,
    temperature: 0.2,
    top_p: 0.8,
    top_k: 40,
  },
  safety_settings: [
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
});

async function generateContent(characterRace, characterClass, characterName) {
  const req = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Generate a backstory for my Dungeons & Dragons character. They are a ${characterRace} ${characterClass} named ${characterName}`,
          },
        ],
      },
    ],
  };

  const response = await generativeModel.generateContent(req);
  return response;
}

exports.generateBackstory = onRequest(
  { cors: true },
  async (request, response) => {
    const token = request.headers.authorization;
    const authResponse = await getAuth().verifyIdToken(token);

    if (authResponse?.uid) {
      const { characterRace, characterClass, characterName } = request.body;
      const data = await generateContent(
        characterRace,
        characterClass,
        characterName
      );
      response.send(data);
    }
  }
);
