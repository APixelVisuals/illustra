import { parseColor, Color } from "../../color";
import { BaseLayer, BaseLayerData, Document, LAYER_TYPE_TEXT } from "../../internal";
import setColor from "./setColor";
import setFont from "./setFont";
import setFontSize from "./setFontSize";
import setFontWeight from "./setFontWeight";
import setMaxWidth from "./setMaxWidth";
import setText from "./setText";
import textBuffer from "./textBuffer";

export const DEFAULT_FONT_SIZE = 24;

export interface TextData {
    text: string;
    font?: string;
    fontSize?: number;
    fontWeight?: string;
    color?: Color;
    maxWidth?: number;
}

export interface TextLayerData extends BaseLayerData {
    text: TextData;
}

export default class TextLayer extends BaseLayer {

    /**
     * Type
     *
     * This layer's type
     */
    type: typeof LAYER_TYPE_TEXT;

    /**
     * Text
     *
     * The text
     */
    text: string;

    /**
     * Font
     *
     * The font to use
     */
    font?: string;

    /**
     * Font Size
     *
     * The font size to use
     */
    fontSize: number;

    /**
     * Font Weight
     *
     * The font weight to use
     */
    fontWeight?: string;

    /**
     * Color
     *
     * The color of the text
     */
    color: string;

    /**
     * Max Width
     *
     * The max width of the text
     */
    maxWidth: number;

    /**
     * Text Layer
     *
     * @param document The document this layer is a part of
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
     */
    constructor(textLayerData: TextLayerData, document?: Document) {

        // Super
        super(textLayerData, document);

        // Set data
        this.type = LAYER_TYPE_TEXT;
        this.text = textLayerData.text.text;
        this.font = textLayerData.text.font;
        this.fontSize = textLayerData.text.fontSize || DEFAULT_FONT_SIZE;
        this.fontWeight = textLayerData.text.fontWeight;
        this.color = parseColor(textLayerData.text.color || "#000000");
        this.maxWidth = textLayerData.text.maxWidth || document?.width || 400;
    }

    /**
     * Set Text
     *
     * Set the text of this text layer
     *
     * @param text The text
     *
     * @returns {TextLayer} This text layer
     */
    setText(text: string): TextLayer {
        return setText(this, text);
    }

    /**
     * Set Font
     *
     * Set the font of this text layer
     *
     * @param font The font to use
     *
     * @returns {TextLayer} This text layer
     */
    setFont(font?: string): TextLayer {
        return setFont(this, font);
    }

    /**
     * Set Font Size
     *
     * Set the font size of this text layer
     *
     * @param fontSize The font size to use
     *
     * @returns {TextLayer} This text layer
     */
    setFontSize(fontSize?: number): TextLayer {
        return setFontSize(this, fontSize);
    }

    /**
     * Set Font Weight
     *
     * Set the font weight of this text layer
     *
     * @param fontWeight The font weight to use
     *
     * @returns {TextLayer} This text layer
     */
    setFontWeight(fontWeight?: string): TextLayer {
        return setFontWeight(this, fontWeight);
    }

    /**
     * Set Color
     *
     * Set the color of this text layer
     *
     * @param color The color of the text
     *
     * @returns {TextLayer} This text layer
     */
    setColor(color?: Color): TextLayer {
        return setColor(this, color);
    }

    /**
     * Set Max Width
     *
     * Set the max width of this text layer
     *
     * @param maxWidth The max width of the text
     *
     * @returns {TextLayer} This text layer
     */
    setMaxWidth(maxWidth?: number): TextLayer {
        return setMaxWidth(this, maxWidth);
    }

    /**
     * Text Buffer
     *
     * Creates an image buffer from `TextData`
     *
     * @param textData The data for the text
     * @param textData.text The text
     * @param textData.font The font to use
     * @param textData.fontSize The font size to use
     * @param textData.fontWeight The font weight to use
     * @param textData.color The color of the text
     * @param textData.maxWidth The max width of the text
     *
     * @returns {Buffer} The image buffer
     */
    static textBuffer(textData: TextData): Promise<Buffer> {
        return textBuffer(textData);
    }

    /**
     * To Buffer
     *
     * Creates an image buffer from this text layer
     *
     * @returns {Buffer} The image buffer
     */
    toBuffer(): Promise<Buffer> {
        return TextLayer.textBuffer(this);
    }
}