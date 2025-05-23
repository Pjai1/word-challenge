import { FileInputService } from './services/input-service';
import { WordCombinerService } from './services/word-combiner-service';
import { OutputService } from './services/output-service';

async function main() {
  const inputService = new FileInputService('input.txt');
  const words = await inputService.readInput();

  console.log(`Read ${words.length} words from input file`);

  const startTime = Date.now();
  const wordCombiner = new WordCombinerService();
  const combinations = wordCombiner.findCombinations(words);
  const totalTime = Date.now() - startTime;

  const outputFilePath = 'combinations.txt';
  const outputService = new OutputService(outputFilePath);
  console.log(`${outputService.formatSummary(combinations)} (found in ${totalTime}ms)`);

  console.log(`Writing ${combinations.length} combinations to file ${outputFilePath}`);
  return outputService.writeToFile(combinations);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
