import {StackingContextType} from "./stacking-context-type";

export class StackingContext {

  private readonly stackingContextType: StackingContextType;

  constructor(type: StackingContextType) {
    this.stackingContextType = type;
  }
}
