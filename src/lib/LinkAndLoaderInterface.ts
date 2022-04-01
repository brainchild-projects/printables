export interface LinkAndLoader {
  text: string;
  loader: React.ElementType;
}

export type SectionLinks = Map<string, LinkAndLoader>;
