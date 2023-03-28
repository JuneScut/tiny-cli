interface ITpl {
    tplUrl: string;
    name: string;
    desc: string;
}
export declare const updateTpl: (tplUrl: string, name: string, desc: string) => Promise<void>;
export declare const getTplList: () => ITpl[] | undefined;
export declare const loadTpl: (name: string, tplUrl: string, path: string) => void;
export {};
