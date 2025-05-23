import { readFile } from 'node:fs/promises';

interface InputService {
  readInput(): Promise<string[]>;
}

export class FileInputService implements InputService {
  constructor(private readonly filePath: string) {}

  async readInput(): Promise<string[]> {
    const content = await readFile(this.filePath, 'utf-8');
    return content
      .split('\n')
      .map((word) => word.trim().replace(/\r$/, '')) // Remove carriage returns and trim
      .filter((word) => word.length > 0);
  }
}
