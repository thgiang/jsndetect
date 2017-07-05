chrome.storage.local.set({template: null});
var htmlContent = document.head.outerHTML;
console.log(htmlContent);
var templates = ['jsn_air_pro','jsn_air_free','jsn_ares_pro','jsn_ares_free','jsn_artista_pro','jsn_artista_free','jsn_artista_2_pro','jsn_blank_pro','jsn_blank_free','jsn_boot_pro','jsn_corsa_pro','jsn_corsa_free','jsn_corsa_2_pro','jsn_cube_pro','jsn_cube_free','jsn_decor_pro','jsn_decor_free','jsn_decor_2_pro','jsn_dome_pro','jsn_dome_free','jsn_dona_pro','jsn_dona_free','jsn_dona_2_pro','jsn_educare_pro','jsn_epic_pro','jsn_epic_free','jsn_epic_2_pro','jsn_escape_pro','jsn_escape_free','jsn_ferado_pro','jsn_ferado_free','jsn_ferado_2_pro','jsn_fidem_pro','jsn_fidem_free','jsn_force_pro','jsn_force_free','jsn_force_2_pro','jsn_glamo_pro','jsn_glamo_free','jsn_glass_pro','jsn_glass_free','jsn_gruve_pro','jsn_gruve_free','jsn_kido_pro','jsn_kido_free','jsn_levart_pro','jsn_medis_pro','jsn_medis_free','jsn_megazine_pro','jsn_megazine_free','jsn_megazine2_pro','jsn_metro_pro','jsn_metro_free','jsn_metro_2_pro','jsn_mico_pro','jsn_mico_free','jsn_min_shine_free','jsn_mini_pro','jsn_mini_free','jsn_mini_2_pro','jsn_neon_pro','jsn_neon_free','jsn_nuru_pro','jsn_nuru_free','jsn_one_pro','jsn_one_free','jsn_one_2_pro','jsn_pixel_pro','jsn_pixel_free','jsn_pixel_2_pro','jsn_reta_pro','jsn_reta_free','jsn_reta_2_pro','jsn_joomlashine_pro','jsn_sky_pro','jsn_sky_free','jsn_sky_2_pro','jsn_sky_2_free','jsn_solid_pro','jsn_solid_free','jsn_solid_2_pro','jsn_sun_blank_pro','jsn_sun_blank_free','jsn_sunblank_free','jsn_teki_pro','jsn_teki_free','jsn_tendo_pro','jsn_tendo_free','jsn_test_2_pro','jsn_time_pro','jsn_time_free','jsn_time_2_pro','jsn_venture_pro','jsn_venture_free','jsn_venture_2_pro','jsn_vintage_pro','jsn_vintage_free','jsn_yoyo_pro','jsn_yoyo_free','jsn_yoyo_2_pro'];
templates.forEach(function(e){
    var found = false;
    found = htmlContent.search(e);
    console.log(found + ' - '+ e);
    if (found > 0)
    {
        chrome.storage.local.set({template: e});
        return false;
    }
});
