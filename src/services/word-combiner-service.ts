import type { WordCombination } from '../types/word-combination';

export class WordCombinerService {
  constructor(
    private readonly maxWordLength: number = 6,
    private readonly maxParts: number = 2,
  ) {}

  private indexWordsByLength(words: string[]): Map<number, string[]> {
    const index = new Map<number, string[]>();
    for (const word of words) {
      if (word.length > 0 && word.length < this.maxWordLength) {
        const wordsOfLength = index.get(word.length) || [];
        wordsOfLength.push(word);
        index.set(word.length, wordsOfLength);
      }
    }
    return index;
  }

  private findTwoWordCombinations(
    words: string[],
    wordSet: Set<string>,
    seenCombinations: Set<string>,
  ): WordCombination[] {
    const combinations: WordCombination[] = [];

    for (let i = 0; i < words.length; i++) {
      const word1 = words[i];
      if (word1.length >= this.maxWordLength) continue;

      for (let j = i + 1; j < words.length; j++) {
        const word2 = words[j];
        if (word2.length >= this.maxWordLength) continue;

        const combined = word1 + word2;
        if (combined.length === this.maxWordLength && wordSet.has(combined)) {
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

  private findMultiWordCombinations(
    words: string[],
    wordSet: Set<string>,
    seenCombinations: Set<string>,
  ): WordCombination[] {
    const combinations: WordCombination[] = [];
    const wordsByLength = this.indexWordsByLength(words);

    const findCombinationsRecursive = (currentParts: string[], remainingLength: number): void => {
      if (currentParts.length >= this.maxParts || remainingLength <= 0) {
        return;
      }

      for (let length = 1; length <= remainingLength; length++) {
        const wordsOfLength = wordsByLength.get(length) || [];

        for (const word of wordsOfLength) {
          if (currentParts.includes(word)) continue;

          const newParts = [...currentParts, word];
          const newRemainingLength = remainingLength - length;

          if (newRemainingLength === 0) {
            const combined = newParts.join('');
            if (wordSet.has(combined)) {
              const combinationKey = newParts.sort().join('+');
              if (!seenCombinations.has(combinationKey)) {
                seenCombinations.add(combinationKey);
                combinations.push({
                  parts: newParts,
                  target: combined,
                });
              }
            }
          } else {
            findCombinationsRecursive(newParts, newRemainingLength);
          }
        }
      }
    };

    findCombinationsRecursive([], this.maxWordLength);
    return combinations;
  }

  findCombinations(words: string[]): WordCombination[] {
    const wordSet = new Set(words);
    const seenCombinations = new Set<string>();

    if (this.maxParts === 2) {
      return this.findTwoWordCombinations(words, wordSet, seenCombinations);
    }

    return this.findMultiWordCombinations(words, wordSet, seenCombinations);
  }
}
