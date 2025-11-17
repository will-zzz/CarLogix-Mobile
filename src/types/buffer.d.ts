// Type declaration for Buffer used by tesseract.js in browser context
declare global {
  interface Buffer extends Uint8Array {
    toString(encoding?: string): string;
    from(data: any, encoding?: string): Buffer;
  }
  
  var Buffer: {
    from(data: any, encoding?: string): Buffer;
    isBuffer(obj: any): boolean;
  };
}

export {};

