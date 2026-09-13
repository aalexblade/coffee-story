export interface CoffeeSceneRefs {
  hero: SVGGElement | null;
  package: SVGGElement | null;
  beans: SVGGElement | null;

  espresso: SVGGElement | null;
  espressoCup: SVGGElement | null;
  espressoLiquid: SVGRectElement | null;
  espressoCrema: SVGGElement | null;
  espressoStream: SVGPathElement | null;

  cortado: SVGGElement | null;
  cortadoGlass: SVGGElement | null;
  cortadoLiquid: SVGRectElement | null;
  cortadoMilk: SVGRectElement | null;
  cortadoStream: SVGPathElement | null;
}

export interface CoffeeVisualHandle extends CoffeeSceneRefs {
  readonly root: SVGSVGElement | null;
}