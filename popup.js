$(document).ready(function(){
    var templates = ['jsn_air_pro','jsn_air_free','jsn_ares_pro','jsn_ares_free','jsn_artista_pro','jsn_artista_free','jsn_artista_2_pro','jsn_blank_pro','jsn_blank_free','jsn_boot_pro','jsn_corsa_pro','jsn_corsa_free','jsn_corsa_2_pro','jsn_cube_pro','jsn_cube_free','jsn_decor_pro','jsn_decor_free','jsn_decor_2_pro','jsn_dome_pro','jsn_dome_free','jsn_dona_pro','jsn_dona_free','jsn_dona_2_pro','jsn_educare_pro','jsn_epic_pro','jsn_epic_free','jsn_epic_2_pro','jsn_escape_pro','jsn_escape_free','jsn_ferado_pro','jsn_ferado_free','jsn_ferado_2_pro','jsn_fidem_pro','jsn_fidem_free','jsn_force_pro','jsn_force_free','jsn_force_2_pro','jsn_glamo_pro','jsn_glamo_free','jsn_glass_pro','jsn_glass_free','jsn_gruve_pro','jsn_gruve_free','jsn_kido_pro','jsn_kido_free','jsn_levart_pro','jsn_medis_pro','jsn_medis_free','jsn_megazine_pro','jsn_megazine_free','jsn_megazine_2_pro','jsn_metro_pro','jsn_metro_free','jsn_metro_2_pro','jsn_mico_pro','jsn_mico_free','jsn_min_shine_free','jsn_mini_pro','jsn_mini_free','jsn_mini_2_pro','jsn_neon_pro','jsn_neon_free','jsn_nuru_pro','jsn_nuru_free','jsn_one_pro','jsn_one_free','jsn_one_2_pro','jsn_pixel_pro','jsn_pixel_free','jsn_pixel_2_pro','jsn_reta_pro','jsn_reta_free','jsn_reta_2_pro','jsn_joomlashine_pro','jsn_sky_pro','jsn_sky_free','jsn_sky_2_pro','jsn_sky_2_free','jsn_solid_pro','jsn_solid_free','jsn_solid_2_pro','jsn_sun_blank_pro','jsn_sun_blank_free','jsn_sunblank_free','jsn_teki_pro','jsn_teki_free','jsn_tendo_pro','jsn_tendo_free','jsn_test_2_pro','jsn_time_pro','jsn_time_free','jsn_time_2_pro','jsn_venture_pro','jsn_venture_free','jsn_venture_2_pro','jsn_vintage_pro','jsn_vintage_free','jsn_yoyo_pro','jsn_yoyo_free','jsn_yoyo_2_pro'];
    var extensions = ['uniform','easyslider','poweradmin','pagebuilder2','pagebuilder','imageshow','mobilize'];
    var checkedTemplate = 0;
    var checkedExtension = 0;
    var domain = '';
    var found = false;
    var finalDomain = '';
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
                                    finalDomain = domain;
                                }
                            }
                        });
                        domain += e+'/';
                    }
                })
            ).done(function () {
                console.log('Domain: '+finalDomain);
                extensions.forEach(function(e){
                    url = finalDomain +'components/com_'+e+'/index.html';
                    console.log("Checking: "+ url);
                    checkIsset(url, e, '#jsn_detector_extension', 'extension');
                });

                templates.forEach(function(e){
                    url = finalDomain +'templates/'+e+'/index.html';
                    console.log("Checking: "+ url);
                    checkIsset(url, e, '#jsn_detector_template', 'template');
                });


            });
        });
    }

    function checkIsset(url, name, element, type)
    {
        $('#loading').show();

        $.ajax({
            url: 'http://localhost/la.php',
            data: {url: url},
            method: 'POST',
            success: function(data){
                if (data === "HTTP/1.1 200 OK")
                {
                    $(element+'_not_found').hide();
                    console.log("I found:" + url);
                    $(element).append('<div style="clear: both"><img src="checked.png" height="15px" width="15px" style="float: left"/>&nbsp;'+name.toUpperCase()+' is installed!</div>');
                }
                if (type === 'extension')
                {
                    checkedExtension ++;
                }
                else {
                    checkedTemplate ++;
                }

                if (checkedTemplate === templates.length  && checkedExtension === extensions.length)
                {
                    $('#loading').hide();
                }
            }
        });
    }
});

