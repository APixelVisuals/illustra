import Layer from "./Layer";

export default function composite(layer: Layer, data: string | Buffer): Layer {

    // Add to compositions
    layer.compositions.push({
        input: data
    });

    // Return
    return layer;
}