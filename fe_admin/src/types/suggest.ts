export interface ISuggestion {
  id: string;
  title: string;
  content: string;
  createdDate: string;
}

export interface ISuggestionList {
  suggestions: ISuggestion[];
  totalPages?: number;
}
