// Import
import * as illustra from "./internal";

// All
export default illustra;

// Document
export {
    Document,
    DocumentData
} from "./internal";

// Base Layer
export type BaseLayer = InstanceType<typeof illustra.BaseLayer>;
export {
    importILA,
    AlignOptions,
    AlignType,
    AnyLayer,
    BaseLayerData,
    BlendMode,
    Blur,
    Brightness,
    Edit,
    ExportMetadata,
    ExportTypes,
    Format,
    Hue,
    Invert,
    LayerType,
    LAYER_TYPE_CLIPPING_MASK,
    LAYER_TYPE_ELLIPSE,
    LAYER_TYPE_LAYER,
    LAYER_TYPE_POLYGON,
    LAYER_TYPE_TEXT,
    PathOrWithMetadataOptions,
    Reflect,
    ReflectDirection,
    Resize,
    Rotate,
    Saturation,
    Units
} from "./internal";

// Layer
export type Layer = InstanceType<typeof illustra.Layer>;
export {
    createLayer,
    LayerData
} from "./internal";

// Shape Layer
export type ShapeLayer = InstanceType<typeof illustra.ShapeLayer>;
export {
    ShapeData,
    ShapeLayerData,
    ShapeLayerType
} from "./internal";

// Polygon
export type Polygon = InstanceType<typeof illustra.Polygon>;
export {
    createPolygon,
    PolygonShapeData,
    PolygonData
} from "./internal";

// Ellipse
export type Ellipse = InstanceType<typeof illustra.Ellipse>;
export {
    createEllipse,
    EllipseShapeData,
    EllipseData
} from "./internal";

// Text Layer
export type TextLayer = InstanceType<typeof illustra.TextLayer>;
export {
    createTextLayer,
    TextData,
    TextLayerData
} from "./internal";

// Clipping Mask
export type ClippingMask = InstanceType<typeof illustra.ClippingMask>;
export {
    ClippingMaskData,
    createClippingMask
} from "./internal";

// Color
export {
    Color,
    RGBA
} from "./internal";