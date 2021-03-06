import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { AnyLayer, Document, Layer } from "../../src/internal";

describe("merging layers in a document", () => {

    let document: Document;

    beforeEach(async () => {

        // Create document
        document = new Document({
            width: 1920,
            height: 1080
        });

        // Create background
        await document.createLayer({
            name: "background",
            image: "test/assets/black.png"
        });
    });

    it("checks for errors", async () => {

        // Create other document
        const otherDocument: Document = new Document({
            width: 1920,
            height: 1080
        });

        // Create other layer
        const otherLayer: Layer = await otherDocument.createLayer({
            name: "layer",
            image: "test/assets/apixel.png"
        });

        // Merge errors
        expect(async () => await document.mergeLayers("merged", ["invalid"])).rejects.toThrow("Unknown layer with name 'invalid'");
        expect(async () => await document.mergeLayers("merged", [1])).rejects.toThrow("Unknown layer with index 1");
        expect(async () => await document.mergeLayers("merged", [otherLayer])).rejects.toThrow("Layer at index 0 isn't part of this document");
    });

    it("merges layers", async () => {

        // Add apixel logo
        const apixelLogo: Layer = await document.createLayer({
            name: "apixelLogo",
            image: "test/assets/apixel.png"
        });

        // Add typescript logo
        const typescriptLogo: Layer = await document.createLayer({
            name: "typescriptLogo",
            image: "test/assets/typescript.png"
        });

        // Add javascript logo
        await document.createLayer({
            name: "javascriptLogo",
            image: "test/assets/javascript.png"
        });

        // Merge layers as a copy
        await document.mergeLayers("mergedCopy", [apixelLogo, typescriptLogo], true);

        // Expect layer order
        let layers: string[] = document.layers.map((l: AnyLayer) => l.name);
        expect(layers).toStrictEqual(["background", "apixelLogo", "typescriptLogo", "mergedCopy", "javascriptLogo"]);

        // Merge layers
        const mergedLayer: Layer = await document.mergeLayers("merged", [apixelLogo, typescriptLogo]);

        // Expect layer order
        layers = document.layers.map((l: AnyLayer) => l.name);
        expect(layers).toStrictEqual(["background", "merged", "mergedCopy", "javascriptLogo"]);

        // Export layer
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await mergedLayer.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/document/exports/mergeLayers/mergeLayers.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });

    it("merges layers that start going off the screen (bottom right)", async () => {

        // Add logo
        await document.createLayer({
            name: "logo",
            image: "test/assets/apixel.png",
            left: 1700,
            top: 700
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/document/exports/mergeLayers/cropBottomRight.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });

    it("merges layers that start going off the screen (top left)", async () => {

        // Add logo
        await document.createLayer({
            name: "logo",
            image: "test/assets/apixel.png",
            left: -200,
            top: -300
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/document/exports/mergeLayers/cropTopLeft.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });

    it("merges layers that go off the screen (bottom right)", async () => {

        // Add logo
        await document.createLayer({
            name: "logo",
            image: "test/assets/apixel.png",
            left: 2000,
            top: 1100
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/document/exports/mergeLayers/removeBottomRight.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });

    it("merges layers that go off the screen (top left)", async () => {

        // Add logo
        await document.createLayer({
            name: "logo",
            image: "test/assets/apixel.png",
            left: -800,
            top: -800
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/document/exports/mergeLayers/removeTopLeft.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });
});