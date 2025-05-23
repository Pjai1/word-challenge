import { FileInputService } from './services/input-service';

async function main() {
  const inputService = new FileInputService('input.txt');
  const words = await inputService.readInput();

  console.log(`Read ${words.length} words from input file`);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
