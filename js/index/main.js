var tour_redirect = gup('tour');
var image_old_ui = gup('image');
if (image_old_ui != "") {
    create_page(image_old_ui);
}
else {

    load_images();
}
function drop_img(evt) {
    var url_verify = "";
    evt.stopPropagation();
    evt.preventDefault();
    var imageUrl = evt.dataTransfer.getData('text/html');
    if (imageUrl === "") {
        $('#error_modal h1').html("Oops! Something went wrong");
        $('#error_modal p').html("You have to drag an image from the web. Images from local disk aren't accepted!");
        $('#error_modal').reveal();
    }
    else {
        if (imageUrl.indexOf('<a href="https://www.youtube.com/watch?v=') > -1) {
            var id = imageUrl.substring(41, 52);
            url_verify = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
        }
        else if (imageUrl === "") {
            imageUrl = evt.dataTransfer.getData('text');
            var id = imageUrl.substring(32, 43);
            url_verify = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
        }
        else {
            if ($(imageUrl).children().length > 0) {
                url_verify = decodeURIComponent($(imageUrl).find('img').attr('src'));
            } else {
                url_verify = decodeURIComponent($(imageUrl).attr('src'));
            }
        }

        if (url_verify.length < 300) {
            if (url_verify.indexOf('i.ytimg.com') > -1) {
                if (url_verify.indexOf('vi_webp') > -1) {
                    url_verify = url_verify.substring(0, 40) + "hqdefault.webp";
                }
                else {
                    url_verify = url_verify.substring(0, 35) + "hqdefault.jpg";
                }
            }
            $('#img_url').val(url_verify);
            create_page(url_verify)
        } else {
            $('#error_modal h1').html("Oops! Something went wrong");
            $('#error_modal p').html("The provived image URL is <b>" + url_verify.length + "</b> characters long<br/>We can not handle such big URL");
            $('#error_modal').reveal();
        }
    }
}
$('#verify_text').click(function () {
    var url_verify = $("#img_url").val();
    if (url_verify !== "") {
        create_page(url_verify);
    }
});
$("#img_url").keyup(function (e) {
    if (e.keyCode === 13) {
        var url_verify = $("#img_url").val();
        if (url_verify !== "") {
            create_page(url_verify);
        }
    }
});

function create_page(url) {
    $.ajax({
        type: "GET",
        url: "http://caa.iti.gr/imageforensicsv2/addurl?url=" + encodeURIComponent(url),
        dataType: "jsonp",
        success: function (json) {
            if (json.status === "no_valid_url") {
                $('#error_image').text('The url is not valid').css('display', 'block');
            }
            else if (json.status === "unsupported_file") {
                $('#error_image').text('The url is not supported image file').css('display', 'block');
            }
            else if (json.status === "url_error") {
                $('#error_image').text('The image could not be downloaded').css('display', 'block');
            }
            else if (json.status === "image_url_error") {
                $('#error_image').text('The image could not be downloaded successfully').css('display', 'block');
            }
            else if (json.status === "internal_error") {
                $('#error_image').text('Unexpected error occurred. Contact markzampoglou@iti.gr').css('display', 'block');
            }
            else if (json.status === "empty_parameter") {
                $('#error_image').text('Image URL is required').css('display', 'block');
            }
            else {
                $.ajax({
                    url: "create_page.php?img=" + url,
                    type: "GET",
                    success: function (msg) {
                        window.location.href = msg;
                    }
                });
            }
        },
        async: true
    });
}

