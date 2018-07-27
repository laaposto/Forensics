var verify_interval, report_interval;
var values = "";
var isPaused = false;
var ghosts = [];
var ghosts_qualities = [];
var count_imgs = 0;
var hash = "";
var meta1, meta2, meta3, meta4, meta5, meta6, meta7, meta8, meta9, meta10, meta11, meta12, meta13, meta14, meta15, meta16, meta17, meta18, meta19, meta20, meta21, meta22, meta23, meta24, meta25, meta26, meta27, meta28, meta29;

var max_height;
verify_col_items();

var lat = 0, long = 0, thumbnail_global, has_gps = false, image_load = false, has_thumb = false;

function verify_col_items() {
    var titles_desc = ["Double JPEG quantization inconsistencies (DQ)", "JPEG Ghosts (GHOST)", "JPEG blocking <br> artifact inconsistencies (BLOCK)", "Error Level Analysis (ELA)", "Median filtering <br> noise residue (MEDIAN)", "High frequency noise (WAVELET)", "CAGI", "CAGI-Inversed"];
    $('.alert').slideDown();
    var selected_image = document.getElementById('selected_image');
    var a_select = document.createElement('a');
    a_select.setAttribute('href', url_to_verify);
    a_select.setAttribute('onclick', 'return false;');
    selected_image.appendChild(a_select);

    var img1 = new Image();
    img1.setAttribute('src', url_to_verify);
    img1.setAttribute('data-imagezoom', 'true');
    img1.setAttribute('data-zoomviewborder', '6px solid #000');
    img1.setAttribute('data-magnification', '5');
    img1.setAttribute('onerror', 'imgError1(this);');
    img1.onload = function () {
        image_load = true;
        if (this.height >= this.width) {
            img1.setAttribute('class', 'original_img');
            a_select.appendChild(img1);

            var googlep = document.createElement('p');
            googlep.innerHTML = "send this image to <span style='color:#AF0E09;font-weight: bold;'>Google reverse image search</span>";
            googlep.setAttribute('class', 'google_link');
            googlep.setAttribute('style', 'width:250px');
            googlep.setAttribute('data-link', url_to_verify);
            selected_image.appendChild(googlep);

            var table1 = document.createElement('table');
            table1.setAttribute('class', 'flatTable');
            table1.setAttribute('id', 'flatTable1');
            table1.innerHTML = "<thead><tr><td>Significant Data</td></tr></thead><tbody></tbody>";
            selected_image.parentNode.insertBefore(table1, selected_image.nextSibling);
            $('.flatTable tbody').css('max-height', img1.clientHeight - 74);
            max_height = img1.clientHeight - 74;

            var next = document.createElement('img');
            next.setAttribute('class', 'next_data');
            next.setAttribute('src', '../../imgs/nxt-black.png');
            table1.parentNode.insertBefore(next, table1.nextSibling);

            var prv = document.createElement('img');
            prv.setAttribute('class', 'prv_data');
            prv.setAttribute('src', '../../imgs/prv-black.png');
            next.parentNode.insertBefore(prv, next.nextSibling);

            var span = document.createElement('span');
            span.setAttribute('class', 'desc_arrow');
            span.innerHTML = "more metadata fields";
            prv.parentNode.insertBefore(span, prv.nextSibling);

            var div = document.createElement('div');
            div.setAttribute('class', 'metadata_portrait');
            div.setAttribute('style', 'top:' + (21 - img1.clientHeight) + 'px;');
            div.innerHTML = "Metadata summary";
            span.parentNode.insertBefore(div, span.nextSibling);

            var div2 = document.createElement('div');
            div2.innerHTML = '<img src="../../imgs/info_circle.png" width="22" height="22"><span class="tooltip_text"><h3>METADATA</h3>Metadata are currently extracted and organized using Drew Noakes\' metadata extractor library for Java. <a target="_blank" style="color: #AF0E09;text-decoration: none;font-weight: bold;position: relative;top: 1px;" href="https://www.drewnoakes.com/code/exif/">Source</a></span>';
            div2.setAttribute('class', 'tooltip');
            div2.setAttribute('style', 'top:' + (-9 - img1.clientHeight) + 'px');
            div.parentNode.insertBefore(div2, div.nextSibling);

        }
        else {
            img1.setAttribute('class', 'original_img_landscape');
            a_select.appendChild(img1);

            var googlep = document.createElement('p');
            googlep.innerHTML = "send this image to <span style='color:#AF0E09;font-weight: bold;'>Google reverse image search</span>";
            googlep.setAttribute('class', 'google_link');
            googlep.setAttribute('style', 'width:350px');
            googlep.setAttribute('data-link', url_to_verify);
            selected_image.appendChild(googlep);

            var table1 = document.createElement('table');
            table1.setAttribute('class', 'flatTable flatTable_landscape');
            table1.setAttribute('id', 'flatTable1');
            table1.innerHTML = "<thead><tr><td>Significant Data</td></tr></thead><tbody></tbody>";
            selected_image.parentNode.insertBefore(table1, selected_image.nextSibling);
            $('.flatTable tbody').css('max-height', img1.clientHeight - 74);
            max_height = img1.clientHeight - 74;

            var next = document.createElement('img');
            next.setAttribute('class', 'next_data next_data_landscape');
            next.setAttribute('src', '../../imgs/nxt-black.png');
            table1.parentNode.insertBefore(next, table1.nextSibling);

            var prv = document.createElement('img');
            prv.setAttribute('class', 'prv_data prv_data_landscape');
            prv.setAttribute('src', '../../imgs/prv-black.png');
            next.parentNode.insertBefore(prv, next.nextSibling);

            var span = document.createElement('span');
            span.setAttribute('class', 'desc_arrow desc_arrow_landscape');
            span.innerHTML = "more metadata fields";
            prv.parentNode.insertBefore(span, prv.nextSibling);

            var div = document.createElement('div');
            div.setAttribute('class', 'metadata_portrait metadata_landscape');
            div.setAttribute('style', 'top:' + (21 - img1.clientHeight) + 'px;');
            div.innerHTML = "Metadata summary";
            span.parentNode.insertBefore(div, span.nextSibling);

            var div2 = document.createElement('div');
            div2.innerHTML = '<img src="../../imgs/info_circle.png" width="22" height="22"><span class="tooltip_text"><h3>METADATA</h3>Metadata are currently extracted and organized using Drew Noakes\' metadata extractor library for Java. <a target="_blank" style="color: #AF0E09;text-decoration: none;font-weight: bold;position: relative;top: 1px;" href="https://www.drewnoakes.com/code/exif/">Source</a></span>';
            div2.setAttribute('class', 'tooltip tooltip_landscape');
            div2.setAttribute('style', 'top:' + (-9 - img1.clientHeight) + 'px');
            div.parentNode.insertBefore(div2, div.nextSibling);
        }
    };

    for (var i = 0; i < 8; i++) {

        var titles = document.getElementById("tiles");
        var li = document.createElement('li');
        titles.appendChild(li);

        var divouter = document.createElement('div');
        divouter.setAttribute('class', 'outer');
        li.appendChild(divouter);

        var p = document.createElement('p');
        p.setAttribute('style', 'text-align:center;margin:0');
        p.innerHTML = "Map " + i;
        divouter.appendChild(p);

        var a = document.createElement('a');
        a.setAttribute('href', "../../imgs/loading_holder.gif");
        a.setAttribute('onclick', 'return false;');
        a.setAttribute('id', "a" + i);
        divouter.appendChild(a);

        var img = document.createElement('img');
        img.setAttribute('src', "../../imgs/loading_holder.gif");
        img.setAttribute('id', "image" + i);
        img.setAttribute('class', "image_comp");
        img.setAttribute('width', '245');
        img.setAttribute('onerror', 'imgError1(this);');
        a.appendChild(img);

        var p = document.createElement('p');
        p.innerHTML = titles_desc[i];
        p.setAttribute('class', 'algorithm_title');
        divouter.appendChild(p);

        var p = document.createElement('p');
        p.setAttribute('class', 'info');
        p.innerHTML = "What does it mean?";
        p.setAttribute('onclick', 'explanation(' + i + ')');
        divouter.appendChild(p);

        if (i === 1) {
            var input = document.createElement('input');
            input.setAttribute('type', 'range');
            input.setAttribute('min', '0');
            input.setAttribute('value', '0');
            input.setAttribute('id', 'slider_range');
            input.setAttribute('step', '1');
            input.setAttribute('list', 'volsettings');
            a.parentNode.insertBefore(input, a.nextSibling);

            var datalist = document.createElement('datalist');
            datalist.setAttribute('id', 'volsettings');
            input.parentNode.insertBefore(datalist, input.nextSibling);

            var min = document.createElement('p');
            min.innerHTML = "<span style='font-weight:bold'>Quality: </span><span id='quality_span'>-</span>";
            min.setAttribute('class', 'quality_wrapper');
            divouter.appendChild(min);
        }
    }

    load_images();

    if (typeof verify_interval !== 'undefined') {
        clearInterval(verify_interval);
    }
    if (typeof report_interval !== 'undefined') {
        clearInterval(report_interval);
    }
    url_to_verify = decodeURIComponent(url_to_verify.replace(/\s/g, "%20"));
    $.ajax({
        type: "GET",
        url: "http://caa.iti.gr/imageforensicsv3/addurl?url=" + encodeURIComponent(url_to_verify.trim()),
        dataType: "jsonp",
        success: function (json) {
            hash = json.hash;
            $.ajax({
                type: "GET",
                url: "http://caa.iti.gr/imageforensicsv3/generatereport?hash=" + hash,
                dataType: "jsonp",
                success: function (json) {
                },
                async: true
            });
            setTimeout(function () {
                lat = 0;
                long = 0;
                has_gps = false, has_thumb = false;
                var count_status = 0, grids_flag = true, gridsinv_flag = true, dq_flag = true, ghost_flag = true, noise_flag = true, ela_flag = true, blk_flag = true, media_flag = true, values_flag = true, gps_flag = true, thumb_flag = true;
                report_interval = setInterval(function () {
                    $.ajax({
                        type: "GET",
                        url: "http://caa.iti.gr/imageforensicsv3/getreport?hash=" + hash,
                        dataType: "jsonp",
                        success: function (data) {
                            if (image_load) {
                                if (count_status === 11) {
                                    $('.alert').slideUp();
                                    clearInterval(report_interval);
                                    $('[data-imagezoom]').imageZoom();
                                    $('#pdf').show();
                                }
                                if (data.metadataObjectReport.completed && values_flag) {
                                    values = data.metadataObjectReport.values;
                                    ghosts_qualities = data.ghostReport.qualities;
                                    if (values.length > 0) {
                                        meta1 = "Not found";
                                        meta2 = "Not found";
                                        meta3 = "Not found";
                                        meta4 = "Not found";
                                        meta5 = "Not found";
                                        meta6 = "Not found";
                                        meta7 = "Not found";
                                        meta8 = "Not found";
                                        meta9 = "Not found";
                                        meta10 = "Not found";
                                        meta11 = "Not found";
                                        meta12 = "Not found";
                                        meta13 = "Not found";
                                        meta14 = "Not found";
                                        meta15 = "Not found";
                                        meta16 = "Not found";
                                        meta17 = "Not found";
                                        meta18 = "Not found";
                                        meta19 = "Not found";
                                        meta20 = "Not found";
                                        meta21 = "Not found";
                                        meta22 = "Not found";
                                        meta23 = "Not found";
                                        meta24 = "Not found";
                                        meta25 = "Not found";
                                        meta26 = "Not found";
                                        meta27 = "Not found";
                                        meta28 = "Not found";
                                        meta29 = "Not found";

                                        for (var i = 0; i < values.length; i++) {
                                            switch (values[i].name) {
                                                case "Exif IFD0":
                                                    for (var k = 0; k < values[i].values.length; k++) {
                                                        switch (values[i].values[k].name) {
                                                            case "Date/Time":
                                                                meta1 = values[i].values[k].value;
                                                                break;
                                                            case "Gain Control":
                                                                meta2 = values[i].values[k].value;
                                                                break;
                                                            case "Image Description":
                                                                meta3 = values[i].values[k].value;
                                                                break;
                                                            case "Image Height":
                                                                meta4 = values[i].values[k].value;
                                                                break;
                                                            case "Image Width":
                                                                meta5 = values[i].values[k].value;
                                                                break;
                                                            case "Make":
                                                                meta6 = values[i].values[k].value;
                                                                break;
                                                            case "Model":
                                                                meta7 = values[i].values[k].value;
                                                                break;
                                                            case "Software":
                                                                meta8 = values[i].values[k].value;
                                                                break;
                                                        }
                                                    }
                                                    break;
                                                case "Exif SubIFD":
                                                    for (var k = 0; k < values[i].values.length; k++) {
                                                        switch (values[i].values[k].name) {
                                                            case "Aperture Value":
                                                                meta9 = values[i].values[k].value;
                                                                break;
                                                            case "Artist":
                                                                meta10 = values[i].values[k].value;
                                                                break;
                                                            case "Body Serial Number":
                                                                meta11 = values[i].values[k].value;
                                                                break;
                                                            case "Copyright":
                                                                meta12 = values[i].values[k].value;
                                                                break;
                                                            case "Date/Time Original":
                                                                meta13 = values[i].values[k].value;
                                                                break;
                                                            case "Exif Image Height":
                                                                meta14 = values[i].values[k].value;
                                                                break;
                                                            case "Exif Image Width":
                                                                meta15 = values[i].values[k].value;
                                                                break;
                                                            case "Image Description":
                                                                meta16 = values[i].values[k].value;
                                                                break;
                                                            case "Shutter Speed Value":
                                                                meta17 = values[i].values[k].value;
                                                                break;
                                                        }
                                                    }
                                                    break;
                                                case "File":
                                                    for (var k = 0; k < values[i].values.length; k++) {
                                                        switch (values[i].values[k].name) {
                                                            case "File Modified Date":
                                                                meta18 = values[i].values[k].value;
                                                                break;
                                                            case "File Name":
                                                                meta19 = values[i].values[k].value;
                                                                break;
                                                        }
                                                    }
                                                    break;
                                                case "GPS":
                                                    for (var k = 0; k < values[i].values.length; k++) {
                                                        switch (values[i].values[k].name) {
                                                            case "GPS Altitude":
                                                                meta20 = values[i].values[k].value;
                                                                break;
                                                            case "GPS Altitude Ref":
                                                                meta21 = values[i].values[k].value;
                                                                break;
                                                            case "GPS Date Stamp":
                                                                meta22 = values[i].values[k].value;
                                                                break;
                                                            case "GPS Latitude":
                                                                meta23 = values[i].values[k].value;
                                                                break;
                                                            case "GPS Latitude Ref":
                                                                meta24 = values[i].values[k].value;
                                                                break;
                                                            case "GPS Longitude":
                                                                meta25 = values[i].values[k].value;
                                                                break;
                                                            case "GPS Longitude Ref":
                                                                meta26 = values[i].values[k].value;
                                                                break;
                                                            case "GPS Time-Stamp":
                                                                meta27 = values[i].values[k].value;
                                                                break;
                                                        }
                                                    }
                                                    break;
                                                case "Xmp":
                                                    for (var k = 0; k < values[i].values.length; k++) {
                                                        switch (values[i].values[k].name) {
                                                            case "Lens":
                                                                meta28 = values[i].values[k].value;
                                                                break;
                                                            case "Serial Number":
                                                                meta29 = values[i].values[k].value;
                                                                break;
                                                        }
                                                    }
                                                    break;
                                            }
                                        }

                                        var $flattable = $('#flatTable1');
                                        $flattable.find('tbody').append('<p class="table_title"><span style="float: left;width: 7%;">description</span>|&nbsp;&nbsp;&nbsp;&nbsp; value</p>');
                                        $flattable.find('tbody').append('<p class="table_title_main">Exif IFD0</p>');
                                        $flattable.append('<tr><td>Date/Time</td><td>' + meta1 + '</td></tr>');
                                        $flattable.append('<tr><td>Gain Control</td><td>' + meta2 + '</td></tr>');
                                        $flattable.append('<tr><td>Image Description</td><td>' + meta3 + '</td></tr>');
                                        $flattable.append('<tr><td>Image Height</td><td>' + meta4 + '</td></tr>');
                                        $flattable.append('<tr><td>Image Width</td><td>' + meta5 + '</td></tr>');
                                        $flattable.append('<tr><td>Make</td><td>' + meta6 + '</td></tr>');
                                        $flattable.append('<tr><td>Model</td><td>' + meta7 + '</td></tr>');
                                        $flattable.append('<tr><td>Software</td><td>' + meta8 + '</td></tr>');

                                        $flattable.find('tbody').append('<p class="table_title_main">Exif SubIFD</p>');
                                        $flattable.append('<tr><td>Aperture Value</td><td>' + meta9 + '</td></tr>');
                                        $flattable.append('<tr><td>Artist</td><td>' + meta10 + '</td></tr>');
                                        $flattable.append('<tr><td>Body Serial Number</td><td>' + meta11 + '</td></tr>');
                                        $flattable.append('<tr><td>Copyright</td><td>' + meta12 + '</td></tr>');
                                        $flattable.append('<tr><td>Date/Time Original</td><td>' + meta13 + '</td></tr>');
                                        $flattable.append('<tr><td>Exif Image Height</td><td>' + meta14 + '</td></tr>');
                                        $flattable.append('<tr><td>Exif Image Width</td><td>' + meta15 + '</td></tr>');
                                        $flattable.append('<tr><td>Image Description</td><td>' + meta16 + '</td></tr>');
                                        $flattable.append('<tr><td>Shutter Speed Value</td><td>' + meta17 + '</td></tr>');

                                        $flattable.find('tbody').append('<p class="table_title_main">File</p>');
                                        $flattable.append('<tr><td>File Modified Date</td><td>' + meta18 + '</td></tr>');
                                        $flattable.append('<tr><td>File Name</td><td>' + meta19 + '</td></tr>');

                                        $flattable.find('tbody').append('<p class="table_title_main">GPS</p>');
                                        $flattable.append('<tr><td>GPS Altitude</td><td>' + meta20 + '</td></tr>');
                                        $flattable.append('<tr><td>GPS Altitude Ref</td><td>' + meta21 + '</td></tr>');
                                        $flattable.append('<tr><td>GPS Date Stamp</td><td>' + meta22 + '</td></tr>');
                                        $flattable.append('<tr><td>GPS Latitude</td><td>' + meta23 + '</td></tr>');
                                        $flattable.append('<tr><td>GPS Latitude Ref</td><td>' + meta24 + '</td></tr>');
                                        $flattable.append('<tr><td>GPS Longitude</td><td>' + meta25 + '</td></tr>');
                                        $flattable.append('<tr><td>GPS Longitude Ref</td><td>' + meta26 + '</td></tr>');
                                        $flattable.append('<tr><td>GPS Time-Stamp</td><td>' + meta27 + '</td></tr>');

                                        $flattable.find('tbody').append('<p class="table_title_main">Xmp</p>');
                                        $flattable.append('<tr><td>Lens</td><td>' + meta28 + '</td></tr>');
                                        $flattable.append('<tr><td>Serial Number</td><td>' + meta29 + '</td></tr>');

                                        if ($('.original_img').length > 0) {
                                            var table_fit = Math.floor(($(window).width() - 330) / 350) - 1;
                                            for (var kl = 1; kl <= values.length; kl++) {
                                                $('#flatTable' + kl).after('<table class="flatTable" id="flatTable' + (kl + 1) + '"><thead><tr><td>' + values[kl - 1].name + '</td></tr></thead><tbody style="max-height:' + max_height + 'px;"></tbody></table>');
                                                $('#flatTable' + (kl + 1)).find('tbody').prepend('<p class="table_title"><span style="float: left;width: 7%;">description</span>|&nbsp;&nbsp;&nbsp;&nbsp; value</p>');
                                                for (var ml = 0; ml < values[kl - 1].values.length; ml++) {
                                                    $('#flatTable' + (kl + 1) + ' tbody').append('<tr><td>' + values[kl - 1].values[ml].name + '</td><td>' + values[kl - 1].values[ml].value + '</td></tr>')
                                                }
                                            }
                                            if (table_fit < values.length) {
                                                $('.flatTable:gt(' + table_fit + ')').hide();
                                                $('.next_data').css('visibility', 'visible');
                                            }
                                        }
                                        else {
                                            var table_fit = Math.floor(($(window).width() - 430) / 350) - 1;
                                            for (var kl = 1; kl <= values.length; kl++) {
                                                $('#flatTable' + kl).after('<table class="flatTable flatTable_landscape" id="flatTable' + (kl + 1) + '"><thead><tr><td>' + values[kl - 1].name + '</td></tr></thead><tbody style="max-height:' + max_height + 'px;"></tbody></table>');
                                                $('#flatTable' + (kl + 1)).find('tbody').prepend('<p class="table_title"><span style="float: left;width: 7%;">description</span>|&nbsp;&nbsp;&nbsp;&nbsp; value</p>');
                                                for (var ml = 0; ml < values[kl - 1].values.length; ml++) {
                                                    $('#flatTable' + (kl + 1) + ' tbody').append('<tr><td>' + values[kl - 1].values[ml].name + '</td><td>' + values[kl - 1].values[ml].value + '</td></tr>')
                                                }
                                            }
                                            if (table_fit < values.length) {
                                                $('.flatTable:gt(' + table_fit + ')').hide();
                                                $('.next_data').css('visibility', 'visible');
                                            }
                                        }
                                    }
                                    else {
                                        $('.tooltip,.desc_arrow').css('visibility', 'hidden');
                                        $('.flatTable thead td').text("Metadata for this image couldn't be extracted");
                                        $('.flatTable thead tr').css('width','380px');
                                    }
                                    values_flag = false;
                                    count_status++;
                                }
                                if (data.dqReport.completed && dq_flag) {

                                    $('#image0').attr("src", data.dqReport.map);
                                    $('#a0').attr("href", data.dqReport.map);

                                    load_images();
                                    dq_flag = false;
                                    count_status++;
                                }
                                if (data.gridsReport.completed && grids_flag) {

                                    $('#image6').attr("src", data.gridsReport.map);
                                    $('#a6').attr("href", data.gridsReport.map);

                                    load_images();
                                    grids_flag = false;
                                    count_status++;
                                }
                                if (data.gridsInversedReport.completed && gridsinv_flag) {

                                    $('#image7').attr("src", data.gridsInversedReport.map);
                                    $('#a7').attr("href", data.gridsInversedReport.map);

                                    load_images();
                                    gridsinv_flag = false;
                                    count_status++;
                                }
                                if (data.ghostReport.completed && ghost_flag) {
                                    ghosts = [];
                                    ghosts_qualities = [];

                                    var thumb = data.ghostReport.maps[0];
                                    var quality = data.ghostReport.qualities[0];

                                    ghosts.push(thumb);
                                    ghosts_qualities.push(quality);

                                    $('#image1').attr("src", thumb).css('cursor', 'crosshair');
                                    $('#image1').attr('data-imagezoom', 'true');
                                    $('#image1').attr('data-zoomviewborder', '6px solid #000');
                                    $('#image1').attr('data-magnification', '5');
                                    $('#a1').attr("href", thumb);
                                    $('#quality_span').html(quality);

                                    for (var i = 1; i < data.ghostReport.maps.length; i++) {
                                        thumb = data.ghostReport.maps[i];
                                        quality = data.ghostReport.qualities[i];
                                        ghosts.push(thumb);
                                        ghosts_qualities.push(quality);
                                        datalist.innerHTML = datalist.innerHTML + "<option>" + i + "</option>"
                                    }
                                    $('#slider_range').val('0');
                                    $('#slider_range').attr('max', data.ghostReport.maps.length - 1);

                                    if (ghosts.length > 1) {
                                        if (typeof verify_interval !== 'undefined') {
                                            clearInterval(verify_interval);
                                        }
                                        count_imgs = 0;
                                        var len = ghosts.length;
                                        verify_interval = setInterval(function () {
                                            if (!isPaused) {
                                                $('#image1').attr('src', ghosts[count_imgs % len]);
                                                $('#quality_span').html(" " + ghosts_qualities[count_imgs % len]);
                                                $('#slider_range').val(count_imgs % len);
                                                count_imgs++;
                                            }
                                        }, 1000);
                                    }

                                    load_images();

                                    ghost_flag = false;
                                    count_status++;
                                }
                                if (data.dwNoiseReport.completed && noise_flag) {

                                    $('#image5').attr("src", data.dwNoiseReport.map);
                                    $('#a5').attr("href", data.dwNoiseReport.map);

                                    load_images();
                                    noise_flag = false;
                                    count_status++;
                                }
                                if (data.elaReport.completed && ela_flag) {

                                    $('#image3').attr("src", data.elaReport.map).css('cursor', 'crosshair');
                                    $('#image3').attr('data-imagezoom', 'true');
                                    $('#image3').attr('data-zoomviewborder', '6px solid #000');
                                    $('#image3').attr('data-magnification', '5');
                                    $('#a3').attr("href", data.elaReport.map);

                                    load_images();
                                    ela_flag = false;
                                    count_status++;
                                }
                                if (data.blockingReport.completed && blk_flag) {

                                    $('#image2').attr("src", data.blockingReport.map);
                                    $('#a2').attr("href", data.blockingReport.map);

                                    load_images();
                                    blk_flag = false;
                                    count_status++;
                                }
                                if (data.medianNoiseReport.completed && media_flag) {

                                    $('#image4').attr("src", data.medianNoiseReport.map).css('cursor', 'crosshair');
                                    $('#image4').attr('data-imagezoom', 'true');
                                    $('#image4').attr('data-zoomviewborder', '6px solid #000');
                                    $('#image4').attr('data-magnification', '5');
                                    $('#a4').attr("href", data.medianNoiseReport.map);

                                    load_images(0, "media", 0);
                                    media_flag = false;
                                    count_status++;
                                }
                                if (data.gpsReport.completed && gps_flag) {
                                    if (data.gpsReport.exists) {
                                        lat = data.gpsReport.latitude;
                                        long = data.gpsReport.longitude;
                                        has_gps = true;
                                    }
                                    if (!values_flag) {
                                        gps_flag = false;
                                        count_status++;
                                        if (has_gps) {
                                            $('.metadata_portrait').html($('.metadata_portrait').html() + "<img src='../../imgs/marker-16-black.png' class='gps' data-lat=" + lat + " data-long=" + long + ">");
                                        }
                                    }
                                }
                                if (data.dqReport && thumb_flag) {
                                    if (data.thumbnailReport.numberOfThumbnails > 0) {
                                        has_thumb = true;
                                    }
                                    if (!values_flag) {
                                        thumbnail_global = data.thumbnailReport.thumbnailList[0];
                                        thumb_flag = false;
                                        count_status++;
                                        if (has_thumb) {
                                            $('.metadata_portrait').html($('.metadata_portrait').html() + "<img src='../../imgs/thumb-16.png' class='thumb' data-src=" + thumbnail_global + ">");
                                        }
                                    }
                                }
                                if (data.status === "completed") {
                                    $('#pdf').show();
                                    $('.alert').slideUp();
                                    count_status = 11;
                                    clearInterval(report_interval);
                                    if (values_flag) {
                                        $('.metadata_portrait,.flatTable,.tooltip').css('visibility', 'hidden');
                                    }
                                    if (dq_flag) {
                                        $('#a0').hide();
                                        $('<p class="error_map">'+data.dqReport.message+'</p>').insertBefore('#a0');
                                    }
                                    if (ghost_flag) {
                                        $('#a1,#slider_range,.quality_wrapper').hide();
                                        $('<p class="error_map">'+data.ghostReport.message+'</p>').insertBefore('#a1');
                                    }
                                    if (noise_flag) {
                                        $('#a5').hide();
                                        $('<p class="error_map">'+data.dwNoiseReport.message+'</p>').insertBefore('#a5');
                                    }
                                    if (ela_flag) {
                                        $('#a3').hide();
                                        $('<p class="error_map">'+data.elaReport.message+'</p>').insertBefore('#a3');
                                    }
                                    if (blk_flag) {
                                        $('#a2').hide();
                                        $('<p class="error_map">'+data.blockingReport.message+'</p>').insertBefore('#a2');
                                    }
                                    if (media_flag) {
                                        $('#a4').hide();
                                        $('<p class="error_map">'+data.medianNoiseReport.message+'</p>').insertBefore('#a4');
                                    }
                                    if (grids_flag) {
                                        $('#a6').hide();
                                        $('<p class="error_map">'+data.gridsReport.message+'</p>').insertBefore('#a6');
                                    }
                                    if (gridsinv_flag) {
                                        $('#a7').hide();
                                        $('<p class="error_map">'+data.gridsInversedReport.message+'</p>').insertBefore('#a7');
                                    }
                                }
                            }
                        },
                        async: true
                    });

                }, 1000);
            }, 2000);
        },
        async: true
    });

}

