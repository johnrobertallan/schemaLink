# schemaLink jQuery Plugin

A jQuery plugin to parse schema.org formatted markup and wrap it in a useful anchor tag

The default functionality is for PostalAddress data and opens a native mapping app for mobile devices or Google Maps for a desktop or unknown device. Using the settings object of the plugin you could change the functionality to parse other micro data formats, build other types of URLs or support other devices.

**Supported devices for the default map functionality:**
- iPhone | iPad | iPod
- Android
- WP7/8
- BlackBerry
- other via default template

**Tested Device:**
- iPhone4(s)
- iPhone5(s)
- Android(?)
- FF4+

## Roadmap:

- develop a pure JS version to remove reliance on jQuery
- add support for default/existing anchor tag

## Defaults 

### Settings:

    $('[itemtype="schema.org/PostalAddress"]').schemaLink({ 
        'title': 'link to more information', (string) //the title which appears on the anchor tag
        'class': 'schemaLink', (string) //the class(es) which appear on the anchor tag
        'openInNewWindow': true, (boolean) //links open in a new window
        'reuseWindow': true, (boolean) //if (openInNewWindow) all links open in the same new window
        'windowName': 'schemaLinkWindow', //(string) window name if reuseWindow is true 
        'dataAttribute': 'itemprop', (string) //the attribute name which contains each individual piece of data, maps dataTemplate to urlTemplate
        'defaultDeviceName': 'default', (string) //name of the default device profile to use from deviceMap
        'dataTemplate': {}, (object) //each key must match a marker in the urlTemplates and a dataAttribute
        'urlTemplates': {}, (object) //contains a URL template for each device type
        'deviceMap' [] (array) //an array of objects which maps user-agent strings to URL templates using a RegEx test
    });

### urlTemplates:

    'urlTemplates': {
        'default':      'http://maps.google.com?q={streetAddress} {addressLocality} {addressRegion} {postalCode} {addressCountry}',
        'ios':          'http://maps.apple.com?saddr=Current Location&daddr={streetAddress} {addressLocality} {addressRegion} {postalCode} {addressCountry}',
        'android':      'geo:0,0?q={streetAddress} {addressLocality} {addressRegion} {postalCode} {addressCountry}',
        'wp7':          'maps:{streetAddress} {addressLocality} {addressRegion} {postalCode} {addressCountry}',
        'wp8':          'maps:?where={streetAddress} {addressLocality} {addressRegion} {postalCode} {addressCountry}',
        'blackberry':   'javascript:blackberry.launch.newMap({"address":{"address1":"{streetAddress}","city":"{addressLocality}","country":"{addressCountry}","stateProvince":"{addressRegion}","zipPostal":"{postalCode}"}});'
    }
    
### deviceMap:

    'deviceMap': [
        {
            'name': 'ios',
            'test': /ipad|ipod|iphone/
        },
        {
            'name': 'android',
            'test': /android/
        },
        {
            'name': 'blackberry',
            'test': /blackberry/
        },
        {
            'name': 'wp7',
            'test': /windows phone os 7/
        },
        {
            'name': 'wp8',
            'test': /windows phone 8/
        }
    ],
    
## Example:

### Source HTML

    <p itemscope itemtype='schema.org/PostalAddress'>
        <span itemprop='name'>Zelen Shoes</span><br />
        <span itemprop='streetAddress'>894 Granville Street</span><br />
        <span itemprop='addressLocality'>Vancouver</span>,
        <span itemprop='addressRegion'>BC</span><br />
        <span itemprop='postalCode'>V6Z 1K3</span>
        <span itemprop='addressCountry'>Canada</span>
    </p>

### Function call

    $('[itemtype="schema.org/PostalAddress"]').schemaLink();

### HTML result

    <p itemscope='' itemtype='schema.org/PostalAddress'>
        <a href='bingmaps:?where=894%20Granville%20Street%20Vancouver%20BC%20V6Z%201K3%20Canada' title='link to more information' class='schemaLink' target='mapLinkWindow'>
            <span itemprop='name'>Zelen Shoes</span><br>
            <span itemprop='streetAddress'>894 Granville Street</span><br>
            <span itemprop='addressLocality'>Vancouver</span>,
            <span itemprop='addressRegion'>BC</span><br>
            <span itemprop='postalCode'>V6Z 1K3</span>
            <span itemprop='addressCountry'>Canada</span>
        </a>
    </p>