$('#verify_text_but').click(function () {
    create_page($('#img_url').val());
});
var max_height;
function tour_example() {
    $("#user_input").hide();

    var tiles = document.getElementById("tiles");
    var main = document.getElementById("main");
    main.style.height = "0px";
    main.removeChild(tiles);

    var tilesnew = document.createElement("ul");
    tilesnew.setAttribute('id', 'tiles');
    main.appendChild(tilesnew);

    $('#container').css('padding-top', '50px');

    var titles_desc = ["Double JPEG quantization inconsistencies (DQ)", "JPEG Ghosts (GHOST)", "JPEG blocking <br> artifact inconsistencies (BLOCK)", "Error Level Analysis (ELA)", "Median filtering <br> noise residue (MEDIAN)", "High frequency noise (WAVELET)", "GRIDS ", "GRIDS-Inversed"];
    $('.alert').slideDown();
    $('#shade_div').hide();
    var selected_image = document.getElementById('selected_image');
    var a_select = document.createElement('a');
    a_select.setAttribute('href', 'http://160.40.51.26/projects/Forensics/example16_big.jpg');
    a_select.setAttribute('onclick', 'return false;');
    selected_image.appendChild(a_select);

    var img1 = new Image();
    img1.setAttribute('src', 'imgs/example16_big.jpg');
    img1.setAttribute('data-imagezoom', 'true');
    img1.setAttribute('data-zoomviewborder', '6px solid #000');
    img1.setAttribute('data-magnification', '5');
    img1.setAttribute('onerror', 'imgError1(this);');
    img1.onload = function () {

        img1.setAttribute('class', 'original_img_landscape');
        a_select.appendChild(img1);

        var googlep = document.createElement('p');
        googlep.innerHTML = "send this image to <span style='color:#AF0E09;font-weight: bold;'>Google reverse image search</span>";
        googlep.setAttribute('class', 'google_link');
        googlep.setAttribute('style', 'width:350px');
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
        next.setAttribute('src', 'imgs/nxt-black.png');
        table1.parentNode.insertBefore(next, table1.nextSibling);

        var prv = document.createElement('img');
        prv.setAttribute('class', 'prv_data prv_data_landscape');
        prv.setAttribute('src', 'imgs/prv-black.png');
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
        div2.innerHTML = '<img src="imgs/info_circle.png" width="22" height="22"><span class="tooltip_text"><h3>METADATA</h3>Metadata are currently extracted and organized using Drew Noakes\' metadata extractor library for Java. <a target="_blank" style="color: #AF0E09;text-decoration: none;font-weight: bold;position: relative;top: 1px;" href="https://www.drewnoakes.com/code/exif/">Source</a></span>';
        div2.setAttribute('class', 'tooltip tooltip_landscape');
        div2.setAttribute('style', 'top:' + (-9 - img1.clientHeight) + 'px');
        div.parentNode.insertBefore(div2, div.nextSibling);


        var $flattable = $('#flatTable1');
        $flattable.find('tbody').append('<p class="table_title"><span style="float: left;width: 7%;">description</span>|&nbsp;&nbsp;&nbsp;&nbsp; value</p>');
        $flattable.find('tbody').append('<p class="table_title_main">Exif IFD0</p>');
        $flattable.append('<tr><td>Date/Time</td><td>2015:08:19 12:51:38</td></tr>');
        $flattable.append('<tr><td>Gain Control</td><td>Not found</td></tr>');
        $flattable.append('<tr><td>Image Description</td><td>Not found</td></tr>');
        $flattable.append('<tr><td>Image Height</td><td>2448 pixels</td></tr>');

        $('#flatTable1').after('<table class="flatTable flatTable_landscape" id="flatTable2"><thead><tr><td>Exif SubIFD</td></tr></thead><tbody style="max-height:' + max_height + 'px;"></tbody></table>');
        $('#flatTable2').find('tbody').prepend('<p class="table_title"><span style="float: left;width: 7%;">description</span>|&nbsp;&nbsp;&nbsp;&nbsp; value</p>');
        $('#flatTable2 tbody').append('<tr><td>Exposure Time</td><td>0.02 sec</td></tr>');
        $('#flatTable2 tbody').append('<tr><td>F-Number</td><td>f/2.6</td></tr>');
        $('#flatTable2 tbody').append('<tr><td>ISO Speed Ratings</td><td>100</td></tr>');
        $('#flatTable2 tbody').append('<tr><td>Exif Version</td><td>2.20</td></tr>');
        $('#flatTable2 tbody').append('<tr><td>Date/Time Original</td><td>2015:08:12 10:50:07</td></tr>');
        $('#flatTable2 tbody').append('<tr><td>Date/Time Digitized</td><td>2015:08:12 10:50:07</td></tr>');

        $('#flatTable1').after('<table class="flatTable flatTable_landscape" id="flatTable3"><thead><tr><td>Exif IFDO</td></tr></thead><tbody style="max-height:' + max_height + 'px;"></tbody></table>');
        $('#flatTable3').find('tbody').prepend('<p class="table_title"><span style="float: left;width: 7%;">description</span>|&nbsp;&nbsp;&nbsp;&nbsp; value</p>');
        $('#flatTable3 tbody').append('<tr><td>Image Width</td><td>3264 pixels</td></tr>');
        $('#flatTable3 tbody').append('<tr><td>Image Heigth</td><td>2448 pixels</td></tr>');
        $('#flatTable3 tbody').append('<tr><td>Bits Per Sample</td><td>8 8 8 bits/component/pixel</td></tr>');
        $('#flatTable3 tbody').append('<tr><td>Photometric Interpretation</td><td>RGB</td></tr>');
        $('#flatTable3 tbody').append('<tr><td>Make</td><td>LGE</td></tr>');
        $('#flatTable3 tbody').append('<tr><td>Model</td><td>Nexus 4</td></tr>');

        $('#flatTable1').after('<table class="flatTable flatTable_landscape" id="flatTable4"><thead><tr><td>JPEG</td></tr></thead><tbody style="max-height:' + max_height + 'px;"></tbody></table>');
        $('#flatTable4').find('tbody').prepend('<p class="table_title"><span style="float: left;width: 7%;">description</span>|&nbsp;&nbsp;&nbsp;&nbsp; value</p>');
        $('#flatTable4 tbody').append('<tr><td>Compression Type</td><td>Baseline</td></tr>');
        $('#flatTable4 tbody').append('<tr><td>Data Precision</td><td>Baseline</td></tr>');
        $('#flatTable4 tbody').append('<tr><td>Image Height</td><td>Baseline</td></tr>');
        $('#flatTable4 tbody').append('<tr><td>Image Width</td><td>Baseline</td></tr>');
        $('#flatTable4 tbody').append('<tr><td>Component1</td><td>Y component: Quantization table 0, Sampling facto</td></tr>');

        $('.next_data').css('visibility', 'visible');
        $('#image0').attr("src", "imgs/tour_DQOutput.png");
        $('#image6').attr("src", "imgs/tour_GridsOutput.png");
        $('#image7').attr("src", "imgs/tour_GridsInversedOutput.png");
        $('#image1').attr("src", "imgs/tour_GhostOutput00.png");
        $('#image5').attr("src", "imgs/tour_DWNoiseOutput.png");
        $('#image3').attr("src", "imgs/tour_ELAOutput.png");
        $('#image2').attr("src", "imgs/tour_BLKOutput.png");
        $('#image4').attr("src", "imgs/tour_MedianNoiseOutput.png");

        $('.metadata_portrait').html($('.metadata_portrait').html() + "<img src='imgs/marker-16-black.png' class='gps'>");
        $('.metadata_portrait').html($('.metadata_portrait').html() + "<img src='imgs/thumb-16.png' class='thumb'>");


        $('#quality_span').html(85);
        $('#slider_range').val('0');
        $('#slider_range').attr('max', 1);
        load_images();

        $('.alert').slideUp();
        $('[data-imagezoom]').imageZoom();
        $('#pdf').show();

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
        a.setAttribute('href', "imgs/loading_holder.gif");
        a.setAttribute('onclick', 'return false;');
        a.setAttribute('id', "a" + i);
        divouter.appendChild(a);

        var img = document.createElement('img');
        img.setAttribute('src', "imgs/loading_holder.gif");
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
}
function clear_results() {
    var tiles = document.getElementById("tiles");
    var main = document.getElementById("main");
    main.style.height = "0px";
    main.removeChild(tiles);

    $('#selected_image').empty();
    $(".flatTable,.next_data,.prv_data,.metadata_portrait,.tooltip,.desc_arrow").remove();
    $('.alert,#user_text_wrapper,#pdf,#loading_pdf,.gh-nav-list').hide();
    $('#download').show();
    var tilesnew = document.createElement("ul");
    tilesnew.setAttribute('id', 'tiles');
    main.appendChild(tilesnew);
    $('#container').css('padding-top', '0');
    load_examples();

    $("#user_input").show();
}
function load_examples() {
    $('#loading').show();

    /////////////1

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-1');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>US soldier</p><p class='flipDesc'>Below the US flag on the soldier's shoulder, the patch \"DOING THE WORK OF\" plus a Russian, German and French flag has been added to the image.</p><a href='http://www.snopes.com/photos/military/patch.asp' target='_blank' class='flipa'>More</a><img class='image_back' src='imgs/photo_back.png' data-pos='1' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example1.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example1_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('data-pos', 1);
    example_info.setAttribute('class', 'example_info');
    front.appendChild(example_info);

    /////////////2

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-2');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Pirate skull</p><p class='flipDesc'>This forgery, submitted to the Worth1000 contest, displays the supposed skull of a pirate with one    eye and one remaining tooth.</p><a href='http://www.designcrowd.com/community/contest.aspx?id=1680804' target='_blank' class='flipa'>More</a><img class='image_back' src='imgs/photo_back.png' data-pos='2' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example2.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example2_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('data-pos', 2);
    example_info.setAttribute('class', 'example_info');
    front.appendChild(example_info);

    /////////////3

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-3');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Sochi toilet</p><p class='flipDesc'>The famous photograph of the sochi double toilet with an added mirror between the two seats.</p><a href='https://twitter.com/BBCSteveR/status/425247559934676992/photo/1' target='_blank' class='flipa'>Original</a><img class='image_back' src='imgs/photo_back.png' data-pos='3' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example3.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example3_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('data-pos', 3);
    example_info.setAttribute('class', 'example_info');
    front.appendChild(example_info);

    /////////////4

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-4');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>9/11 tourist</p><p class='flipDesc'>A famous forgery of a tourist getting photographed on the world trade center terrace at the moment    of the 9/11 attack.</p><a href='http://hoaxes.org/photo_database/image/tourist_guy' target='_blank' class='flipa'>More</a><img class='image_back' src='imgs/photo_back.png' data-pos='4' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example4.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example4_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('data-pos', 4);
    example_info.setAttribute('class', 'example_info');
    front.appendChild(example_info);

    /////////////5

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-5');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Back to the future</p><p class='flipDesc'>\"Today is the day Marty McFly...\" versions of this hoax have repeatedly circulated the Web. The actual date is October 21, 2015.</p><a href='http://www.dailymail.co.uk/tvshowbiz/article-3253861/Doc-Brown-comes-Future-one-time-Christopher-Lloyd-marks-movie-s-30th-anniversary-short-film.html' target='_blank' class='flipa'>More</a><img class='image_back' src='imgs/photo_back.png' data-pos='5' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example5.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example5_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('data-pos', 5);
    example_info.setAttribute('class', 'example_info');
    front.appendChild(example_info);

    /////////////6

    load_images(0, "pre", 0);

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-6');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Ferguson protest</p><p class='flipDesc'>This forgery, attempting to discredit the protests surrounding the shooting of Michael Brown   shows a placard supposedly defending the right to robbery.</p><a href='http://www.snopes.com/photos/politics/fergusonsign.asp' target='_blank' class='flipa'>More</a><img class='image_back' src='imgs/photo_back.png' data-pos='6' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example6.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example6_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('class', 'example_info');
    example_info.setAttribute('data-pos', 6);
    front.appendChild(example_info);

    /////////////7

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-7');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Double sunset on Mars</p><p class='flipDesc'>This image displays a double sunset and was supposedly captured on the surface of Mars. The suns actually originate from the original Star Wars movie \"A New Hope\".</p><a href='http://blogs.discovermagazine.com/badastronomy/2012/08/13/no-thats-not-a-picture-of-a-double-sunset-on-mars/#.VZUp2EYZ6iw' target='_blank' class='flipa'>More</a><img class='image_back' src='imgs/photo_back.png' data-pos='7' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example7.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example7_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('data-pos', 7);
    example_info.setAttribute('class', 'example_info');
    front.appendChild(example_info);

    /////////////8

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-8');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Kayak and whale</p><p class='flipDesc'>This image shows a kayak accidentally entering the mouth of a whale.</p><a href='http://www.phototalk.co.za/2011/09/real-or-fake/' target='_blank' class='flipa'>More</a><img class='image_back' src='imgs/photo_back.png' data-pos='8' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example8.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example8_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('class', 'example_info');
    example_info.setAttribute('data-pos', 8);
    front.appendChild(example_info);

    /////////////9

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-9');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Sarah Palin faceswap</p><p class='flipDesc'>A typical case of faceswap, intended to discredit then vice presidential candidate Sarah Palin.</p><a href='http://www.snopes.com/photos/politics/palin.asp' target='_blank' class='flipa'>More</a><img class='image_back' src='imgs/photo_back.png' data-pos='9' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example9.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example9_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('class', 'example_info');
    example_info.setAttribute('data-pos', 9);
    front.appendChild(example_info);

    /////////////10

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-10');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Black lives matter</p><p class='flipDesc'>A banner, supposedly critical of the \"Black Lives Matter\" slogan, is a proven forgery of an actual \"Black Lives Matter\" protest</p><a href='http://www.snopes.com/photos/politics/blacklivesmatter.asp' target='_blank' class='flipa'>More</a><img class='image_back' src='imgs/photo_back.png' data-pos='10' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example10.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example10_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('class', 'example_info');
    example_info.setAttribute('data-pos', 10);
    front.appendChild(example_info);

    load_images();

    /////////////11

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-11');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Deleted spike</p><p class='flipDesc'>This image is part of a research dataset.</p><a href='http://clem.dii.unisi.it/~vipp/index.html/imagerepository/129-a-framework-for-decision-fusion-in-image-forensics-based-on-dempster-shafer-theory-of-evidence' target='_blank' class='flipa'>Source</a><img class='image_back' src='imgs/photo_back.png' data-pos='11' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example11.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example11_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('class', 'example_info');
    example_info.setAttribute('data-pos', 11);
    front.appendChild(example_info);

    /////////////12

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-12');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Added tree</p><p class='flipDesc'>This image is part of a research dataset.</p><a href='http://clem.dii.unisi.it/~vipp/index.html/imagerepository/129-a-framework-for-decision-fusion-in-image-forensics-based-on-dempster-shafer-theory-of-evidence' target='_blank' class='flipa'>Source</a><img class='image_back' src='imgs/photo_back.png' data-pos='12' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example12.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example12_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('data-pos', 12);
    example_info.setAttribute('class', 'example_info');
    front.appendChild(example_info);

    /////////////13

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-13');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Added bottle</p><p class='flipDesc'>This image is part of a research dataset.</p><a href='http://clem.dii.unisi.it/~vipp/index.html/imagerepository/129-a-framework-for-decision-fusion-in-image-forensics-based-on-dempster-shafer-theory-of-evidence' target='_blank' class='flipa'>Source</a><img class='image_back' src='imgs/photo_back.png' data-pos='13' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example13.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example13_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('class', 'example_info');
    example_info.setAttribute('data-pos', 13);
    front.appendChild(example_info);

    /////////////14

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-14');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Faceswap</p><p class='flipDesc'>This image is part of a research dataset.</p><a href='http://clem.dii.unisi.it/~vipp/index.html/imagerepository/129-a-framework-for-decision-fusion-in-image-forensics-based-on-dempster-shafer-theory-of-evidence' target='_blank' class='flipa'>More</a><img class='image_back' src='imgs/photo_back.png' data-pos='14' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example14.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example14_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('data-pos', 14);
    example_info.setAttribute('class', 'example_info');
    front.appendChild(example_info);

    /////////////15

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-15');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Copy-moved gull</p><p class='flipDesc'>This is a forgery provided to us by Anastasia Katsaounidou (akatsaounidou [at] gmail dot com).</p><img class='image_back' src='imgs/photo_back.png' data-pos='15' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example15.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example15_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('data-pos', 15);
    example_info.setAttribute('class', 'example_info');
    front.appendChild(example_info);

    /////////////16

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-16');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Multiple copy-moves I</p><p class='flipDesc'>This image is part of the The Deutsche Welle Image Forensics Dataset</p><a href='http://revealproject.eu/the-deutsche-welle-image-forensics-dataset/' target='_blank' class='flipa'>Source</a><img class='image_back' src='imgs/photo_back.png' data-pos='16' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example16.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example16_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('data-pos', 16);
    example_info.setAttribute('class', 'example_info');
    front.appendChild(example_info);

    /////////////17

    var titles = document.getElementById("tiles");
    var li = document.createElement('li');
    titles.appendChild(li);

    var divouter = document.createElement('div');
    divouter.setAttribute('class', 'outer flip-container');
    divouter.setAttribute('id', 'flip-toggle-17');
    li.appendChild(divouter);

    var flipper = document.createElement('div');
    flipper.setAttribute('class', 'flipper');
    divouter.appendChild(flipper);

    var front = document.createElement('div');
    front.setAttribute('class', 'front');
    flipper.appendChild(front);

    var back = document.createElement('div');
    back.setAttribute('class', 'back');
    back.innerHTML = "<p class='flipTitle'>Multiple copy-moves II</p><p class='flipDesc'>This image is part of the The Deutsche Welle Image Forensics Dataset</p><a href='http://revealproject.eu/the-deutsche-welle-image-forensics-dataset/' target='_blank' class='flipa'>Source</a><img class='image_back' src='imgs/photo_back.png' data-pos='17' />";
    flipper.appendChild(back);

    var a = document.createElement('a');
    front.appendChild(a);

    var img = document.createElement('img');
    img.setAttribute('src', "imgs/example17.jpg");
    img.setAttribute('width', '245');
    img.setAttribute('style', 'cursor:pointer');
    img.setAttribute('onerror', 'imgError1(this);');
    img.setAttribute('onclick', 'create_page("http://160.40.51.26/projects/Forensics/imgs/example17_big.jpg")');
    a.appendChild(img);

    var example_info = document.createElement('img');
    example_info.setAttribute('src', "imgs/info.png");
    example_info.setAttribute('data-pos', 17);
    example_info.setAttribute('class', 'example_info');
    front.appendChild(example_info);

    load_images();
    if (self !== top) {
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            $('#tiles li').css('display', 'list-item');
        }
    }
}

