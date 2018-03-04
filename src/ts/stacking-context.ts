import {StackingContextType} from "./stacking-context-type";

export class StackingContext {

  private readonly stackingContextType: StackingContextType;
  private readonly elements: Element[]  = [];

  constructor(type: StackingContextType, rootElement: Element) {
    this.stackingContextType = type;
    this.elements.push(rootElement);
  }
}
