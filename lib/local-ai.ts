/**
 * Intégration avec IA locale via Ollama (DeepSeek, etc.)
 */

/**
 * Génère du contenu avec un modèle IA local via Ollama
 */
export async function generateWithLocalModel(prompt: string): Promise<string> {
  const ollamaUrl = process.env.OLLAMA_URL ?? 'http://localhost:11434';
  const model = process.env.LOCAL_AI_MODEL ?? 'deepseek-coder-v2';

  console.log(`[Local AI] Calling Ollama at ${ollamaUrl} with model ${model}`);

  const res = await fetch(`${ollamaUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
    }),
  });

  if (!res.ok) {
    throw new Error(`Local AI generation failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.response;
}