function gup(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) return "";
    else return results[1];
}

$('#shade_div').click(function () {
    $(this).hide();
});
$('.purpose a').click(function (e) {
    e.stopPropagation();
});
$('#tour').click(function () {
    hopscotch.startTour(tour, 0);
    $('#shade_div').hide();
});

hopscotch.registerHelper('addOverlay', function () {
    $('body').append('<div id="cover"></div>');
    $('body').addClass('stop-scrolling');
});

hopscotch.registerHelper('removeOverlay', function () {
    $('#cover').remove();
    $('body').removeClass('stop-scrolling');
    clear_results();
});
var tour = {
    id: "tour",
    showCloseButton: true,
    showPrevButton: true,
    scrollDuration: 300,
    steps: [
        {
            title: "Image Input",
            content: "Drag and drop an image or copy the URL of an image to analyze",
            target: "#img_url",
            placement: "top",
            yOffset: 0,
            xOffset: 0,
            zindex: 10
        },
        {
            title: "Analyze your Image",
            content: "Hit the button to analyze your image",
            target: "#verify_text_but",
            placement: "bottom",
            yOffset: -18,
            xOffset: 0,
            zindex: 10
        },
        {
            title: "Image Input",
            content: "Upload your image to analyze",
            target: "#fileToUpload",
            placement: "top",
            yOffset: 0,
            xOffset: 0,
            zindex: 10
        },
        {
            title: "Analyze your Image",
            content: "Hit the button to analyze your image",
            target: "#submit_but",
            placement: "bottom",
            yOffset: -18,
            xOffset: 0,
            zindex: 10
        },
        {
            title: "Examples",
            content: "Alternatively, select one of the following examples to see its analysis",
            target: "#tiles li",
            placement: "top",
            yOffset: 0,
            xOffset: 10,
            zindex: 10,
            onShow: function () {
            },
            onNext: function () {
                tour_example();
            }
        },
        {
            title: "Original Image",
            content: "This is the submitted image. Move the cursor over is to use as a magnifying glass.",
            target: "#selected_image",
            placement: "right",
            yOffset: 100,
            xOffset: 0,
            zindex: 10,
            onPrev: function () {
                hopscotch.endTour();
                clear_results();
                $('#tiles').imagesLoaded(function () {
                    hopscotch.startTour(tour, 4);
                });
            }
        },
        {
            title: "Metadata",
            content: "Any available image metadata are shown here",
            target: ".flatTable",
            placement: "bottom",
            yOffset: -40,
            xOffset: 0,
            zindex: 10
        },
        {
            title: "Navigation",
            content: "Use the navigation arrows to switch between metadata categories",
            target: ".prv_data",
            placement: "left",
            yOffset: -24,
            xOffset: 0,
            zindex: 10
        },
        {
            title: "GPS",
            content: "If GPS metadata are given, this icon will project the coordinates on the world map",
            target: ".gps",
            placement: "bottom",
            yOffset: 0,
            xOffset: -24,
            zindex: 10
        },
        {
            title: "Thumbnail",
            content: "If EXIF thumbnails are provided, this icon will display them. On rare occasions, modifying an image will leave the thumbnails unchanged, giving away the tampering",
            target: ".thumb",
            placement: "bottom",
            yOffset: 0,
            xOffset: -24,
            zindex: 10
        },
        {
            title: "Google",
            content: "Use this button to send the image to Google reverse image search",
            target: ".google_link",
            placement: "bottom",
            yOffset: 0,
            xOffset: 0,
            zindex: 10
        },
        {
            title: "Tampering Localization",
            content: "Tampering localization maps produced by an array of experimental algorithms can help you identify and localize tampering operations.",
            target: "#tiles li",
            placement: "top",
            yOffset: 0,
            xOffset: 0,
            zindex: 10
        },
        {
            title: "Output report",
            content: "Export all the analysis results in a PDF document.",
            target: "#pdf",
            placement: "top",
            yOffset: 0,
            xOffset: 0,
            zindex: 10
        }
    ],
    onStart: ["addOverlay"],
    onEnd: ["removeOverlay"],
    onClose: ["removeOverlay"]
};

