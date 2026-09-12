export interface CoffeeSceneRefs {
  hero: SVGGElement | null;
  package: SVGGElement | null;
  beans: SVGGElement | null;
  espresso: SVGGElement | null;
}

export interface CoffeeVisualHandle {
  readonly root: HTMLDivElement | null;
  readonly hero: SVGGElement | null;
  readonly package: SVGGElement | null;
  readonly beans: SVGGElement | null;
  readonly espresso: SVGGElement | null;
}