function imgError1(image) {
    image.onerror = "";
    image.src = "../../imgs/image_error.png";
    return true;
}
function explanation(index) {
    $('#myModal' + (index + 5)).reveal();//+5 cause of the html structure
}

$(document).on("click", ".next_data", function () {
    $('.prv_data').css('visibility', 'visible');
    if (parseInt($(".flatTable:visible:last").next('.flatTable').attr('id').substring(9)) === values.length + 1) {
        $('.next_data').css('visibility', 'hidden');
    }
    $(".flatTable:visible").eq(0).animate({width: 'toggle'}, 350);
    $(".flatTable:visible:last").next('.flatTable').animate({width: 'toggle'}, 350);
});
$(document).on("click", ".prv_data", function () {
    $('.next_data').css('visibility', 'visible');

    if (parseInt($(".flatTable:visible:first").prev('.flatTable').attr('id').substring(9)) === 1) {
        $('.prv_data').css('visibility', 'hidden');
    }
    $(".flatTable:visible:last").animate({width: 'toggle'}, 350);
    $(".flatTable:visible:first").prev('.flatTable').animate({width: 'toggle'}, 350);

});
var map;
$(document).on("click", ".gps", function () {
    if (map) {
        map.remove();
    }
    var lat = $(this).data("lat");
    var long = $(this).data("long");
    L.mapbox.accessToken = 'pk.eyJ1IjoibGFhcG9zdG8iLCJhIjoic21tVGtEQSJ9.tH3Q3MuElddX8xe26KkoHw';
    map = L.mapbox.map('map_gps')
        .setView([lat, long], 13)
        .addLayer(L.mapbox.tileLayer('mapbox.streets'));

    L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
                long,
                lat
            ]
        },
        properties: {
            'marker-size': 'large',
            'marker-color': '#a90f0a',
            'marker-symbol': 'camera'
        }
    }).addTo(map);
    $('#map_modal').reveal();
});

