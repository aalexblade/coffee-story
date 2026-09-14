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

  flatWhite: SVGGElement | null;
  flatWhiteCup: SVGGElement | null;
  flatWhiteLiquid: SVGRectElement | null;
  flatWhiteMilk: SVGRectElement | null;
  flatWhiteCrema: SVGGElement | null;
  flatWhiteStream: SVGPathElement | null;

  cappuccino: SVGGElement | null;
  cappuccinoCup: SVGGElement | null;
  cappuccinoCoffee: SVGRectElement | null;
  cappuccinoMilk: SVGRectElement | null;
  cappuccinoFoam: SVGGElement | null;
  cappuccinoStream: SVGPathElement | null;
}

export interface CoffeeVisualHandle extends CoffeeSceneRefs {
  readonly root: SVGSVGElement | null;
}
