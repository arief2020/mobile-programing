
function greet(name: string): string {
  return `Halo, ${name}!`;
}

function main(): void {
  const name: string = "Arief";
  const message: string = greet(name);

  console.log(message);
}

main();