$(document).on("click", ".thumb", function () {
    $("#thumb2").attr("src", $(this).data('src'));
    $('#thumb2').attr('data-imagezoom', 'true');
    $('#thumb2').attr('data-zoomviewborder', '6px solid #000');
    $('#thumb2').attr('data-magnification', '10');
    if ($('.original_img_landscape').length === 1) {
        $("#thumb1").css('width', '350px').attr("src", url_to_verify);
        $('#thumb1').attr('data-imagezoom', 'true');
        $('#thumb1').attr('data-zoomviewborder', '6px solid #000');
        $('#thumb1').attr('data-magnification', '5');
        $("#full_desc").css('width', '350px');
    }
    else {
        $("#thumb1").css('width', '250px').attr("src", url_to_verify);
        $('#thumb1').attr('data-imagezoom', 'true');
        $('#thumb1').attr('data-zoomviewborder', '6px solid #000');
        $('#thumb1').attr('data-magnification', '5');
        $("#full_desc").css('width', '250px');
    }
    $("#thumb2").one("load", function () {
        var wd = $("#thumb2").width();
        if (wd < 101) {
            $("#thumb2").css({
                'margin-top': ($("#thumb1").height() / 2) - ($("#thumb2").height() / 2),
                'padding-right': 101 - wd - (wd / 2)
            });
            wd = 101;
        }
        else {
            $("#thumb2").css('margin-top', ($("#thumb1").height() / 2) - ($("#thumb2").height() / 2));
        }
        var all_width = $("#thumb1").width() + wd + 110;
        $("#thumb_desc").css('width', wd);
        $('#thumb_modal').css("margin-left", all_width / -2).reveal();
    }).each(function () {
        if (this.complete) $(this).load();
    });
});

