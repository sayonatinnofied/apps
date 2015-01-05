Ext.define('ConferenceApp.util.Util', {
    singleton: true,

    api: (function() {
        var baseUrl = 'http://192.168.2.5:8000/api/';

        return {
            login: baseUrl + 'login',
            logout: baseUrl + 'logout',
            agendaUrl: baseUrl + 'agendas',
            addSponsorUrl: baseUrl + 'sponser/add-sponser',
            editSponsorUrl:baseUrl+'sponser/',
            eventDetailsUrl: baseUrl + 'event/',
            speakerUrl: baseUrl + 'speakers',
            sponsorUrl: baseUrl + 'sponsers',
            sponsorshipCategoryUrl: baseUrl + 'sponser-categories',
            addsponsorshipUrl: baseUrl + 'sponser-category/add',
            attendeeUrl: baseUrl + 'attenders'
        }
    })(),

    /*
     *  Sets the url of store proxy
     */
    setProxyUrl: function(storeInstance, storeName) {
        var me = this,
        url = "";

        switch (storeName) {
            case "agendas":
                url = me.api.agendaUrl;
                break;

            case "attendees":
                url = me.api.attendeeUrl;
                break;

            case "speakers":
                url = me.api.speakerUrl;
                break;

            case "sponsors":
                url = me.api.sponsorUrl;
                break;

            case "sponsorshipCategories":
                url = me.api.sponsorshipCategoryUrl;
                break;
        }

        storeInstance.getProxy().setUrl(url);
    },

    /**************************** Custom Functions *****************************/

    /*
     * Displays the image selected
     */
    readImage: function(fileConfig, fileField, isCoverImage) {
        var me = this,
            reader = new FileReader(),
            imageSrc = "",
            file = fileConfig.file,
            modelData = fileConfig.modelData,
            fieldName = fileConfig.fieldName,
            displayField = fileConfig.displayField;

        if (!file) {
            displayField.setHtml('<img src="" style="max-width:200px">');
            return;
        }

        reader.readAsDataURL(file);
        reader.onload = function(event) {
            imageSrc = event.target.result;

            if (file.type.indexOf("image") >= 0) {
                var img = new Image();
                img.src = imageSrc;
                me.setFileFieldErrorMsg(fileField, img.width, img.height, isCoverImage);
            }

            if (modelData && fieldName) {
                modelData[fieldName] = imageSrc;
                displayField.setBind({
                    html: '<img src="{' + fieldName + '}" style="max-width:200px">'
                });
            } else {
                displayField.setHtml('<img src="' + imageSrc + '" style="max-width:200px">')
            }
        };
    },

    /*
     *  Sets the error message of the file field according to width and height
     *  of the selected image
     */
    setFileFieldErrorMsg: function(fileField, imgWidth, imgHeight, isCoverImage) {
        if (isCoverImage) {
            if (imgWidth > 1921 || imgHeight > 1081) {

                fileField.setActiveError("Maximum resolution should be 1921*1081");

            } else if (imgWidth < 1023 || imgHeight < 699) {

                fileField.setActiveError("Minimum resolution should be 1023*699");
            }
        } else {
            if (imgWidth > 1200 || imgHeight > 1200) {

                fileField.setActiveError("Maximum resolution should be 1200*1200");
            }
        }
    },

    /*
     * Bundles object and file into a single object
     */
    buildFormData: function(formDataConfig) {
        var formData = new FormData();

        formDataConfig.forEach(function(item, index, ar) {

            if (item.type == "object" || item.type == "array") {
                formData.append(item.key, JSON.stringify(item.value));
            } else {
                formData.append(item.key, item.value);
            }
        });

        return formData;
    },

    /*
     * XMLHttp Request custom function
     */
    formDataRequest: function(requestConfig, scope) {
        var me = scope || this,
            method = requestConfig.method.toString().toUpperCase() || 'GET',
            request = new XMLHttpRequest(),
            response,
            progress = requestConfig.progress,
            complete = requestConfig.complete,
            failure = requestConfig.failure,
            cancel = requestConfig.cancel;

            request.addEventListener("progress", progress, false);

        request.onload = function() {
            var me = this,
                response = Ext.decode(me.responseText);
            if (complete) {
                complete(me, response);
            }
        };

        request.onerror = function() {
            var me = this;
            if (failure) {
                failure(me);
            }
        };

        request.onabort = function() {
            var me = this;
            if (cancel) {
                cancel(me);
            }
        };

        request.open(method, requestConfig.url);
        request.send(requestConfig.data);
        // console.log(request);
    }
});
