$(() => {
    const SCHEMA_LIGHT = 'light';
    const SCHEMA_DARK = 'dark';
    const pathCss = '/web/css';
    let currentSchema;

    const getSchema = () => currentSchema = localStorage.getItem('schema');

    const setSchema = (schema) => localStorage.setItem('schema', schema);

    const getFileSchema = () => {
        // Возвращает: base.css для light, Darkbase.css для dark
        return currentSchema === SCHEMA_DARK ? 'Darkbase.css' : 'base.css';
    }

    const loadCss = (file) => {
        if (file) {
            // Удаляем старую тему, если есть
            const oldLink = $('#theme-css');
            if (oldLink.length) {
                oldLink.remove();
            }

            // Добавляем новый CSS файл
            $('<link>')
                .attr({
                    id: 'theme-css',
                    rel: 'stylesheet',
                    href: `${pathCss}/${file}`
                })
                .appendTo('head');
        }
    }

    // Кнопка переключения темы
    $('.toggle').on('click', () => {
        currentSchema = currentSchema === SCHEMA_LIGHT
            ? SCHEMA_DARK
            : SCHEMA_LIGHT;
        setSchema(currentSchema);
        loadCss(getFileSchema());

        // Обновляем атрибут data-bs-theme на body
        $('body').attr('data-bs-theme', currentSchema === SCHEMA_DARK ? 'dark' : 'light');
    });

    // Инициализация при загрузке
    (() => {
        currentSchema = getSchema();
        if (!currentSchema) {
            currentSchema = SCHEMA_LIGHT;
            setSchema(currentSchema);
        }
        loadCss(getFileSchema());
        $('body').attr('data-bs-theme', currentSchema === SCHEMA_DARK ? 'dark' : 'light');
    })();
});