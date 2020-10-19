import fs from "fs";
import { Document, Layer } from "../../";

test("resizes a layer while preserving aspect ratio", async () => {

    // Create document
    const document: Document = new Document({
        width: 1920,
        height: 1080
    });

    // Create background
    await document.createLayer({
        name: "background",
        file: "test/assets/black.png"
    });

    // Add logo
    const logo: Layer = await document.createLayer({
        name: "logo",
        file: "test/assets/apixel.png",
        top: 300,
        left: 300
    });

    // Rotate layer
    logo.rotate(30);

    // Export document
    const exportedImage: string = (await document.exportTo("png", "buffer")).toString("base64");

    // Get expected image
    const expectedImage: string = fs.readFileSync("test/layer/exports/rotate.png").toString("base64");

    // Expect
    expect(exportedImage).toBe(expectedImage);
});