import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {

    const searchComparator = createComparison(
        [], // Пустой массив правил для обработки целевого значения в компараторе по умолчанию
        rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false) // Правило для поиска
    );

    return (data, state, action) => {

        const searchValue = state[searchField];

        if (!searchValue) {

            return data;
        }
        return data.filter(item => searchComparator(item, searchValue));
    }
}