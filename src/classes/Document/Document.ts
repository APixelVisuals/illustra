import debug from "../../debug";
import { AlignType, AnyLayer, ClippingMask, ClippingMaskData, Ellipse, EllipseData, Layer, LayerData, Polygon, PolygonData, TextLayer, TextLayerData } from "../../internal";
import { ExportTypes, Format, Output, PathOrWithMetadataOptions } from "../BaseLayer/exportTo";
import addLayer from "./addLayer";
import createClippingMask from "./createClippingMask";
import createEllipse from "./createEllipse";
import createLayer from "./createLayer";
import createPolygon from "./createPolygon";
import createTextLayer from "./createTextLayer";
import exportTo from "./exportTo";
import exportILD from "./ild/exportILD";
import importILD from "./ild/importILD";
import mergeLayers from "./mergeLayers";
import resize from "./resize";

export interface DocumentData {
    name?: string;
    width: number;
    height: number;
    debugMode?: boolean;
}

export default class Document {

    /**
     * Name
     *
     * The name of this document
     */
    name: string;

    /**
     * Width
     *
     * The width of this document
     */
    width: number;

    /**
     * Height
     *
     * The height of this document
     */
    height: number;

    /**
     * Layers
     *
     * This document's layers
     * The lower the layer's index, the lower the layer is in the stack
     */
    layers: AnyLayer[];

    /**
     * Debug Mode
     *
     * Whether or not this document is in debug mode
     */
    debugMode: boolean;

    /**
     * Document
     *
     * @param documentData Options to initialize this document with
     * @param documentData.name The name of the document
     * @param documentData.width The width of the document in pixels
     * @param documentData.height The height of the document in pixels
     * @param documentData.debugMode Set to `true` to log debug info to the console
     */
    constructor(documentData: DocumentData) {

        // Set data
        this.name = documentData.name || "Unnamed Document";
        this.width = documentData.width;
        this.height = documentData.height;

        // Create empty array of layers
        this.layers = [];

        // Set debug mode
        this.setDebugMode(documentData.debugMode || false);
    }

    /**
     * Set Name
     *
     * Set the document's name
     *
     * @param name The name
     */
    setName(name: string) {
        this.name = name;
    }

    /**
     * Resize
     *
     * Resize the document
     *
     * @param width The width
     * @param height The height
     * @param anchorPointLeft The alignment of the anchor point from the left to resize the document from
     * Defaults to 'center'
     * @param anchorPointTop The alignment of the anchor point from the top to resize the document from
     * Defaults to 'center'
     */
    resize(width?: number, height?: number, anchorPointLeft?: AlignType, anchorPointTop?: AlignType) {
        resize(this, width, height, anchorPointLeft, anchorPointTop);
    }

    /**
     * Create Layer
     *
     * Create a new layer
     *
     * @param layerData Data for the layer
     * @param layerData.name The name of the layer
     * @param layerData.file An image file to use for this layer
     * @param layerData.buffer An image buffer to use for this layer
     * @param layerData.svg An SVG string to use for this layer
     * @param layerData.left The horizontal offset from the left to place this layer
     * @param layerData.top The vertical offset from the top to place this layer
     * @param layerData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param layerData.debugMode Set to `true` to log debug info to the console
     *
     * @returns {Layer} The created layer
     */
    createLayer(layerData: LayerData): Promise<Layer> {
        return createLayer(this, layerData);
    }

    /**
     * Create Polygon
     *
     * Create a new polygon
     *
     * @param polygonData Data for the layer
     * @param polygonData.name The name of the layer
     * @param polygonData.shape The data for the shape
     * @param polygonData.shape.width The width of this shape
     * @param polygonData.shape.height The height of this shape
     * @param polygonData.shape.sides The number of sides this polygon has
     * @param polygonData.shape.fill The color of this shape's fill
     * @param polygonData.shape.stroke The color of this shape's stroke
     * @param polygonData.shape.strokeWidth The width of this shape's stroke in pixels
     * @param polygonData.left The horizontal offset from the left to place this layer
     * @param polygonData.top The vertical offset from the top to place this layer
     * @param polygonData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param polygonData.debugMode Set to `true` to log debug info to the console
     *
     * @returns {Polygon} The created polygon
     */
    createPolygon(polygonData: PolygonData): Polygon {
        return createPolygon(this, polygonData);
    }

    /**
     * Create Ellipse
     *
     * Create a new ellipse
     *
     * @param ellipseData Data for the layer
     * @param ellipseData.name The name of the layer
     * @param ellipseData.shape The data for the shape
     * @param ellipseData.shape.width The width of this shape
     * @param ellipseData.shape.height The height of this shape
     * @param ellipseData.shape.fill The color of this shape's fill
     * @param ellipseData.shape.stroke The color of this shape's stroke
     * @param ellipseData.shape.strokeWidth The width of this shape's stroke in pixels
     * @param ellipseData.left The horizontal offset from the left to place this layer
     * @param ellipseData.top The vertical offset from the top to place this layer
     * @param ellipseData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param ellipseData.debugMode Set to `true` to log debug info to the console
     *
     * @returns {Ellipse} The created ellipse
     */
    createEllipse(ellipseData: EllipseData): Ellipse {
        return createEllipse(this, ellipseData);
    }

