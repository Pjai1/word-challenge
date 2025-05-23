import { describe, it, expect } from 'vitest';
import { OutputService } from './output-service';
import type { WordCombination } from '../types/word-combination';

describe('OutputService', () => {
  const service = new OutputService();

  it('should format single combination correctly', () => {
    const combinations: WordCombination[] = [{ parts: ['fo', 'obar'], target: 'foobar' }];

    const result = service.format(combinations);
    expect(result).toBe('fo+obar=foobar');
  });

  it('should format multiple combinations correctly', () => {
    const combinations: WordCombination[] = [
      { parts: ['fo', 'obar'], target: 'foobar' },
      { parts: ['test', 'ing'], target: 'testing' },
    ];

    const result = service.format(combinations);
    expect(result).toBe('fo+obar=foobar\ntest+ing=testing');
  });

  it('should handle combinations with more than two parts', () => {
    const combinations: WordCombination[] = [{ parts: ['a', 'b', 'cdef'], target: 'abcdef' }];

    const result = service.format(combinations);
    expect(result).toBe('a+b+cdef=abcdef');
  });

  it('should return appropriate message for empty combinations', () => {
    const combinations: WordCombination[] = [];

    const result = service.format(combinations);
    expect(result).toBe('No combinations found.');
  });

  it('should format summary correctly', () => {
    const combinations: WordCombination[] = [
      { parts: ['fo', 'obar'], target: 'foobar' },
      { parts: ['test', 'ing'], target: 'testing' },
    ];

    const result = service.formatSummary(combinations);
    expect(result).toBe('Found 2 word combination(s) that form 6-character words.');
  });

  it('should format summary for single combination', () => {
    const combinations: WordCombination[] = [{ parts: ['fo', 'obar'], target: 'foobar' }];

    const result = service.formatSummary(combinations);
    expect(result).toBe('Found 1 word combination(s) that form 6-character words.');
  });
});
