Templates = {

    getSpeakerComboBoxOptions: function() {
        return Ext.create('Ext.XTemplate',
            '<tpl for=".">',
            '<div class="x-boundlist-item">',
            '   <div class="speaker-list-item-container">',
            '      <img class="speaker-image" src="http://192.168.2.2:8000/{profilePictureUrl}">',
            '      <div class="speaker-name blue-highlight">{name}</div>',
            '      <div><i class="fa fa-briefcase"></i>{designation} at <span class="blue-highlight">{companyName}</span></div>',
            '   </div>',
            '</div>',
            '</tpl>'
        );
    },

    getSpeakerComboBoxDisplay: function() {
        return Ext.create('Ext.XTemplate',
            '<tpl for=".">',
            '   {name}',
            '</tpl>'
        );
    },

    getAgendaList: function() {
        return Ext.create('Ext.XTemplate',
            '<tpl for=".">',
            '<div class="agenda-info-field">',
            '   <div class="agenda-time-field">',
            '       <div class="starting-time">{startingTime}</div>',
            '       <div class="to-container">To</div>',
            '       <div class="ending-time">{endingTime}</div>',
            '   </div>',
            '   <div class="speaker-list-wrapper">',
            '       <div class="agenda-name">{title}</div>',
            '       <div class="agenda-location-container">',
            '           <span class="icon-container">',
            '               <i class="fa fa-map-marker"></i>',
            '           </span>',
            '           <span> Location: </span>',
            '           <span class="agenda-location">{location}</span>',
            '       </div>',
            '       <tpl for="speakers">',
            '           <div class="speaker-details">',
            '               <div class="speaker-image-container">',
            '                   <img class="speaker-image" src="http://192.168.2.2:8000/{profilePicture}">',
            '               </div>',
            '               <div class="speaker-info-container">',
            '                   <div class="speaker-name">{name}</div>',
            '                   <div class="carrier-info">',
            '                       <span class="designation">{designation},</span>',
            '                       <span class="company-name">{companyName}</span>',
            '                   </div>',
            '               </div>',
            '           </div>',
            '       </tpl>',
            '   </div>',
            '</div>',
            '</tpl>'
        );
    },

    getAgendaDateField: function() {
        return Ext.create('Ext.XTemplate',
            '<div class="agenda-date">{agendaDay}</div>'
        );
    },

    getSponsorsList: function() {
        return Ext.create('Ext.XTemplate',
            '<ul class="sponsors-list">',
            '<tpl for=".">',
            '   <li style="margin-bottom: 10px;" class="thumb-wrap">',
            '       <img class="sponsor-image" src="{src}" />',
            '       <div class="sponsor-content">',
            '           <div class="sponsor-title">{title}</div>',
            '           <div class="sponsor-category"><i class="fa fa-tag"></i>{category}</div>',
            '           <div class="sponsor-website"><i class="fa fa-globe"></i><a href="http://{website}">{website}</a></div>',
            '           <div class="sponsor-social">',
            '               <a href="{facebookurl}" class="social-links"><i class="fa fa-facebook-square"></i></a>',
            '               <a href="{twitterurl}" class="social-links"><i class="fa fa-twitter-square"></i></a>',
            '               <a href="{linkedinurl}"class="social-links"><i class="fa fa-linkedin-square"></i></a>',
            '               <a href="{googleurl}" class="social-links"><i class="fa  fa-google-plus-square"></i></a>',
            '           </div>',
            '       </div>',
            '       <div class="sponsor-tools">',
            '           <i class="fa fa-edit sponsor-edit"></i>',
            '           <i class="fa fa-remove sponsor-remove"></i>',
            '       </div>',
            '   </li>',
            '</tpl>',
            '</ul>'
        );
    },

    getSpeakersList: function() {
        return Ext.create('Ext.XTemplate',
            '<ul class="speakers-list">',
            '<tpl for=".">',
            '   <li>',
            '       <div class="speaker-list-item-container">',
            '           <img src="http://192.168.2.2:8000/{profilePictureUrl}">',
            '           <div class="speaker-name blue-highlight">{name}</div>',
            '           <div class="speaker-address"><i class="fa fa-map-marker"></i>',
            '           {city} ',
            '           <tpl if="state || country">',
            '            ,',
            '           </tpl>',
            '           {state} ',
            '           <tpl if="(city || state) && country">',
            '           , ',
            '           </tpl>',
            '           {country}',
            '           </div>',
            '           <div><i class="fa fa-briefcase"></i>{designation} at <span class="blue-highlight">{companyName}</span></div>',
            '           <div class="speaker-social-container">',
            '           <tpl if="email != null">',
            '              <a href="mailto:{email}" target="_top" class="speaker-social-link fa fa-envelope"></a>',
            '           </tpl>',
            '            <tpl for="socialLinks">',
            '              <a href="{url}" target="_blank" class="speaker-social-link {social.faClass}"></a>',
            '           </tpl>',
            '           </div>',
            '       </div>',
            '   </li>',
            '</tpl>',
            '</ul>'
        );
    }
};