if (tour_redirect === "start") {
    hopscotch.startTour(tour, 0);
    $('#shade_div').hide();
}

$(document).on("click", ".example_info", function () {
    document.querySelector('#flip-toggle-' + $(this).attr("data-pos")).classList.toggle('hover');
});
$(document).on("click", ".image_back", function () {
    document.querySelector('#flip-toggle-' + $(this).attr("data-pos")).classList.toggle('hover');
});

$("#img_url").keyup(function (e) {
    if (e.keyCode === 13) {
        create_page($(this).val());
    }
});

$("#upload_form").submit(function (e) {
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: "upload.php",
        type: "POST",
        data: formData,
        async: false,
        success: function (msg) {
            if (msg === "error1") {
                $('#error_upload').html("File is not an Image").css('display', 'block');
            }
            else if (msg === "error3") {
                $('#error_upload').html("Only JPG, JPEG, PNG & GIF files are allowed").css('display', 'block');
            }
            else if (msg === "error4") {
                $('#error_upload').html("Unexpected error while uploading your file").css('display', 'block');
            }
            else {
                $('#error_upload').css('display', 'none');
                create_page(clean_url(window.location.href) + "uploads/" + msg);
            }
        },
        cache: false,
        contentType: false,
        processData: false
    });
    e.preventDefault();
});
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
function clean_url(url) {
    var to = url.lastIndexOf('/');
    to = to == -1 ? url.length : to + 1;
    url = url.substring(0, to);
    return url;
}


function imgError1(image) {
    image.onerror = "";
    image.src = "imgs/image_error.png";
    return true;
}