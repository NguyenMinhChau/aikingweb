export const indexTable = (page:number, show:number, index:number) => {
    const indexPage =
        (page - 1) * show + index + 1 < 10
            ? `0${(page - 1) * show + index + 1}`
            : (page - 1) * show + index + 1;
    return indexPage;
};
