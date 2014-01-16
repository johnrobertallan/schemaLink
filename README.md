# schemaLink jQuery Plugin

A jQuery plugin to parse schema.org formatted markup and wrap it in a useful anchor tag

The originally desired functionality is for PostalAddress data and opens a native mapping app for mobile devices or Google Maps for a desktop or unknown device (W8 will open Bing). Using the settings object of the plug you could change the default functionality to parse other micro data formats, build other types of URLs or support other devices.

**Supported devices for the default map functionality:**
- iPhone
- iPad
- iPod
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

## Default settings:

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
        'deviceMap' [] (array) //an array of objects which maps user-agent strings to URL templates via device type
    });

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