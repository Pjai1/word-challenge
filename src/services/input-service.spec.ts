import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FileInputService } from './input-service';

describe('FileInputService', () => {
  const filePath = 'input.txt';

  beforeEach(() => {
    vi.mock('fs/promises', () => ({
      readFile: vi.fn().mockResolvedValue('word1\nword2\nword3'),
    }));
  });

  const service = new FileInputService(filePath);

  describe('readInput', () => {
    it('should read words from the input file', async () => {
      const words = await service.readInput();
      expect(Array.isArray(words)).toBe(true);
      expect(words.length).toBeGreaterThan(0);
      expect(words.every((word) => typeof word === 'string')).toBe(true);
    });
  });
});
