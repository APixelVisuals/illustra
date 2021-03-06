import { AnyLayer } from "../../internal";

export default function remove(layer: AnyLayer) {

    // Debug
    layer._debug("Removing");

    // No document
    if (!layer.document) throw new Error("This layer isn't a part of a document");

    // Remove layer
    layer.document.layers.splice(layer.position, 1);
    delete layer.document;
}