import {StackingContext} from "./stacking-context";
import {StackingContextType} from "./stacking-context-type";

export class ZOrderCalculator {

  private readonly rootStackingContext: StackingContext;
  private readonly window: Window;
  private readonly root: HTMLDocument;

  constructor(element: HTMLDocument) {
    this.rootStackingContext = new StackingContext(StackingContextType.DEFAULT, element.documentElement);
    this.window = element.defaultView;
    this.root = element;
  }

  public compare(element1: Element, element2: Element): Element {
    let stackingContext: StackingContext = this.rootStackingContext;
    this.getRootPath(element1).forEach((element: Element) => {
      stackingContext = this.getStackingContext(this.rootStackingContext, element);
    });

    return null;
  }

  private getStackingContext(parentStackingContext: StackingContext, element: Element): StackingContext {
    const computedStyle: CSSStyleDeclaration = this.window.getComputedStyle(element);
    if ((computedStyle.position === "relative" || computedStyle.position === "absolute")
      && computedStyle.zIndex !== "auto") {
      return new StackingContext(StackingContextType.POSITIONED_ABS_OR_REL_WITH_ZINDEX, element);
    }

    if (computedStyle.position === "sticky" || computedStyle.position === "fixed") {
      return new StackingContext((StackingContextType.POSITIONED_STICKY_OR_FIXED), element);
    }

    const parentComputedStyle: CSSStyleDeclaration = this.window.getComputedStyle(element.parentElement, null);
    if (parentComputedStyle.display === "flex" || parentComputedStyle.display === "inline-flex") {
      return new StackingContext(StackingContextType.CHILD_OF_FLEXBOX_WITH_ZINDEX, element);
    }

    if (parseInt(computedStyle.opacity, 10) < 1.0) {
      return new StackingContext(StackingContextType.OPACITY_LESS_THAN_ONE, element);
    }

    if ((computedStyle as any)["mix-blend-mode"] !== "normal") {
      return new StackingContext(StackingContextType.MIX_BLEND_MODE_OTHER_THAN_NORMAL, element);
    }

    return parentStackingContext;
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
