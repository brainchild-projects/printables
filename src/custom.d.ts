declare module '**/*.svg' {
  const content: string;
  export default content;
}

type AnyElement = Element | HTMLElement;

interface HTML2CanvasOptions {
  allowTaint?: boolean;
  scale?: number;
  backgroundColor?: string;
}

interface JsPDFOptions {
  orientation?: string;
  unit?: string;
  format?: string | Array;
  putOnlyUsedFonts?: boolean;
  compress?: boolean;
  precision?: number;
  userUnit?: number;
  hotfixes?: string[];
  encyription?: {
    userPassword?: string,
    ownerPassword?: string,
    userPermissions?: string[],
  };
  floatPrecision?: number | 'smart';
}

type PageBreakMode = 'css' | 'legacy' | 'avoid-all';
interface HTML2PDFOptions {
  filename?: string;
  html2canvas?: HTML2CanvasOptions;
  jsPDF?: JsPDFOptions;
  pagebreak?: {
    mode?: PageBreakMode | PageBreakMode[];
    before?: string | string[];
    after?: string | string[];
    avoid?: string | string[];
  };
  enableLinks?: boolean;
}
type Html2PDF = (element: AnyElement, options?: HTML2PDFOptions) => Promise<unknown>;
declare module 'html2pdf.js' {
  const html2pdf: Html2PDF;
  export default html2pdf;
}
