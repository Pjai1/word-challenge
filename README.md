# 6 letter words

There's a file in the root of the repository, input.txt, that contains words of varying lengths (1 to 6 characters).

Your objective is to show all combinations of those words that together form a word of 6 characters. That combination must also be present in input.txt
E.g.:  
<code>
foobar  
fo  
obar  
</code>

should result in the ouput:  
<code>
fo+obar=foobar
</code>

You can start by only supporting combinations of two words and improve the algorithm at the end of the exercise to support any combinations.

Treat this exercise as if you were writing production code; think unit tests, SOLID, clean code and avoid primitive obsession. Be mindful of changing requirements like a different maximum combination length, or a different source of the input data.

The solution must be stored in a git repo. After the repo is cloned, the application should be able to run with one command / script.

Don't spend too much time on this.

## Development

### Tools Used

- TypeScript for type safety
- Vitest for testing
- Prettier for code formatting
- pnpm as package manager

### Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Development commands:

```bash
# Run the application
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Check code formatting
pnpm format:check

# Format code
pnpm format

# Run linter
pnpm lint

# Fix linting issues automatically
pnpm lint:fix
```

### Possible improvements

- Add a command line interface to specify params like input, output, word length, ...
- Provide possible batching/promise pooling to concurrently find combinations
- Add Docker where each service can be run in a container and distributed with queueing system
