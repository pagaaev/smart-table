import {sortMap} from "../lib/sort.js"; // sortCollection больше не нужен

export function initSorting(columns) {
    return (query, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            // #3.1 — переключаем состояние кнопки по sortMap
            action.dataset.value = sortMap[action.dataset.value];
            field = action.dataset.field;
            order = action.dataset.value;

            // #3.2 — сбросить сортировку остальных колонок
            columns.forEach(column => {
                if (column.dataset.field !== action.dataset.field) {
                    column.dataset.value = 'none';
                }
            });
        }

        // #3.3 — получить текущее активное поле и порядок сортировки
        columns.forEach(column => {
            if (column.dataset.value !== 'none') {
                field = column.dataset.field;
                order = column.dataset.value;
            }
        });

        const sort = (field && order !== 'none') ? `${field}:${order}` : null; // сохраним в переменную параметр сортировки в виде field:direction

        return sort ? Object.assign({}, query, { sort }) : query; // по общему принципу, если есть сортировка, добавляем, если нет, то не трогаем query
    }
}
