import { describe, it, expect } from 'vitest';
import { WordCombinerService } from './word-combiner-service';

describe('WordCombinerService', () => {
  describe('two-word combinations (default)', () => {
    const service = new WordCombinerService();

    it('should find valid two-word combinations', () => {
      const words = ['fo', 'obar', 'foobar', 'test', 'er', 'tester'];
      const combinations = service.findCombinations(words);

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
      const combinations = service.findCombinations(words);

      expect(combinations).toHaveLength(0);
    });

    it('should not reuse the same word in a combination', () => {
      const words = ['abc', 'abcabc'];
      const combinations = service.findCombinations(words);

      expect(combinations).toHaveLength(0);
    });

    it('should work with different target lengths', () => {
      const service = new WordCombinerService(4);
      const words = ['ab', 'cd', 'abcd'];
      const combinations = service.findCombinations(words);

      expect(combinations).toHaveLength(1);
      expect(combinations[0]).toEqual({
        parts: ['ab', 'cd'],
        target: 'abcd',
      });
    });

    it('should handle real-world example with han+nah=hannah', () => {
      const words = ['han', 'nah', 'hannah'];
      const combinations = service.findCombinations(words);

      expect(combinations).toContainEqual({
        parts: ['han', 'nah'],
        target: 'hannah',
      });
    });
  });

  describe('multi-word combinations', () => {
    it('should find three-word combinations', () => {
      const service = new WordCombinerService(6, 3);
      const words = ['a', 'b', 'c', 'ab', 'cd', 'ef', 'abcdef'];
      const combinations = service.findCombinations(words);

      expect(combinations).toContainEqual({
        parts: ['ab', 'cd', 'ef'],
        target: 'abcdef',
      });
    });

    it('should find combinations with varying word lengths', () => {
      const service = new WordCombinerService(6, 3);
      const words = ['a', 'bc', 'def', 'abcdef'];
      const combinations = service.findCombinations(words);

      expect(combinations).toContainEqual({
        parts: ['a', 'bc', 'def'],
        target: 'abcdef',
      });
    });
  });
});
