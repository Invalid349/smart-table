export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }
    const applyFiltering = (query, state, action) => {
        if (action?.name === 'clear') {
            const fieldToClear = action.dataset.field;
            const targetElement = Object.values(elements).find(el => 
                el?.name === fieldToClear
            );
            if (targetElement) {
                targetElement.value = '';
                const fieldKey = Object.keys(elements).find(key => 
                    elements[key] === targetElement
                );
                if (fieldKey) {
                    state = { ...state, [fieldKey]: '' };
                }
            }
        }
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        })
        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    }
    return {
        updateIndexes,
        applyFiltering
    }
}