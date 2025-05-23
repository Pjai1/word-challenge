import { describe, it, expect } from 'vitest';
import { WordCombinerService } from './word-combiner-service';

describe('WordCombinerService', () => {
  const service = new WordCombinerService();

  it('should find valid two-word combinations', () => {
    const words = ['fo', 'obar', 'foobar', 'test', 'er', 'tester'];
    const combinations = service.findCombinations(words, 6);

    expect(combinations).toContainEqual({
      parts: ['fo', 'obar'],
      target: 'foobar',
    });
    expect(combinations).toContainEqual({
      parts: ['test', 'er'],
      target: 'tester',
    });
  });

  it('should return empty array when no combinations exist', () => {
    const words = ['hello', 'world', 'test'];
    const combinations = service.findCombinations(words, 6);

    expect(combinations).toHaveLength(0);
  });

  it('should not reuse the same word in a combination', () => {
    const words = ['abc', 'abcabc'];
    const combinations = service.findCombinations(words, 6);

    expect(combinations).toHaveLength(0);
  });

  it('should work with different target lengths', () => {
    const words = ['ab', 'cd', 'abcd'];
    const combinations = service.findCombinations(words, 4);

    expect(combinations).toHaveLength(1);
    expect(combinations[0]).toEqual({
      parts: ['ab', 'cd'],
      target: 'abcd',
    });
  });

  it('should handle real-world example with han+nah=hannah', () => {
    const words = ['han', 'nah', 'hannah'];
    const combinations = service.findCombinations(words, 6);

    expect(combinations).toContainEqual({
      parts: ['han', 'nah'],
      target: 'hannah',
    });
  });
});
