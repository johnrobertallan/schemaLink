$(document).ready(function () {
    
    var $target = $("[itemtype='schema.org/PostalAddress']"),
        $ua = $('<p>');
    
    $target.schemaLink();
    $ua.text(navigator.userAgent);
    $('h1').after($ua);
    
    $target.each(function () {
        var $p = $('<p>');
        
        $p.text('linked to: ' + $target.children('a').attr('href'));
        
        $target.after($p);
    });
    
});