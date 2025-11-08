module.exports = {
    // Form Authentication (Login)
    login: {
        username: '#username',
        password: '#password',
        submit: 'button[type="submit"]',
        flashSuccess: '.flash.success',
        flashError: '.flash.error',
        title: 'h2',
        logout: 'a.button.secondary.radius'
    },
    checkboxes: {
        group: '#checkboxes input[type="checkbox"]',
        checkbox1: 'checboxes input[type="checkbox"]:nth-of-type(1)',
        checkbox2: 'checboxes input[type="checkbox"]:nth-of-type(2)',
        checkboxTitile: 'h3'
    },
    dropdown: {
        dropdownTitle: 'h3',
        dropdownMenu: '#dropdown',
        option1: 'option[value="1"]',
        option2: 'option[value="2"]'
    },
    hovers: {
        hoversTitle: 'h3',
        figure: '.figure',
        figureCaption: '.figcaption',
        profileLink: '.figcaption a',
        profileName: '.figcaption h5'
    },
    drag_and_drop: {
        dragAndDropTitle: 'h3',
        columnA: '#column-a',
        columnB: '#column-b',
        headerA: '#column-a header',
        headerB: '#column-b header'
    },
    dynamic_loading: {
        dynamicLoadingTitle: 'h3',
        example1Link: 'a[href="/dynamic_loading/1"]',
        example2Link: 'a[href="/dynamic_loading/2"]',
        startButton: '#start button',
        loadingIndicator: '#loading',
        loadedText: '#finish h4'
    },
    dynamic_content: {
        dynamicContentTitle: 'h3',
        contentImages: '.large-10.columns .row .large-2.columns img',
        contentParagraphs: '.large-10.columns .row .large-10.columns'
    }
};