import { SemanticICONS } from "semantic-ui-react";

export interface Category {
  id: number;
  category: string;
  icon: SemanticICONS;
}

export type CategoryState = {
  categoryList: Array<Category>;
};
