import { FileInputService } from './services/input-service';
import { WordCombinerService } from './services/word-combiner-service';
import { OutputService } from './services/output-service';
import { writeFileSync } from 'node:fs';

async function main() {
  const inputService = new FileInputService('input.txt');
  const words = await inputService.readInput();

  console.log(`Read ${words.length} words from input file`);

  const startTime = Date.now();
  const wordCombiner = new WordCombinerService();
  const combinations = wordCombiner.findCombinations(words, 6);
  const totalTime = Date.now() - startTime;

  const formatter = new OutputService();
  console.log(`${formatter.formatSummary(combinations)} (found in ${totalTime}ms)`);

  writeFileSync('combinations.txt', formatter.format(combinations));
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
