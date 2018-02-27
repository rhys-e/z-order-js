import {StackingContext} from "./stacking-context";
import {StackingContextType} from "./stacking-context-type";

export class ZOrderCalculator {

  private readonly rootStackingContext: StackingContext;
  private readonly window: Window;
  private readonly root: HTMLDocument;

  constructor(element: HTMLDocument) {
    this.rootStackingContext = new StackingContext(StackingContextType.DEFAULT);
    this.window = element.defaultView;
    this.root = element;
  }

  public compare(element1: Element, element2: Element): Element {
    const compStyle1: CSSStyleDeclaration = this.window.getComputedStyle(element1, null);
    const compStyle2: CSSStyleDeclaration = this.window.getComputedStyle(element2, null);

    return null;
  }

  private getRootPath(element: Element): Element[] {
    const elementsOnPath: Element[] = [];
    let parent: Element = element.parentElement;
    while (parent !== null && parent !== this.root.documentElement) {
      elementsOnPath.push(parent);
      parent = parent.parentElement;
    }

    return elementsOnPath.reverse();
  }
}
