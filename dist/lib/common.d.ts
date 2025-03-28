export declare function typeOf(obj: any): string;
export declare function delay(ms: number): Promise<void>;
export declare function debounce(callback: Function, ms: number): () => Promise<any>;
export declare function throttle(callback: Function, ms: number): () => any;
export declare function cls(...args: (string | {
    [k: string]: any;
})[]): string;
