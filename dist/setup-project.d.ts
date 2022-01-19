export declare type ProjectInfo = {
    library: {
        name: string;
        description: string;
        keywords: string[];
    };
    author: {
        name: string;
        email: string;
    };
    github: {
        repository: string;
    };
};
export declare function setupProject(info: ProjectInfo): Promise<void>;