    /**
     * Create Text Layer
     *
     * Create a new text layer
     *
     * @param textLayerData Data for the layer
     * @param textLayerData.name The name of the layer
     * @param textLayerData.text The data for the text
     * @param textLayerData.text.text The text
     * @param textLayerData.text.font The font to use
     * @param textLayerData.text.fontSize The font size to use
     * @param textLayerData.text.fontWeight The font weight to use
     * @param textLayerData.text.color The color of the text
     * @param textLayerData.text.maxWidth The max width of the text
     * @param textLayerData.left The horizontal offset from the left to place this layer
     * @param textLayerData.top The vertical offset from the top to place this layer
     * @param textLayerData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param textLayerData.debugMode Set to `true` to log debug info to the console
     *
     * @returns {TextLayer} The created text layer
     */
    createTextLayer(textLayerData: TextLayerData): TextLayer {
        return createTextLayer(this, textLayerData);
    }

    /**
     * Create Clipping Mask
     *
     * Create a new clipping mask
     *
     * @param clippingMaskData Data for the layer
     * @param clippingMaskData.name The name of the layer
     * @param clippingMaskData.mask The layer that the source will clip to
     * @param clippingMaskData.source The layer that will get clipped to the mask
     * @param clippingMaskData.position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     * @param clippingMaskData.debugMode Set to `true` to log debug info to the console
     *
     * @returns {ClippingMask} The created text layer
     */
    createClippingMask(clippingMaskData: ClippingMaskData): ClippingMask {
        return createClippingMask(this, clippingMaskData);
    }

    /**
     * Add Layer
     *
     * Add a layer to this document
     *
     * @param layer The layer that should be added to this document
     * @param position The position index of the layer. The lower the index, the lower the layer is in the stack.
     * Omit to add the layer to the top of the stack (highest index).
     * Pass a negative number to position starting from the top of the stack, ie. `-2` would be make it the 3rd layer from the top
     */
    addLayer(layer: AnyLayer, position?: number) {
        addLayer(this, layer, position);
    }

    /**
     * Get Layer
     *
     * Get a layer by name or index
     *
     * @param nameOrIndex The name or index of the layer you'd like to get
     *
     * @returns {AnyLayer | undefined} The layer if found or `undefined`
     */
    getLayer(nameOrIndex: string | number): AnyLayer | undefined {

        // Get by index
        if (typeof nameOrIndex === "string") return this.layers.find((l: AnyLayer) => l.name === nameOrIndex);

        // Get by index
        else if (typeof nameOrIndex === "number") return this.layers[nameOrIndex];
    }

    /**
     * Merge Layers
     *
     * Merge some or all layers
     * The new layer will be placed above the highest layer being merged
     *
     * @param name The name of the new layer
     * @param layers An array of the layers to merge
     * The array can contain a mix of `Layer` objects, layer names, or layer indexes
     * Omit to merge all layers
     * @param copy Set to `true` to keep the merged layers
     * Omit or set to `false` to delete the merged layers
     *
     * @returns {Layer} The new layer
     */
    mergeLayers(name: string, layers?: Array<AnyLayer | string | number>, copy?: boolean): Promise<Layer> {
        return mergeLayers(this, name, layers, copy);
    }

    /**
     * Export To
     *
     * Export this document
     *
     * @param format The format to export in - 'png' or 'jpeg'
     * @param exportType How this document should be exported - Either 'file' or 'buffer'
     * @param pathOrWithMetadata The path to write the file to if the `exportType` is 'file' or whether or not to return metadata if the `exportType` is 'buffer'
     *
     * @throws {Error} Path must be specified if exportType is 'file'
     *
     * @returns {undefined | Buffer | ExportMetadata} `undefined` if the `exportType` is 'file', `Buffer` if the `exportType` is 'buffer' and `pathOrWithMetadata` is false, or `ExportMetadata` if the `exportType` is 'buffer' and `pathOrWithMetadata` is true
     */
    exportTo<ExportType extends ExportTypes, PathOrWithMetadata extends PathOrWithMetadataOptions = false>(format: Format, exportType: ExportType, pathOrWithMetadata?: PathOrWithMetadata): Promise<Output<ExportType, PathOrWithMetadata>> {
        return exportTo(this, format, exportType, pathOrWithMetadata);
    }

    /**
     * Export ILD
     *
     * Export this document as an ILD (Illustra Document) file
     *
     * @param exportType How this document should be exported - Either 'file' or 'buffer'
     * @param path The path to write the file to if the `exportType` is 'file'
     *
     * @throws {Error} Path must be specified if exportType is 'file'
     *
     * @returns {undefined | Buffer} `undefined` if the `exportType` is 'file' or `Buffer` if the `exportType` is 'buffer'
     */
    exportILD<ExportType extends ExportTypes, Path extends string>(exportType: ExportType, path?: Path): Promise<Output<ExportType, Path>> {
        return exportILD(this, exportType, path);
    }

    /**
     * Import ILD
     *
     * Import a document from an ILD (Illustra Document) file
     *
     * @param pathOrBuffer The path or buffer to read the file from
     * @param assetsDirectory The path to a directory to store imported assets in
     * Omit to store them as an image buffer in memory
     *
     * @returns {Document} The document
     */
    static importILD(pathOrBuffer: string | Buffer, assetsDirectory?: string): Promise<Document> {
        return importILD(pathOrBuffer, assetsDirectory);
    }

    /**
     * Set Debug Mode
     *
     * @param debugMode Set to `true` to log debug info to the console
     */
    setDebugMode(debugMode: boolean) {
        this.debugMode = debugMode;
    }

    /**
     * Debug
     *
     * Log debug info
     *
     * @private
     * @param info Debug info to log
     */
    _debug(info: string) {
        debug(info, this);
    }
}