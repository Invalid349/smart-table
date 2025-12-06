import {getPages} from "../lib/utils.js";
export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.firstElementChild.remove();
    let pageCount;
    const applyPagination = (query, state, action) => {
        const limit = state.rowsPerPage;
        let page = state.page;
            if (action) {
                switch (action.name) {
                    case 'prev': 
                        page = Math.max(1, page - 1);
                        break;
                    case 'next': 
                        page = Math.min(pageCount || 1, page + 1);
                        break;
                    case 'first': 
                        page = 1;
                        break;
                    case 'last': 
                        page = pageCount || 1;
                        break;
                }
            }
        return Object.assign({}, query, {
            limit,
            page
        });
    }
    const updatePagination = (total, { page, limit }) => {
        pageCount = Math.ceil(total / limit);
        if (page > pageCount) page = pageCount || 1;
        const visiblePages = getPages(page, pageCount, 5);
        pages.replaceChildren(...visiblePages.map(pageNumber => {
            const el = pageTemplate.cloneNode(true);
            return createPage(el, pageNumber, pageNumber === page);
        }));
        fromRow.textContent = total ? (page - 1) * limit + 1 : 0;
        toRow.textContent = Math.min(page * limit, total);
        totalRows.textContent = total;
        };
    return {
        updatePagination,
        applyPagination
    }
}


