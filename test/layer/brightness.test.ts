import fs from "fs";
import { Document, Layer } from "../../";

let document: Document;
let logo: Layer;

beforeEach(async () => {

    // Create document
    document = new Document({
        width: 1920,
        height: 1080
    });

    // Create background
    await document.createLayer({
        name: "background",
        file: "test/assets/black.png"
    });

    // Add logo
    logo = await document.createLayer({
        name: "logo",
        file: "test/assets/javascript.png",
        top: 300,
        left: 300
    });
});

test("increases the brightness of a layer", async () => {

    // Adjust layer brightness
    logo.brightness(150);

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/brightness/increase.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("decreases the brightness of a layer", async () => {

    // Adjust layer brightness
    logo.brightness(50);

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/brightness/decrease.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});

test("adjusts the brightness of a layer without causing any changes", async () => {

    // Adjust layer brightness
    logo.brightness(100);

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/brightness/noChange.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});