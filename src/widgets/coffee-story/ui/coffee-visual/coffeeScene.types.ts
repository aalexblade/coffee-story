export interface CoffeeSceneRefs {
  hero: SVGGElement | null;
  package: SVGGElement | null;
  beans: SVGGElement | null;

  espresso: SVGGElement | null;
  espressoCup: SVGGElement | null;
  espressoLiquid: SVGGElement | null;
  espressoCrema: SVGGElement | null;
  espressoStream: SVGPathElement | null;
}

export interface CoffeeVisualHandle {
  readonly root: HTMLDivElement | null;

  readonly hero: SVGGElement | null;
  readonly package: SVGGElement | null;
  readonly beans: SVGGElement | null;

  readonly espresso: SVGGElement | null;
  readonly espressoCup: SVGGElement | null;
  readonly espressoLiquid: SVGGElement | null;
  readonly espressoCrema: SVGGElement | null;
  readonly espressoStream: SVGPathElement | null;
}