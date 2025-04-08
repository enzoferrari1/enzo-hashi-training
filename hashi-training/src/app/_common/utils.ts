type AudioAlignment = {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
};

type WordAlignment = {
  word: string;
  start: number;
  end: number;
};

export function getWordAlignments(alignment: AudioAlignment): WordAlignment[] {
  const {
    characters,
    character_start_times_seconds,
    character_end_times_seconds,
  } = alignment;
  const wordAlignments: WordAlignment[] = [];

  let currentWord = "";
  let wordStartTime: number | null = null;
  let wordEndTime: number | null = null;

  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    const isSpaceOrPunct = /\s|[.,!?;:]/.test(char);

    if (!isSpaceOrPunct) {
      if (currentWord === "") {
        wordStartTime = character_start_times_seconds[i];
      }
      currentWord += char;
      wordEndTime = character_end_times_seconds[i];
    }

    if ((isSpaceOrPunct || i === characters.length - 1) && currentWord !== "") {
      wordAlignments.push({
        word: currentWord,
        start: wordStartTime!,
        end: wordEndTime!,
      });
      currentWord = "";
      wordStartTime = null;
      wordEndTime = null;
    }
  }

  return wordAlignments;
}
