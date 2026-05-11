type CorrectionPayload = {
  text?: string;
};

type CorrectionResult = {
  correctedText: string;
  feedbackId: string;
  strengths: string[];
  corrections: {
    original: string;
    corrected: string;
    reason: string;
  }[];
  nextPractice: string[];
};

type ResponseContent = {
  type?: string;
  text?: string;
};

type ResponseOutput = {
  content?: ResponseContent[];
};

type OpenAIResponse = {
  output_text?: string;
  output?: ResponseOutput[];
};

export const runtime = "nodejs";

function extractOutputText(data: OpenAIResponse) {
  if (typeof data.output_text === "string") return data.output_text;

  return (
    data.output
      ?.flatMap((item) => item.content ?? [])
      .map((content) => content.text)
      .find((text): text is string => Boolean(text)) ?? ""
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? "gpt-5.2";

  if (!apiKey) {
    return Response.json(
      {
        error:
          "AI koreksi belum aktif. Tambahkan OPENAI_API_KEY di environment lokal atau Vercel, lalu deploy ulang.",
      },
      { status: 503 },
    );
  }

  let payload: CorrectionPayload;

  try {
    payload = (await request.json()) as CorrectionPayload;
  } catch {
    return Response.json({ error: "Body request tidak valid." }, { status: 400 });
  }

  const text = payload.text?.trim();

  if (!text) {
    return Response.json({ error: "Tulis beberapa kalimat dulu sebelum meminta koreksi." }, { status: 400 });
  }

  if (text.length > 4000) {
    return Response.json({ error: "Teks terlalu panjang. Batasi maksimal 4000 karakter." }, { status: 400 });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      instructions:
        "Kamu adalah tutor bahasa Jerman A2 untuk pelajar Indonesia. Koreksi tulisan Jerman dengan ramah, praktis, dan ringkas. Jelaskan alasan dalam bahasa Indonesia sederhana. Jangan mengubah maksud penulis.",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Koreksi tulisan Jerman A2 ini:\n\n${text}`,
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "german_writing_correction",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              correctedText: {
                type: "string",
                description: "Versi tulisan yang sudah dikoreksi dalam bahasa Jerman.",
              },
              feedbackId: {
                type: "string",
                description: "Ringkasan feedback utama dalam bahasa Indonesia.",
              },
              strengths: {
                type: "array",
                items: { type: "string" },
                description: "Hal yang sudah bagus dari tulisan pengguna.",
              },
              corrections: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    original: { type: "string" },
                    corrected: { type: "string" },
                    reason: { type: "string" },
                  },
                  required: ["original", "corrected", "reason"],
                },
                description: "Daftar koreksi penting, bukan semua typo kecil.",
              },
              nextPractice: {
                type: "array",
                items: { type: "string" },
                description: "Latihan lanjutan singkat yang bisa langsung dikerjakan.",
              },
            },
            required: ["correctedText", "feedbackId", "strengths", "corrections", "nextPractice"],
          },
        },
      },
    }),
  });

  if (!response.ok) {
    return Response.json(
      {
        error: "OpenAI belum bisa mengoreksi sekarang. Cek API key, model, atau limit akun.",
      },
      { status: response.status },
    );
  }

  const data = (await response.json()) as OpenAIResponse;
  const outputText = extractOutputText(data);

  try {
    const result = JSON.parse(outputText) as CorrectionResult;
    return Response.json(result);
  } catch {
    return Response.json(
      {
        error: "Respons AI tidak bisa dibaca. Coba kirim ulang dengan teks yang lebih pendek.",
      },
      { status: 502 },
    );
  }
}
