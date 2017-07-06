
import { Documenter, TYPES, inject, injectable } from "tsdoc"

//@filter("node properties")
export class TestFilter {

  constructor(public options: any) {
    
  }

  isFiltered(node: any) {
    function matches(node: any, toMatch: any) {
      
    }
    matches(node, this.options)
  }

}

@injectable()
export class TestPlugin {
 
  @inject(TYPES.Documenter)
  documenter: Documenter

}

export default TestPlugin

