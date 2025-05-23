import type { WordCombination } from '../types/word-combination';

export class WordCombinerService {
  constructor(private readonly maxWordLength: number = 6) {}

  findCombinations(words: string[]): WordCombination[] {
    const combinations: WordCombination[] = [];
    const wordSet = new Set(words);
    const seenCombinations = new Set<string>();
    const validWords = words.filter((word) => word.length > 0 && word.length < this.maxWordLength);

    for (let i = 0; i < validWords.length; i++) {
      const word1 = validWords[i];
      for (let j = i + 1; j < validWords.length; j++) {
        const word2 = validWords[j];
        if (word1.length + word2.length !== this.maxWordLength) continue;

        const combined = word1 + word2;
        if (wordSet.has(combined)) {
          const combinationKey = [word1, word2].sort().join('+');
          if (!seenCombinations.has(combinationKey)) {
            seenCombinations.add(combinationKey);
            combinations.push({
              parts: [word1, word2],
              target: combined,
            });
          }
        }
      }
    }

    return combinations;
  }
}
