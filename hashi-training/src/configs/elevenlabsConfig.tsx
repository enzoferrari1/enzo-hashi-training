import { DEFAULT_VOICES_ID } from "@/constants";
import { ElevenLabsClient } from "elevenlabs";

const getIdByVoice = (voice: string) => {
  const voice_object = DEFAULT_VOICES_ID.find(
    (v) => v.name.toLowerCase() === voice.toLowerCase()
  );
  return voice ? voice_object?.voice_id : null;
};

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.NEXT_PUBLIC_11LABS_API_KEY, // Defaults to process.env.ELEVENLABS_API_KEY
});

export const create11Audio = async (script: string, voice: string) => {
  const voice_id = getIdByVoice(voice);

  if (!voice_id) {
    throw new Error(`Voice "${voice}" not found!`);
  }

  const audioData = await elevenlabs.textToSpeech.convertWithTimestamps(
    voice_id,
    {
      text: script,
    }
  );

  return audioData;
};
