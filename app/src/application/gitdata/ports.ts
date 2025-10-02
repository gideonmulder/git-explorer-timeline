export interface IGitDataStorageService{
    folder:string | undefined;
    setFolder: (folderSetter: (currentFolder: string | undefined) => string | undefined) => void;
}