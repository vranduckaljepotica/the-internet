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
    }
};