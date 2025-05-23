import { writeFile } from 'node:fs/promises';
import type { WordCombination } from '../types/word-combination';

export class OutputService {
  constructor(private readonly filePath: string) {}

  format(combinations: WordCombination[]): string {
    if (combinations.length === 0) {
      return 'No combinations found.';
    }

    return combinations.map((combination) => `${combination.parts.join('+')}=${combination.target}`).join('\n');
  }

  formatSummary(combinations: WordCombination[]): string {
    return `Found ${combinations.length} word combination(s) that form 6-character words.`;
  }

  writeToFile(combinations: WordCombination[]): Promise<void> {
    const content = this.format(combinations);
    return writeFile(this.filePath, content);
  }
}
