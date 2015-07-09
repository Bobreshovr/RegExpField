
RegExpFieldTemplate = function RegExpFieldTemplate() {
}

RegExpFieldTemplate.$$cctor = function RegExpFieldTemplate$$$cctor() {
    if (typeof (SPClientTemplates) != "undefined")
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(RegExpFieldTemplate.createRenderContextOverride());
}
RegExpFieldTemplate.createRenderContextOverride = function () {
    var RegExpFieldTemplateContext = {};
    RegExpFieldTemplateContext.Templates = {};
    RegExpFieldTemplateContext.Templates['Fields'] = {
        RegExpField: {
            View: RegExpFieldTemplate.renderViewControl,
            DisplayForm: RegExpFieldTemplate.renderDisplayControl,
            NewForm: RegExpFieldTemplate.renderEditControl,
            EditForm: RegExpFieldTemplate.renderEditControl,

        }
    };
    return RegExpFieldTemplateContext;
}


//Создаем объект валидатора поля
RegExpFieldTemplate.ValidatorValue = function (stringRegExp, errorMessage) {
    //в объекте должна быть всего 1 функция она производит валидацию
    RegExpFieldTemplate.ValidatorValue.prototype.Validate = function (value) {
        //Проверяем наличие данных в поле и наличие решулярного выражения
        if (value && stringRegExp) {

            var reg = new RegExp(stringRegExp);
                    //Проверяем ппроходит ли валидацию значение поля
            if (!reg.test(value)) {
                        //В качетсве возвращаемого значения создается объект в котором первый параметр поакзывает наличие ошибки, второй текст ошибки
                return new SPClientForms.ClientValidation.ValidationResult(true, errorMessage);//
                }
            }
        return new SPClientForms.ClientValidation.ValidationResult(false);
    };
}

RegExpFieldTemplate.renderEditControl = function (rCtx) {
    if (rCtx == null)
        return '';
    var frmData = SPClientTemplates.Utility.GetFormContextForCurrentField(rCtx);// Получение данных формы, функция по контексту 
    //возвращает специальный объект с данными и для регистрации событий поля

    if (frmData == null || frmData.fieldSchema == null)
        return '';
    var _inputElt;
    var _value = frmData.fieldValue != null ? frmData.fieldValue : '';// В случаи если с сервера придут не корректные данные
    var _inputId = frmData.fieldName + '_' + '_$RegExp' + rCtx.FormUniqueId;//Формируется Id input ввода
    var validators = new SPClientForms.ClientValidation.ValidatorSet()//Создается объект валидатора, в него нужно будет записать все используемвые в объекте валидаторы
    if (frmData.fieldSchema.Required) {//Проверка на обязательнсть заполнения данного поля
        // Если поле является обязательным к заполнению нужно добавиьт специальный валидатор проверки заполниности поля
        validators.RegisterValidator(new SPClientForms.ClientValidation.RequiredValidator());
    }
    //Здесь происходит регистрация нашего валидатора указаного в настройках поля 
    validators.RegisterValidator(new RegExpFieldTemplate.ValidatorValue(rCtx.CurrentFieldSchema.ValidRegExp,rCtx.CurrentFieldSchema.ErrorMessage));
    //Регистрация объекта валидации
    frmData.registerClientValidator(frmData.fieldName, validators);

    //регистрируется функция вызываемая после добавления HTML разметки в DOM
    frmData.registerInitCallback(frmData.fieldName, InitControl);
    //регистрируется функция вызываемая при необходимости фокусировки на данном поле, допустим  
    //доупустим после его валиадции
    frmData.registerFocusCallback(frmData.fieldName, function () {
        if (_inputElt != null) {
            _inputElt.focus();
            if (browseris.ie8standard) {
                var range = _inputElt.createTextRange();

                range.collapse(true);
                range.moveStart('character', 0);
                range.moveEnd('character', 0);
                range.select();
            }
        }
    });
    //регистрируется функция вызываемая для вывода ошибки поля
    frmData.registerValidationErrorCallback(frmData.fieldName, function (errorResult) {
        //Стандартная функция рисующая ошибку у заданного элмента, рисуется ввиде span внизу поля
        SPFormControl_AppendValidationErrorMessage(_inputId, errorResult);
    });
    //регистрируется функция вызываемая для получения значений из поля
    frmData.registerGetValueCallback(frmData.fieldName, function () {
        return _inputElt == null ? '' : _inputElt.value;
    });

    //обновляет значение поля хранящиеся в скрутом hidden (На самаом деле так и не понял зачем это делается, но решил добавить)
    frmData.updateControlValue(frmData.fieldName, _value);
    //Формируем разметку поля на основании контекста
    var result = '<span dir="' + STSHtmlEncode(frmData.fieldSchema.Direction) + '">';
    result += '<input type="text" value="' + STSHtmlEncode(_value) + '" maxlength="' + STSHtmlEncode(frmData.fieldSchema.MaxLength) + '" ';
    result += 'id="' + STSHtmlEncode(_inputId) + '" title="' + STSHtmlEncode(frmData.fieldSchema.Title);
    result += '" class="ms-long ms-spellcheck-true ' + (rCtx.CurrentFieldSchema.DoubleWidth ? 'InputDoubleWidth' : '') + ' " />';
    result += '<br /></span>';//

    return result;
    //Описываем функцию которая срабатывает после добавления разметки в DOM
    function InitControl() {
        //Получаем наш Input
        _inputElt = document.getElementById(_inputId);
        if (_inputElt != null)
            //Добавляем событие изменения
            AddEvtHandler(_inputElt, "onchange", OnValueChanged);
    }
    //Описываем функцию изменения в input
    function OnValueChanged() {
        if (_inputElt != null)
            //обновляет значение поля хранящиеся в скрутом hidden (На самаом деле так и не понял зачем это делается, но решил добавить)
            frmData.updateControlValue(frmData.fieldName, _inputElt.value);
    }
 
}

RegExpFieldTemplate.renderDisplayControl = function (renderCtx) {

    return STSHtmlEncode(renderCtx.CurrentFieldValue);//Берем значение из контекста сформитрованного для поля и производим Encode Html
}
RegExpFieldTemplate.renderViewControl = function (renderCtx, field, item, list) {

    if (renderCtx.inGridMode === true) {
        field.AllowGridEditing = false; // Отключаем режим редактирования поля если выбран режим GridView
    }

    return STSHtmlEncode(item[field.Name]);//Берем значения поля из item. Предварительно производим Encode Html тегов и отправляем значение в рендеринг 
}


function RegExpField_init() {
    RegExpFieldTemplate.$$cctor();
};
RegExpField_init();
