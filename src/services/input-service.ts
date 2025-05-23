import { readFile } from 'node:fs/promises';

interface InputService {
  readInput(): Promise<string[]>;
}

export class FileInputService implements InputService {
  constructor(private readonly filePath: string) {}

  async readInput(): Promise<string[]> {
    const content = await readFile(this.filePath, 'utf-8');
    return content.split('\n').filter((word) => word.trim().length > 0);
  }
}
