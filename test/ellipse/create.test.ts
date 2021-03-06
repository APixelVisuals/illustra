import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG as pngjs, PNGWithMetadata } from "pngjs";
import { createEllipse, Document, Ellipse } from "../../src/internal";

describe("creating ellipses", () => {

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

    it("creates an ellipse", async () => {

        // Create ellipse
        document.createEllipse({
            name: "ellipse",
            shape: {
                width: 300,
                height: 500,
                fill: "#ffffff"
            },
            left: 250,
            top: 200
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/ellipse/exports/create/ellipse.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });

    it("creates an ellipse with a stroke", async () => {

        // Create ellipse
        document.createEllipse({
            name: "ellipse",
            shape: {
                width: 300,
                height: 500,
                fill: "#ffffff",
                stroke: "#ff0000",
                strokeWidth: 15
            },
            left: 250,
            top: 200
        });

        // Export document
        const exportedImage: PNGWithMetadata = pngjs.sync.read(await document.exportTo("png", "buffer"));

        // Get expected image
        const expectedImage: PNGWithMetadata = pngjs.sync.read(fs.readFileSync("test/ellipse/exports/create/stroke.png"));

        // Expect
        expect(pixelmatch(exportedImage.data, expectedImage.data, null, 1920, 1080)).toBeLessThanOrEqual(50);
    });

    it("creates an ellipse without a document", () => {

        // Create ellipse
        const ellipse: Ellipse = createEllipse({
            name: "ellipse",
            shape: {
                width: 300,
                height: 500,
                fill: "#ffffff"
            }
        });

        // Expect
        expect(ellipse).toBeDefined();
    });
});