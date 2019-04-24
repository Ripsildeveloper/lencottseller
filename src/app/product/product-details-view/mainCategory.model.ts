export class MainCategory {
    _id: string;
    mainCategoryName: string;
    mainCategoryDescription: string;
    constructor(
        mainCategoryName: string,
        mainCategoryDescription: string
    ) {
        this.mainCategoryName = mainCategoryName;
        this.mainCategoryDescription = mainCategoryDescription;
    }
}
