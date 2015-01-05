var formatDate = function(date) {
        var year = date.getFullYear(),
            month = (date.getMonth() + 1),
            day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    },
    getWeek = function() {
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
        return currentDate;
    },
    resetForm = function($form) { //resets form fields
        $form.find('input:text, input:password, input:file, select, textarea').val('');
        $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
    },
    prepareHtml = function(tabSource, contentSource, tabDestination, contentDestination) { //appends required basic templates to html body
        var tabHeaderTemplate = Handlebars.compile($(tabSource).html()),
            tabContentTemplate = Handlebars.compile($(contentSource).html());
        $(tabDestination).append(tabHeaderTemplate);
        $(contentDestination).append(tabContentTemplate);
    };
