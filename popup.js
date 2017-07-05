$(document).ready(function(){
    var extensions = ['uniform','easyslider','poweradmin','pagebuilder2','pagebuilder','imageshow','mobilize'];
    var checkedExtension = 0;
    var template = '';
    var domain = '';
    var found = false;
    var finalDomain = '';
    var finalDomainNPTC = '';
    findDomainRoot();
    function findDomainRoot()
    {
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function(tabs) {

            // and use that tab to fill in out title and url
            var tab = tabs[0];
            console.log(tab.url);
            var res = tab.url.split("/");
            console.log(res);
            domain = res[0]+'//'+res[2]+'/';
            $.when(
                res.forEach(function(e, index){
                    if (index > 2 && !found)
                    {
                        var detectUrl = domain +'templates/index.html';
                        console.log(detectUrl);
                        $.ajax({
                            async: false,
                            url: 'http://rc.joomlashine.com/tools/read_header.php',
                            data: {url: detectUrl},
                            method: 'POST',
                            beforeSend: function()
                            {
                                $('#loading').show();
                            },
                            success: function(data){
                                if (data === "HTTP/1.1 200 OK" && !found)
                                {
                                    found = true;
                                    finalDomainNPTC = res[2];
                                    finalDomain = domain;
                                }
                            }
                        });
                        domain += e+'/';
                    }
                })
            ).done(function () {
                console.log('Domain: '+finalDomain);
                checkUsingTpl();
                extensions.forEach(function(e){
                    url = finalDomain +'components/com_'+e+'/index.html';
                    console.log("Checking: "+ url);
                    checkIssetExt(url, e, '#jsn_detector_extension', 'extension');
                });
            });
        });
    }

    function checkUsingTpl() {
        chrome.storage.local.get(finalDomainNPTC, function(data) {
            if(typeof data[finalDomainNPTC] === "undefined" || data[finalDomainNPTC] === null) {
                $('#jsn_detector_template').html('No template found');
            } else {
                $('#jsn_detector_template').html('<div style="clear: both"><img src="checked.png" height="15px" width="15px" style="float: left"/>&nbsp;'+data[finalDomainNPTC].toUpperCase()+' is installed!</div>');
            }
        });
    }


    function checkIssetExt(url, name, element)
    {
        $('#loading').show();

        $.ajax({
            url: 'http://rc.joomlashine.com/tools/read_header.php',
            data: {url: url},
            method: 'POST',
            success: function(data){
                if (data === "HTTP/1.1 200 OK")
                {
                    found = true;
                    console.log("I found:" + url);
                    $(element).append('<div style="clear: both"><img src="checked.png" height="15px" width="15px" style="float: left"/>&nbsp;'+name.toUpperCase()+' is installed!</div>');
                }

                checkedExtension ++;

                if (checkedExtension === extensions.length)
                {
                    if (found == false)
                    {
                        $('#jsn_detector_extension').html('No extension found');
                    }
                    $('#loading').hide();
                }
            }
        });
    }


});