$('.close_info').click(function (e) {
    e.preventDefault();
    $(this).parent().slideUp();
});

$(document).on('mouseenter', '#slider_range,#image1', function () {
    if (typeof verify_interval !== 'undefined') {
        isPaused = true;
    }
}).on('mouseleave', '#slider_range,#image1', function () {
    if (typeof verify_interval !== 'undefined') {
        isPaused = false;
    }
});

$(document).on("click", ".image_comp", function () {
    $("#left_image").attr("src", url_to_verify);
    $("#right_image").attr("src", $(this).attr('src'));
    $('.slider').slider();
    $('#compare_modal').reveal();
    $('#right_image').height(($('#left_image').height()));
});

$(document).on("click", ".google_link", function () {
    window.open('https://www.google.com/searchbyimage?&image_url=' + $(this).attr('data-link'), '_blank');
});

$(document).on("input change", '#slider_range', function (e) {
    $('#image1').attr('src', ghosts[$("#slider_range").val()]);
    $('#quality_span').html(" " + ghosts_qualities[$("#slider_range").val()]);
    count_imgs = $("#slider_range").val();
});

function generate_pdf() {
    $('#user_text_wrapper').css('display', 'inline-block');
    $('#pdf').hide();
}
function download_pdf() {
    $('#loading_pdf').show();
    $("#download").hide();
    $.ajax({
        type: "GET",
        url: "http://caa.iti.gr/imageforensics/getreportbase64?hash=" + hash,
        dataType: "jsonp",
        success: function (json) {
            $('#loading_pdf').hide();
            $("#download").show();
            var text = $('#user_text').val();
            if (text === "") {
                text = "Take a look at this image"
            }
            var error_image = 'data:image/png;base64,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';

            var reveal_logo = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABaAAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0Q0RTc2MUM0M0ZBMTFFMzk0NDdFQzlGNzQ4MDg0RDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0Q0RTc2MUQ0M0ZBMTFFMzk0NDdFQzlGNzQ4MDg0RDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1QkM4RTM3RjQzOUYxMUUzOTQ0N0VDOUY3NDgwODREMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1QkM4RTM4MDQzOUYxMUUzOTQ0N0VDOUY3NDgwODREMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAEBAQEBAQEBAQECAQEBAgICAQECAgICAgICAgIDAgMDAwMCAwMEBAQEBAMFBQUFBQUHBwcHBwgICAgICAgICAgBAQEBAgICBQMDBQcFBAUHCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICP/AABEIAD4AyAMBEQACEQEDEQH/xAC9AAADAQEAAwEBAAAAAAAAAAAACQoLCAMFBwYEAQEAAgIDAQEBAAAAAAAAAAAAAQIDBwQICQYFChAAAAUDAgQDAgkJBQkAAAAAAQIDBAUGBwgAESESCQoxExQiFUFRYXEytBZ2F4GRI3M0dDYYObFCcrU3oZIzJNWWWBkaEQACAQIDBQUFAwcNAQAAAAAAAQIRAyEEBTESEwYHQVFhcSKBkXIUCKHBFfDhQlIjFgmx0fEyYoKSokNTY3OTF//aAAwDAQACEQMRAD8Arh6j/U7x56X1tqJuXkFD1NUbG4kovD0nBUtHsH79Z42ZHfHFQJJ9HpETApQATCoI7iHAeO0N0BOrcHvHbQsTOCWqwfqSqS8fSuqhrCMgB8eAnSjY6Y/MB/y6pxCaHL1Q943fRyJvsphLScKA/QCQqyYk9vn9MyYb6cQUPmrjvB81TKCLTF+1qKW/Ain2sVNt85ZVP+zUb4oe3iu8Ny3ROUZvE23MgmH0ytX1TMxH5hWdOtvzab4ofbqW7yeqEl25K1wFYPmw8HTiLuI4anD5SJu6fcAPzCf8up4godpWz7vrCCoFW7a6mO1yrbqLbAq9ji07UjNEREAETmM/jVhKHjuVER+TU76FCs9s4QeN0HbVYrhq6IVRsuQQMQ6ZygYpiiHiAgO4auQebQBoA0AaANAGgDQBoA0AaANAGgDQBoA0BNlUPdTdMGmZ+cpuSjLnBI088dMX/JSMfyec0XM3Py88uU23MQdtwAfjANU30B7GMuQ9AZZWFthkbaxKQRt7duNLK0qlKtSspEGpllEA89AiipSG5kx4AcQ22EB1ZMEZneQ3FWWqnBW0qCvK3jY+uKik0A39s75zERjYw/4QaLgH+IdUuEoiKeqqIoc6Y8phUSLvtvwOqUg+PyDrGDUTt12y3RhiISHeyWK7+ulXbVBU6tQ17XUgcxlUinETAjKt0xHj8BAD5A1m3UQfr6m7aTor1FHqMmuGjej1jgIFlIOr67jnRNw23AycyJdw+MSjpuoCLOoV2j/2Soupbn9Nq6kzV89BJKu/5Yq8etHKkqkQnmHQhqhKk3Ok5Hl2RSfFOQ4jsZZPx1DgSRRO2chGvZCKmIp3AzUO5cMpyAkGyrOQj3zNczZy1dN1wKdFdBUhk1EzBuUwCA+GsQPBoDZowVrk9zsJcQLirOwfOa4thQUq9dAO/O4fUsxcKiPy85zAPy6zog6q1IDQBoA0AaANAGgDQBoA0AaANAGgDQBoDPT7lvpi4a4JUDj3cjGm3D2i6xvRVlTEuBJuahnJgjsiTJB+AFSlnTgiX6Vcw7pgX4uIbbYpokrZ6IH9JrBT7jNfrrnV47CCQXu+qoTkM+sfqSTU5vs1aVg6XJ8BVJOrp0u3+61KOqTJRJXJfsofrm/1gmqA3A6V/hinP3Bn9XJrkEGQ+16mfUXsXkfdCvrX5wXMi52DreqQbRUrVktUkA5RY1M8TRbO4eoVnjJZuBUylFPyg4BsAh46xOVGSajHTRy6eZ5YHYw5bytPIUpP3oppF9VdPNTHMzazTJytESRWwqiY4IeraKikBzCYCCAGERARHImQZ3ncx2cpWzvWDvY4o+PRiGN7KWo2vJyMbkKmiE3JN3cE/X5SgGx3J4gq6o/3lDmMPEwjrHPaSIW1QGtz0OqmPVvSXwWlVFBVM0olCMAw8diwkg6hih+QGoBrNHYQNZ1YBoA0AaANAJv63uc9xcFsRomrLK1M2pi81yKnj4KjpNdkzkjtWhG7iSfuSNpBNZE3Km3KkInIYAFUOG+wh8F1E5ju6bkVK06XJSSWFfFvH8sTtN9I/R/I84czSs5+DnlLNqU5pNxq6qMU3Fp4tt4NV3WRkuutJ1QnjszxbL+oCLGEREiTGn0Etx+JJCPIQA+Tl1oKXUDWG68Z+5fzHqpb+lHp5CO6tPt08XNv3udSvjoTXSzpyGx1qbIPL+8C1f0hW78WNioFzCwMe6BjEqqtn8mo5iWjZRVNdzu3SIrxL5BzcQOUdb06b53Us1lXfzU96MnSKolgtrql2vD2HmJ9YnLvJ+h65DTdFy6tXbUa3pKc5KsknGCUpNJqPqbW3eS2pjztbGOoAaANAGgDQBoA0BGh3jf+hOE33tqv/J2WscyUPc6IH9JrBT7jNfrrnVo7CCKjuxHR3HVKiET/AEWNraRSS/wjKTK/9qg6pPaSiYiS/ZQ/XN/rBNUBuB0r/DFOfuDP6uTXIIMf2wOBWWfUEyuu7aTFa072sZH7e1enVlxniLhlRlKN1KpemM6mZY6YoplIQROVunzuFduVJMxhDWJxqyTVcwuxmt5088KbKY1RtXEWoPG+lCtZ+4UqoiwQXO3KrKSso5Mqfy2ySjhVdwYDH5UijsJhAu+shBlwdYjNWneoF1Gcg8kaCcKObSKKRtJWVeqEMmL6l6TbmYpSJSKAU5SSDo7h4kU4AYElSAYAHcNYpPEkWgAgPhqoNWPt1nij3o24ZHV+kg0rJEBHjuVG4c8mX/YABrNHYQe36l/XIw26ZsgW31eO5C7d/wB01TdtrIUwLVR6xQcEBRBWXduTlRYEVKIHIU3OsYogcqQkEDaOVAJEtr3jlvJSu2sfdzB6Wou2zpcpHFTwNatahl2aAn28wY99ERKSwgHESg5J8m+q8QmhW/jpkhZnLazNI35x6r1pcC2ddNzKwNRNyqFMksmIpqt3TdYE1UHCBwEiqKhSnKYNhANXrUKlcSO2+/cIdTbH2+tzrNV5bm1rGpLVz0hCzkUSnqkFsqZg6MkCqSh54FDJLEAFEj7hzEMBg8ddd9S6oaxlczK1ONusG08H2f3j105O+iTp/rej2c9l72adu/CM09+3VbyrRrhUqng12NNFcmFGRzbLjFKxWRiDJCMdXSgGzyoIpqY5mrOZbnOwk26IqGOYU0XjdZMnMIm2AN+O+t4cvaqs9krd/ZvLHz2P7anmb1Z5ElyzzJmtMbclYuNRb2uD9UG/FwabphXYSId0Hfkawyhsnj9HvCrRVlqWWl5lIhg3TmqtdgJ0lAD4SM45scu/gCo7ePHRvWLUuJnIWFshGvtl+ZL3npv/AA9eTfleXszqUlSWZuqK+C0tq85Tkn8IjbCLFKsc1snbVY7Uf5rQa1flNVtRpp+YWGp9mHqZJ+cDbF3RblN5ZTCAHVEie+5w1rrl3RbmoZyFiP6Txfcu1+77cDt71c6kZXlPl6/qd+j4cfTH9ebwhH2ypVrZGstiNIq+mRGJHTDxhgajuzVrKz1kbXRzCnbfwJQVdPnwsGPksouMap867t0ZJDgAb8AMooYpAOcO5GVy1uxajbgqRikkvBH87uua1mdSztzN5iW/euylOT75SdW/eyXe4/eP0DHVgqztJgxLVbQSC4lSqCoK3aQEq5bgbbm9DHxEukiYQ47epPrJxD8ug/DpjdZLE/qiwsxH2pdPbe3qpBqDytrE1ALcsu3ZeYRAz5is3MZJ8yBQ5SGVT2OQTFBVNPnJzWUqkDaNWBNRn73O+GGH1c1DaGz9KSOWt0aTXWZ1UpCSDaHpKOfIGFNVqeaXRdi4WTMGx/StlUwHcoqAcBKFHMHJmMnd7481/WkdS+UOM81j7T0sumgnciEnS1pHsQUMBfNftPd0W6IiTxMZuRc/xJjopk0GX4ddeWw2bGelZYQ2ktdKu29OBU68DfZOYinlPzkfTigFI9apNt1PJeFEp0R5hECmDmAB3AJUqkD29WBGh3jf+hOE33tqv/J2WscyUPc6IH9JrBT7jNfrrnVo7CCLDuymB2fVFp1wYuwStqaTcJj8YFmZ1rv+dEdUntJRMBJfsofrm/1gmqA3A6V/hinP3Bn9XJrkEEZ/a/8AUkRXutk/0xboyDdm8iqzuJWmKj0SJImeMBqx8tUcGJg5RUWbqnCQQ4GOZNRxuIERKAVTB333StjMlbrdN+Zrew9x52NoWyb/AN95N2QiVRQa1rQpwTI6Wdi3KC6xYZQhHpmwnBFRIFTKFOYiWyQJE+iF0pojPWvpe/WSEU7b4TWtdqxbhmgoq2c3Bqk6HGNYqoiUwMYwqpHD5Yohufy0Cjuc4lwydDnZTLb7q9gozJSwddYmZHXqxkuYU/2wsxPu4pSQOUpSykWY3qYuTS5BEBSfMlElyGDgPMO3hqTjXLbjJpmkF0oLzfym9uRbfIQ0WWYdWbt1c+r4+EUExU3ztlVNRyrVucxRAQKspyEEQ8AHfWWOwxEf3Sttlh9lRkFf3NXq8ZHRkdau37xKaqiAn5k7aZuTWdSOHTzyytIreQdNmxG6izhFkmBhEyJA2S5yjjj4knVnVE6nHRfu5aWocfsOumdBLSTVBZtRWSKERGW1Xh3fkiVF8zRgW5n8gQp+UTIyBkin2HnIPAdS2gdhdpVMZkUBdC6tFSNmqvVwsvLDnmG9yHUW7bUxG1lF+URs5aO33lIq+taAo3XBt5hzGI3E+xCbhMAz6F3OGJQ0Ffy2eXdMxQp05fRiEDcR0kkIJpVRT7chGqqynAOd5HAUiZfH/lTiPjrr31f0ThZmOZisJqj+JbPev5D1y/h+9S/ndFvaLdl+0yst+2q/6c36kl3RnVv/ALEhgna+X/GsMZr247ybwVpOy1SoTNPpHUDcsLVrYw+UkQePKk8j3ChxDgArBv4hv9P0d1PiZOdh7YSqvKX50/eaU/iFclfK8wZbU4L05m24S+O09r84Sil8JKN1Fr8GyXziycvOm5K7iqpquQb0s5IYDlUg4USwUWYBDcOLNmiI7cN/DWleatS+b1G7d7HJ08lgvsSPSDoZyd+AcoZLItUlC1Fy+Ofrn/nkyu3txsEhsXjtK5a17DeludksgmSiCLJiVeNoRusCzcQ5yFMUZNcgOjbCYp0SNjBsO4a3l0p5b+WyrzM167uzwj+d4+VDzJ+uzrF+Ma5HRsvKuXyb9dNkrzVH/wCa9HY1J3F3E2PW/u5VHUU61kdiJOXUj7XWTszPRdvKZqeceIMYKmiLpNXlUTrv1rhFDzAW80DGE5BUSbok3AQDW1JYs6HDBLm5t9tT0/LVr2GsJiXAZ91gxbGYT1VuKei5k0k6BIQUcPavqloYf0ph3A0WiokQR/RkIAAATVIE42Gda5EOuohSmSHTVxXqNhL0TVaM5S9haUUnarbRUE5OKLuFeyq6RlfQOmxlmyq7kS7JnHcwCG+qraC+HuIs0q2xI6YNVzVunj2ibl5GScXQFPSxDFSkYRGeYO5OUUKdIxvLXBgwcNyqJn5k1FCnIYDFAdZJvAgTR23XRZxivPje0zqywt0wvdI3ClZVlZe3M2l6unI6KgnykQ4fumRx8p44XeILplIuU6ZCJgYCic+5awiSPPz16DeAmYNlqtpWhrAUjjrehBg4Na27NGwbCmRYy6aRjNQkW0Iigi9ZnPsRdNVMxuQRFMxFAKYLOKII8+16g5Smer61pucaCwmqfo2vGMuxMICZF00KggqmIlEQ3Kcghw1SG0k0v9ZSCNDvG/8AQnCb721X/k7LWOZKHudED+k1gp9xmv11zq0dhBJD3gtNlaZtYyVaVHlGetaWPOtt9MYurJZfbf4RAH4apMlEh8l+yh+ub/WCaoDcDpX+GKc/cGf1cmuQQYxcPeW5OOeX0tkDZua+z91rK3Uqao6CkzCcERfR9WvzC3clIYnO1dJGO3cJiOx0lDlHgOsLeJJqX2zzqt1nJh3Zm/NqUknVJ5G0+sE3S7oE3fuh2CZoyfhpAghymVZLeY3VKIbGDlMHsmAdZJSoqmWxZc5UR8utZa+3djrZULZi0NJtqCtXbJj7toSjGfP6dg0FZR0cOZUxjqKKqqnUVVUMY5zmETCI64jPoYxSVFsE1dcTCvBq/Fv6Pu/klf8AYYiZEUcwCOtVdArAZ6Wq6DIv55IV7TbI5Hsi2SOqYzZ0iJBbiYxecSeyXiZ7VLGThv3pKMft9i/JH7vLPIeqcxZpZfT7Tu3NlVhGPxSeC8sX3Jjf8LsVCXY6D9tsQW1RFAl37Iy0HA1ko0VZpA4qprILM5A7U5lFEyc7pNYUhMYwB7IiI8dczIZuOYy8biVFNJqviqnzfNfL1zSNTvZG5JSnYuStyca7rcG4ulaOlVhVIzhbC48Wpb5fNsc8+LmTGIVK03MP4K7FVlgDTj6Blo9UzYzVw3RVL5RDLEFMzkoKlT3A/IYm4hlSPwC3yzFou2V6ZtsWd8G93rc5F1dBthcxNYzFTwtz6xknJAApQj4CLMo2QX5x2KdJil5e+51ClATBkwRBUHaK59tr02woS61nqnY1la+vYxrJUNUscYBZuo9wmApCQuxRIJQ9gyZigYhgEhilMAgFwcadVTE0MzcGr2WhjY0JCvmDEKjtPsn5ixalgAM+bJIhvwO8TBVkJuOxVjD46+W500T8Q06dpKsqVj5rFe/Z7TeP05dSv3V5vy2dm6WXLh3e7hzwbfhF0n5xRAr06M13uDtf34q5M70h7mWurOkYdNqAiKFRP2hHMM5ULzk2BF63TAxw9opDH28dtdZuVeYXp125LH1QlH2vY/eez3XPpNDm/JZWy6fsc1auuvbCLpcS84N0WxtI/m6YeFMpnll9bqyp0Vk7esDjPXmmURMQzOlYtVMzopVC8SKujnTaImAB5VFSmEBKUdRyfy9LUs9G1+htl8K2+/YvMyfUH1Zt8m8sXs/hx36LSfbcknu4dqik5tdqi1taNPGGh4mnYiKp+BjUIaDg2yDOFh2qREGzRo1SKgiikmmAFIRMhQKUoBsABsGu4Fu3GEVGKokfz55rNXb92Vy5JynJttt1bbdW2+1t4tmYP3KWIVZY29TG51znsSsS1eVop1jbmpAIYyCzz0rZpOsxUEpS+obvQMqZMBESpLIiP09UmsTCNR6ZXTz7ctzbOnL4Xmzegb/VYmzI6qKgrjVPGWxZwztMBFQitNqPW7xQUzgJd1HbhBTYBJzFEBG0UgVMdOzMDp4ZG07cu2vT9k6bZUnj9KEhqgounYRCnGaaYp8jeQZNEkW/nMXApnIk6KTlOZM3wbCN00QcZ9yFh/WeXXTOrUtt4heoq+x5nI64sNTTUvmOpFlEMnsZKIpE33OdNhIruSkKAmOKQEIAmMADElgBN/ba9aDGSzuN6GC2V1x46yElbqUln9mLizrgrGnZKJnHyku5YOXy2yTRyg8XXUKZc5E1CKAUogYmxqwkSPPz267uA+H1kqwq2iMgaQyFvOqxXTtbaSjp6PqZR/MKoG9KMgtCLrpsmRT7HXVVOUeQBBMDqCUg2ckQRL9vDklaqzPVELe/Ja7sJa6mpalazNOV7Ub9vFsVpWWFFUCCstyJgoqcTGAvDfYdvi1ji8STS/thfWzV6rYs70WkudC3GtM/I+UZXFh5Bu+iFU4xdVq7MVygYxBBFRBQqnH2RKID4azEER3dPZn4l5T2ZxJiccMjKPvbLUjU9Ruami6am2csuxbOopqkkqsVoc/IQxiCUBNtuPh8Osc2Sh9vQey4xerDAnDXGqk7/UpUl/qToQp6ns+zmGi1QsAZulTuPPZFN5pPKBUvPuXhv8WrReBAmbvIbagrCYK3hbp7CxdVxTUursHteqRiJRmG/jw9O4/PqtwlELTlD1KXlc/J7aZgNtv/AMNQqm35dttYwWoMO8qrphAs44nTnjvebJBNFNYt0FwZbpkAgbFPTh1eXhw3MI/KOsnEFCMStKkTl6grmt3yJIwlTy03OvWZDGUTa+9ZFeVOiQxg5jgmKwkKO25tt9tx21TaC9bpVWXpLpTdNinq4zHu22s5K5AP/wARawgajfCm1p0ZePRTjoaIj0iHcOH6jNJJd+DZI5jrHKU+3lb64uczduzHeuSUY+P3d59fyzy9ndQvcDKW5Xbr2qK2fE9kV8TRwpl13Atb1OaVoXA6hD2+hjgogpkTV7Ju5qJYolOmKsPCGFVsw48pk1nRllQ8QIQdav17qTbt1jl1j3v7l/T7Du/0u+jjMZpxvatLDbw4VS7MJSwb7U0t1eaEDT0jWNx61lbj3TrKVuPcCpFhWqGtpx84k5N2cxhMPOu6MY3KG/AobFAOAAAa0rrWv38zvSk22z0d6ddLtO0hW7Vm3GEItYJJYYV2Gs7jHb9S1uOWP1tl2/pXNvaIpWDdI8vKJVYuEbMzgIfAPMmO/wAuu4GQy/BsQt/qxS9yofz4806t8/qd/Nf7tyc/8Um/vFodTboXYedTKRG4tXpv7N5Ct2qTRG91NJtvUSKLcpUkE5li4L5T8qKZeRM/MmsUoFICvIUCa5LjU/BEbUb2bdNtauTXuFnm+m6DRWKKsXDUAhFy7lDn9ogOn05IIonEvAD+QoG/934NV4ZNStTETESxeDljKXx4x3phal7c0sZZdNF09cyD16/diB3Tx0u6MYTLLnDmPygUgDwIQpQAoXSoQdM6kEZWaXbeZH3LydvFc3G6t6AiLR3Im3U5T9NzcnOR0hFKSpgeu2wpMYd4iCKblRQEORQf0fKAgA7hrQXMHSfN3s5O5YlBQk6pNtNV27E+3Z4Hqp0o+vDQdP5ey+U1S1flmbMFCUoRhKMt3CLq7kXVxS3qr+tUdp0eemIr037N1oyr6YiKvvzdaRI5ryqYYzxWPbxccU6UdHNVH6LZQ5E/MVWUOKJBMdUSjzFTIbWw+ROT/wAJy8lNp3ZvFrZRbEq+/Z2+B1K+qH6g1z5qtuWWjO3krEaQjOik5SxnOSi2k3RRSq6KNcHJocDr7o6wHLOYGF+OWdtnZOx2TFvG9eUW8UB1DueYzaUhZMiR0kn8Y8R2UbOUyqGADFHYxREhynTMYow1UEoFwezdpF5VSrm1WdsjTlErLmFGFqChG0zKNm4mDYovY6Zi0ljgG+4+mTAR+ANU4ZNR4PS06HWLnS5ey1wKMnpm7t/qljlImeu/MmKyIjGLLJuFmcfGMjii3RVOgkc/mnWUExA2UAvs6so0IHSasCZLPbtd8N8tK9nrt2RreQxGuDVjld5VkXERTabpF68X9s66cOo4YmaKHPuJwbuCpcREEgEREaOAOOLB9nnZ6maujZvI/L2YuzSbBYqrmhKaphGkxekIIGBJaQdyUsoVM4hscEkiH2+ico+0EKBNT9pc7tCMda2uPX1YUjlTPWypKqJmSf0rbdjSrB2zp+MdvFF2sai4cyPmrEapGKiVVT2zgXmMImER03BUoCwZwKgMIMHadwlgbjva9g6ebVU2Sr92wbsXagVRKv5U5vTJKLEAUTPhKUOcd+UBHx21dLAgnE/+OGy//nDVH/Z0T/1LVOGTUYZ0xu3ktz00cnW+TFL5NTl1JNCAl4H7Jv6ej41uZOWFATKisg7XNuTyQ2AC8d/H45jGhA3DM7+RT8MmP8/v4Y/hR60fcf4o/Zv3V7z9Op+xfaT2fVeVz7eT+k5d9uG+rOgJlr5tuz9dSDhGsH9GxsiY/F3QxbvGblNx+gFCpqteX5i7ao90k4qqS0vZ8zh1DRmT9c0aB/opxsfeJUC/N73pJ8P5xHT0g9XbLHjtQ2l4rRyVF543EkqvZ1RCHoyAqKEqEaZdTXvBIsenJjOW/bNAa+qFMTi6WIjwDzR5OYBq4pqidH+XfgZLNyMJqUo7yTTadaPwe606PwafidmZdWD6I0fkfU//ALB83L4z1/QXcC8+2sRWTcwk80eb3Z6WgitPR778noBBHb6PDWrNbyeiq6/mrl1y8VP7o7O6mHcd9unPMXUmeQj+BZPIRsdnDlltv9rfvN73fver9Y8VF0j2p8IZqDi6MvV5iGKIDJIXnTKYfiN7qh2Jdvj8NfgxhyYn6m358Y2Tev8A1GTjW1CEV/x/Ifc2xo+PP/zpevjPwn/BP3vzk9z/AGv29X5v93yfxF/SeZv4cvta+r0z906rhcGvju1+3H3mi+df/u+7L578R3O3d4m7Tw4fpp37uHeUA62YdLw0AaANAGgDQBoA0AaANAGgDQBoA0AaANAGgDQH/9k=';


            var original_image = json.displayImageBase64;
            if (original_image === "") {
                original_image = error_image;
            }
            var original_width = json.widthdisplayImage;

            var map0 = json.dqBase64;
            if (map0 === "") {
                map0 = error_image;
            }
            var map1 = json.elaBase64;
            if (map1 === "") {
                map1 = error_image;
            }
            var map2 = json.blockingBase64;
            if (map2 === "") {
                map2 = error_image;
            }
            var map3 = json.dwNoiseBase64;
            if (map3 === "") {
                map3 = error_image;
            }
            var map4 = json.medianNoiseBase64;
            if (map4 === "") {
                map4 = error_image;
            }
            var map5 = json.gridsBase64;
            if (map5 === "") {
                map5 = error_image;
            }
            var map6 = json.gridsInversedBase64;
            if (map6 === "") {
                map6 = error_image;
            }
            var ghosts = json.ghostBase64;


            var docDefinition = {
                pageSize: 'A4',
                footer: {
                    columns: [
                        {text: 'CERTH-ITI', margin: [10, 0, 0, 0]},
                        {text: 'MKLab', alignment: 'right', margin: [0, 0, 10, 0]}
                    ]
                },
                content: [
                    {
                        image: reveal_logo,
                        width: 200,
                        margin: [165, 0, 0, 20]
                    },
                    {
                        text: text,
                        fontSize: 15,
                        bold: true,
                        alignment: 'center',
                        margin: [0, 0, 0, 20]
                    },
                    {
                        image: original_image,
                        width: original_width,
                        margin: [(500 - original_width) / 2, 0, 0, 20]
                    },
                    {
                        text: "Output Maps",
                        alignment: 'center',
                        fontSize: 15,
                        bold: true,
                        margin: [0, 0, 0, 20]
                    },
                    {
                        columns: [
                            {
                                width: 130,
                                image: map0,
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: map1,
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                width: 250,
                                text: 'Double JPEG quantization inconsistencies (DQ)',
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 0, 15]
                            },
                            {
                                width: 250,
                                text: 'Error Level Analysis (ELA)',
                                fontSize: 10,
                                alignment: 'center',
                                margin: [10, 5, 0, 15]
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                width: 130,
                                image: map2,
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: map3,
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                width: 250,
                                text: 'JPEG blocking artifact inconsistencies (BLOCK)',
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 0, 15]
                            },
                            {
                                width: 250,
                                text: 'High frequency noise (WAVELET)',
                                alignment: 'center',
                                fontSize: 10,
                                margin: [10, 5, 0, 15]
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                width: 130,
                                image: map5,
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: map6,
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                width: 250,
                                text: 'CAGI',
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 0, 15]
                            },
                            {
                                width: 250,
                                text: 'CAGI INVERSE',
                                alignment: 'center',
                                fontSize: 10,
                                margin: [10, 5, 0, 15]
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                width: 130,
                                image: map4,
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                width: 500,
                                text: 'Median filtering noise residue (MEDIAN)',
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 0, 15]
                            }
                        ]
                    },
                    {
                        text: "JPEG Ghosts (GHOST)",
                        width: 500,
                        alignment: 'center',
                        fontSize: 10,
                        bold: true,
                        margin: [0, 0, 15, 20]//[left,top,right,bottom]
                    },
                    {
                        text: "MetaData",
                        alignment: 'center',
                        fontSize: 15,
                        bold: true
                    }
                ]
            };


            switch (ghosts.length) {
                case 1:
                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[0],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 500,
                                text: '' + ghosts_qualities[0],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(13, 0, image_header);
                    docDefinition.content.splice(14, 0, quality);

                    break;
                case 2:
                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[0],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[1],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[0],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[1],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(13, 0, image_header);
                    docDefinition.content.splice(14, 0, quality);
                    break;
                case 3:
                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[0],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[1],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[0],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[1],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(13, 0, image_header);
                    docDefinition.content.splice(14, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[2],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 500,
                                text: '' + ghosts_qualities[2],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(15, 0, image_header);
                    docDefinition.content.splice(16, 0, quality);
                    break;
                case 4:
                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[0],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[1],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[0],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[1],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(13, 0, image_header);
                    docDefinition.content.splice(14, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[2],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[3],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[2],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[3],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(15, 0, image_header);
                    docDefinition.content.splice(16, 0, quality);

                    break;
                case 5:
                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[0],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[1],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[0],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[1],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(13, 0, image_header);
                    docDefinition.content.splice(14, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[2],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[3],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[2],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[3],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(15, 0, image_header);
                    docDefinition.content.splice(16, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[4],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 500,
                                text: '' + ghosts_qualities[4],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(17, 0, image_header);
                    docDefinition.content.splice(18, 0, quality);

                    break;
                case 6:
                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[0],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[1],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[0],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[1],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(13, 0, image_header);
                    docDefinition.content.splice(14, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[2],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[3],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[2],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[3],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(15, 0, image_header);
                    docDefinition.content.splice(16, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[4],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[5],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[4],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[5],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(17, 0, image_header);
                    docDefinition.content.splice(18, 0, quality);

                    break;
                case 7:
                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[0],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[1],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[0],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[1],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(13, 0, image_header);
                    docDefinition.content.splice(14, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[2],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[3],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[2],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[3],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(15, 0, image_header);
                    docDefinition.content.splice(16, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[4],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[5],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[4],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[5],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(17, 0, image_header);
                    docDefinition.content.splice(18, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[6],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 500,
                                text: '' + ghosts_qualities[6],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(19, 0, image_header);
                    docDefinition.content.splice(20, 0, quality);
                    break;
                case 8:
                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[0],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[1],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[0],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[1],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(13, 0, image_header);
                    docDefinition.content.splice(14, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[2],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[3],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[2],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[3],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(15, 0, image_header);
                    docDefinition.content.splice(16, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[4],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[5],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[4],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[5],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(17, 0, image_header);
                    docDefinition.content.splice(18, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[6],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[7],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[6],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[7],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(19, 0, image_header);
                    docDefinition.content.splice(20, 0, quality);
                    break;
                case 9:
                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[0],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[1],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[0],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[1],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(13, 0, image_header);
                    docDefinition.content.splice(14, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[2],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[3],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[2],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[3],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(15, 0, image_header);
                    docDefinition.content.splice(16, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[4],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[5],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[4],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[5],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(17, 0, image_header);
                    docDefinition.content.splice(18, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[6],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[7],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[6],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[7],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(19, 0, image_header);
                    docDefinition.content.splice(20, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[8],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 500,
                                text: '' + ghosts_qualities[8],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(21, 0, image_header);
                    docDefinition.content.splice(22, 0, quality);

                    break;
                case 10:
                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[0],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[1],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[0],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[1],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(13, 0, image_header);
                    docDefinition.content.splice(14, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[2],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[3],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[2],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[3],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(15, 0, image_header);
                    docDefinition.content.splice(16, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[4],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[5],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[4],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[5],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(17, 0, image_header);
                    docDefinition.content.splice(18, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[6],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[7],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[6],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[7],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(19, 0, image_header);
                    docDefinition.content.splice(20, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[8],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[9],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[8],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[9],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(21, 0, image_header);
                    docDefinition.content.splice(22, 0, quality);
                    break;
                case 11:
                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[0],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[1],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[0],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[1],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(13, 0, image_header);
                    docDefinition.content.splice(14, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[2],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[3],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[2],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[3],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(15, 0, image_header);
                    docDefinition.content.splice(16, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[4],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[5],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[4],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[5],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(17, 0, image_header);
                    docDefinition.content.splice(18, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[6],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[7],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[6],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[7],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(19, 0, image_header);
                    docDefinition.content.splice(20, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[8],
                                margin: [55, 0, 0, 0]
                            },
                            {
                                width: 130,
                                image: ghosts[9],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 250,
                                text: '' + ghosts_qualities[8],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 10, 15]
                            },
                            {
                                width: 250,
                                text: '' + ghosts_qualities[9],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [15, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(21, 0, image_header);
                    docDefinition.content.splice(22, 0, quality);

                    var image_header = {
                        columns: [
                            {
                                width: 130,
                                image: ghosts[10],
                                margin: [185, 0, 0, 0]
                            }
                        ]
                    };
                    var quality = {
                        columns: [
                            {
                                width: 500,
                                text: '' + ghosts_qualities[10],
                                alignment: 'center',
                                fontSize: 10,
                                margin: [0, 5, 0, 15]
                            }
                        ]
                    };
                    docDefinition.content.splice(23, 0, image_header);
                    docDefinition.content.splice(24, 0, quality);

                    break;

            }

            for (var i = 0; i < values.length; i++) {

                var feature = {
                    text: values[i].name,
                    fontSize: 13,
                    bold: true,
                    margin: [0, 20, 0, 8],
                    alignment: 'center'
                };
                var table = {
                    fontSize: 10,
                    style: 'tableExample',
                    table: {
                        headerRows: 1,
                        alignment: 'center',
                        widths: ['*', '*'],
                        body: [
                            [
                                {
                                    text: 'Name',
                                    style: 'tableHeader'
                                },
                                {
                                    text: 'Value',
                                    style: 'tableHeader'
                                }
                            ]
                        ]
                    },
                    layout: 'lightHorizontalLines'
                };
                for (var j = 0; j < values[i].values.length; j++) {
                    table.table.body.push([values[i].values[j].name, values[i].values[j].value]);
                }
                docDefinition.content.push(feature);
                docDefinition.content.push(table);
            }

            var more = {
                text: 'More at: ' + window.location.href,
                fontSize: 8,
                italics: true,
                margin: [0, 10, 0, 0]
            };
            var footer = {
                text: 'This summary was generated by the Media Verification Assistant, contact: verifymedia@iti.gr, Copyright REVEAL 2016',
                fontSize: 11,
                margin: [0, 10, 0, 0]
            };
            if ($('.thumb').length) {
                var thumb_image = json.thumbBase64[0];
                if (thumb_image === "") {
                    thumb_image = error_image;
                }
                var thumb =
                {
                    text: "Thumbnail",
                    fontSize: 15,
                    bold: true,
                    alignment: 'left',
                    margin: [0, 0, 0, 5]
                };
                var image_thumb =
                {
                    image: thumb_image,
                    width: 130,
                    margin: [0, 0, 0, 20]
                };
                docDefinition.content.splice(3, 0, thumb);
                docDefinition.content.splice(4, 0, image_thumb);

            }
            docDefinition.content.push(footer);
            docDefinition.content.push(more);
            pdfMake.createPdf(docDefinition).download('Reveal-' + url_to_verify + '.pdf');
        }
    });

}


window.onresize = function () {
    $('.prv_data').css('visibility', 'hidden');
    if ($('#flatTable1').hasClass('flatTable_landscape')) {
        var table_fit = Math.floor(($(window).width() - 480) / 350);
        $('.flatTable').hide();
        $('.flatTable:lt(' + table_fit + ')').show();
    }
    else {
        var table_fit = Math.floor(($(window).width() - 380) / 350);
        $('.flatTable').hide();
        $('.flatTable:lt(' + table_fit + ')').show();
    }
    if (table_fit < values.length + 1) {
        $('.next_data').css('visibility', 'visible');
    }
};

function load_images() {
    $('#tiles').imagesLoaded(function () {

        var options = {
            autoResize: true,
            container: $('#main'),
            offset: 10,
            itemWidth: 277,
            outerOffset: 0
        };
        var handler = $('#tiles li');
        handler.wookmark(options);
        $('#loading').hide();
    });
}