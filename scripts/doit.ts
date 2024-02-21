function run(cb: () => void) {
  try {
    cb();
  } catch (e) {
    if (typeof e === "object" && e && "message" in e) {
      console.log(e.message);
    } else {
      console.log(`Error running doit.ts: `, { e });
    }
  }
}

/**
 * Copy files into the dist directory.
 * @param files The files to copy.
 */
function copy(files: string[]) {
  for (const file of files) {
    try {
      console.log(`\nMoving ${file} to ./dist/${file}`);
      Deno.copyFileSync(`${file}`, `dist/${file}`);
    } catch (e) {
      console.log(`Error copying file - target: dist/${file}`);
    }
  }
}

run(() => {
  Deno.removeSync("dist", { recursive: true });
});

run(() => {
  Deno.mkdirSync("dist");
  Deno.mkdirSync("dist/bin");
});

// Copy all files to be included in the distributable

copy([
  "AUTHORS",
  "LICENSE",
  "README.md",
  "bin/cli.js",
]);

// Slim down the package.json file before putting it into the distributable

// deno-lint-ignore no-unused-vars
const { devDependencies, scripts, ...rest } = JSON.parse(
  new TextDecoder().decode(
    Deno.readFileSync("package.json"),
  ),
);

Deno.writeFileSync(
  "dist/package.json",
  new TextEncoder().encode(JSON.stringify(rest, null, 2)),
);
