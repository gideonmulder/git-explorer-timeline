export interface GitFile{
    path: string;
    hash: string | null;
    relatedCommit: string | null;
}