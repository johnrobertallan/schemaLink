/** 
 * @fileOverview contains the schemaLink jQuery plugin code.
 * @version: 0.1
 * @author John Robert Allan john@johnrobertallan.com
 * @author Habanero Consulting Group jallan@habaneroconsulting.com
 * @requires: jQuery
 *
 * @license Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */
 
/**
 * See (http://jquery.com/).
 * @name jQuery
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */
 
/**
 * See (http://jquery.com/)
 * @name fn
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf jQuery
 */
 
/**
 * schemaLink - a jQuery plugin to parse schema.org formatted markup and wrap it in a useful anchor tag
 *
 * @class schemaLink
 * @memberOf jQuery.fn
 */

(function($) {

    $.fn.schemaLink = function(options) {

        var settings = $.extend({
            'title':            'link to more information',
            'class':            'schemaLink',
            'openInNewWindow':  true,
            'reuseWindow':      true,
            'windowName':       'schemaLinkWindow',
            'dataAttribute':    'itemprop',
            'dataTemplate': {
                'streetAddress':    null,
                'addressLocality':  null,
                'addressRegion':    null,
                'postalCode':       null,
                'addressCountry':   null
            },
            'urlTemplates': {
                'default':      'http://maps.google.com?q={streetAddress} {addressLocality} {addressRegion} {postalCode} {addressCountry}',
                'ios':          'maps:?saddr=Current Location&daddr={streetAddress} {addressLocality} {addressRegion} {postalCode} {addressCountry}',
                'android':      'geo:{streetAddress} {addressLocality} {addressRegion} {postalCode} {addressCountry}',
                'wp7':          'maps:{streetAddress} {addressLocality} {addressRegion} {postalCode} {addressCountry}',
                'w8':           'bingmaps:?where={streetAddress} {addressLocality} {addressRegion} {postalCode} {addressCountry}',
                'blackberry':   'javascript:blackberry.launch.newMap({"address":{"address1":"{streetAddress}","city":"{addressLocality}","country":"{addressCountry}","stateProvince":"{addressRegion}","zipPostal":"{postalCode}"}});'
            },
            'deviceMap': [
                {
                    'dType': 'ios',
                    'qString': 'ipad'},
                {
                    'dType': 'ios',
                    'qString': 'ipod'},
                {
                    'dType': 'ios',
                    'qString': 'iphone'},
                {
                    'dType': 'android',
                    'qString': 'android'},
                {
                    'dType': 'blackberry',
                    'qString': 'blackberry'},
                {
                    'dType': 'wp7',
                    'qString': 'windows phone'},
                {
                    'dType': 'w8',
                    'qString': 'windows nt 6.2'}
            ]

        }, options);

        var methods = {
            //iterates over a JSON object and replaces each marker in the string template
            //with the matching value from the object
            //{key} in string is replaced with the value of 'key' from the object
            'JSONStringBuilder': function(s, o) {
                var k;
                for (k in o) {
                    if (o.hasOwnProperty(k)) {
                        s = s.replace('{' + k + '}', o[k]);
                    }
                }
                return s;
            },
            // using the device type and schema data this function chooses a 
            // template, constructs the URL and encodes it
            'buildURL': function(deviceType, locationData) {
                var t, url;
                t = settings.urlTemplates[deviceType];
                url = methods.JSONStringBuilder(t, locationData);
                url = encodeURI(url);
                return url;
            },
            // extracts the schema data from the given element
            'getSchemaData': function(el) {
                var schemaData, k;
                //get the data object template from settings
                schemaData = settings.dataTemplate;
                //iterate over the object and get the matching content from each DOM element
                //object key, template marker and dataAttribute value must all match
                for (k in schemaData) {
                    if (schemaData.hasOwnProperty(k)) {
                        schemaData[k] = el.find('[' + settings.dataAttribute + '="' + k + '"]').text();
                    }
                }
                return schemaData;
            },
            // by parsing the user-agent string this function attempts to determine 
            // which type of platform the user is browsing on
            // if a supported platform is not detected it returns 'default'
            // some variations use the same template (ipad,iphone,ipod == ios)
            'getDeviceType': function() {
                var ua, uaArray, i, l, dType;
                ua = navigator.userAgent.toLowerCase();              
                i = 0;
                l = settings.deviceMap.length;
                dType = 'default';

                // search the user-agent string for qString and when one is found
                // return the associated device type
                for (i; i < l; i++) {
                    if (ua.indexOf(settings.deviceMap[i].qString) >= 0) {
                        dType = settings.deviceMap[i].dType;
                        break;
                    }
                }

                return dType;
            }
        };

        return this.each(function() {
            var $this, $a, href, schemaData, deviceType;
            
            $this = $(this);
            
            //pull schema data from the HTML
            schemaData = methods.getSchemaData($this);
            
            //determine the device type by user-agent
            deviceType = methods.getDeviceType();
            
            //build the URL using the location data and device type
            href = methods.buildURL(deviceType, schemaData);
            
            //create the anchor tag
            $a = $('<a>').attr({
                'href': href,
                'title': settings.title,
                'class': settings.class,
                'target': (settings.openInNewWindow) ? (settings.reuseWindow) ? settings.windowName : '_blank' : '_self'
            });
            
            //inject the anchor tag into the DOM
            $this.wrapInner($a);
        });

    };
})(jQuery);