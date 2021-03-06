import { Document, Polygon, PolygonData } from "../../internal";

export default function createPolygon(document: Document, polygonData: PolygonData): Polygon {

    // Debug
    document._debug(`Creating polygon '${polygonData.name}' at position ${polygonData.position || document.layers.length}`);

    // Create polygon
    const polygon: Polygon = new Polygon(polygonData, document);

    // Return created polygon
    return polygon;
}