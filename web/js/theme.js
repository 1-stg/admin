$(() => {
    const SCHEMA_LIGHT = 'light';
    const SCHEMA_DARK = 'dark';
    const pathCss = '/web/css';
    let currentSchema;

    const getSchema = () => currentSchema = localStorage.getItem('schema');

    const setSchema = (schema) => localStorage.setItem('schema', schema);

    const getFileSchema = () => {
        return currentSchema === SCHEMA_DARK ? 'Darkbase.css' : 'base.css';
    }

    const loadCss = (file) => {
        if (file) {
            const oldLink = $('#theme-css');
            if (oldLink.length) {
                oldLink.remove();
            }

            $('<link>')
                .attr({
                    id: 'theme-css',
                    rel: 'stylesheet',
                    href: `${pathCss}/${file}`
                })
                .appendTo('head');
        }
    }

    $('.toggle').on('click', () => {
        currentSchema = currentSchema === SCHEMA_LIGHT
            ? SCHEMA_DARK
            : SCHEMA_LIGHT;
        setSchema(currentSchema);
        loadCss(getFileSchema());

        $('body').attr('data-bs-theme', currentSchema === SCHEMA_DARK ? 'dark' : 'light');
    });

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