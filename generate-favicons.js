const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");
const ico = require("sharp-ico");

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

async function generateFavicons() {
  try {
    // Read the SVG file
    const svgBuffer = await fs.readFile("./images/favicon.svg");

    // Create images directory if it doesn't exist
    await fs.mkdir("./images", { recursive: true });

    // Generate PNG files
    const pngBuffers = {};
    for (const { name, size } of sizes) {
      const buffer = await sharp(svgBuffer).resize(size, size).png().toBuffer();

      await fs.writeFile(`./images/${name}`, buffer);
      pngBuffers[size] = buffer;
      console.log(`Generated ${name}`);
    }

    // Generate ICO file with multiple sizes
    const icoBuffer = await ico.encode([pngBuffers[16], pngBuffers[32]]);
    await fs.writeFile("./images/favicon.ico", icoBuffer);
    console.log("Generated favicon.ico");

    console.log("All favicons generated successfully!");
  } catch (error) {
    console.error("Error generating favicons:", error);
  }
}

generateFavicons();
