export declare namespace HTTPResponse {
  type PaginatedResponse<Node> = {
    page_info: {
      has_next_page: boolean;
    };

    edges: {
      cursor: string;
      node: Node;
    }[];
  };
}
