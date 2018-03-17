var registerLabel = $("#register-label");
var lowerArrow = $("#lower-arrow");

var intro = $("#intro");

var searchBackground = $("#search-background");

var inputSchoolName = $("#input-school-name");
var searchSchoolButton = $("search-school-button");
var search = $(".fa-search");
var loaderWheel = $(".loader-wheel");

var resultContainer = $(".result-container");
var startButton = $(".start-button");

var main = $("#main");

var monthLabel = $('.month');
var dateDayLabel = $('.date-day');

var changeSchoolButton = $("#change-school");

var b1 = $('#b1 .meal-content');
var b2 = $('#b2 .meal-content');
var b3 = $('#b3 .meal-content');

var currentDate = new Date();
var prevDate = new Date();
prevDate.setDate(prevDate.getDate() - 1);
var nextDate = new Date();
nextDate.setDate(nextDate.getDate() + 1);

var month;
var date;
var day;
var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

var bufferDate = [
    prevDate,
    currentDate,
    nextDate
];

var regions = {
    Seoul: 0,
    Incheon: 1,
    Busan: 2,
    Gwangju: 3,
    Daejeon: 4,
    Daegu: 5,
    Sejong: 6,
    Ulsan: 7,
    Gyeongggi: 8,
    Kangwon: 9,
    Chungbuk: 10,
    Chungnam: 11,
    Gyeongbuk: 12,
    Gyeongnam: 13,
    Jeonbuk: 14,
    Jeonnam: 15,
    Jeju: 16,
}

var schools = {
    Kindergarden: 0,
    Elementary: 1,
    Middle: 2,
    High: 3
};

var breakfastWord = "[조식]";
var lunchWord = "[중식]";
var dinnerWord = "[석식]";

$(document).ready(function () {
    if (localStorage.getItem('main') === "true") {
        main.css('display', 'inherit');
        refreshDate();
        getMeal(currentDate, $('.slide').eq(1).find('.meal-content'));
    }

    var mealContents = $(".slide .meal-content");

    registerLabel.hover(
        function () {
            $(lowerArrow).css('transform', 'translateY(30%)');
        },
        function () {
            $(lowerArrow).css('transform', 'translateY(0%)');
        }
    )

    lowerArrow.hover(
        function () {
            $(this).css('transform', 'translateY(30%)');
        }, function () {
            $(this).css('transform', 'translateY(0%)');
        }
    );

    registerLabel.click(function (e) {
        e.preventDefault();
        $('body').css('transform', 'translateY(-100vh)');
    });

    inputSchoolName.keyup(function (e) {
        if (e.keyCode == 13) {
            searchSchool();
        }
    });

    searchSchoolButton.click(function (e) {
        e.preventDefault();
        searchSchool();
    });

    changeSchoolButton.click(function (e) {
        e.preventDefault();
        $('body').css('transform', 'translateY(-100vh)');
        $('.start').css('display', 'none');
        getMeal(currentDate, $('.slide').eq(1).find('.meal-content'));
    });

    resultContainer.on('click', 'input:radio', function (e) {
        // e.preventDefault();
        $('input:radio').each(function () {
            $(this).prop('checked', false);
        });

        $(e.target).prop('checked', true);
    });

    startButton.click(function (e) {
        e.preventDefault();

        $('body').css('transform', 'translateY(0)');
        $('.logo').css('display', 'none');
        $('.start').css('display', 'none');

        main.css('display', 'inherit');
        localStorage.setItem('main', true);
        localStorage.setItem('code', $('.school-name').attr('id'));

        getMeal(currentDate, $('.slide').eq(1).find('.meal-content'));
        refreshDate();

        var formData = new FormData();
        formData.append('code', localStorage.getItem('code'));
        var requestUrl = "http://52.79.134.200:5959/school-search/" + localStorage.getItem('code');
        $.ajax({
            url: requestUrl,
            data: formData,
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Accept", "application/json");
            },
            contentType: "application/json;charset=utf-8",
            type: "POST",
        }).then(function (data, responseText, jqXHR) {
            console.log(data);
        });
    });

    var carousel = $('#carousel'),
        threshold = 70,
        slideWidth = 390,
        dragStart,
        dragEnd;

    $('#next').click(function () {
        shiftSlide(-1);
    });

    $('#prev').click(function () {
        shiftSlide(1);
    });

    carousel.on('mousedown', function () {
        if (carousel.hasClass('transition')) return;
        dragStart = event.pageX;
        $(this).on('mousemove', function () {
            dragEnd = event.pageX;
            $(this).css('transform', 'translateX(' + dragPos() + 'px)')
        })
        $(document).on('mouseup', function () {
            if (dragPos() > threshold) { return shiftSlide(1) }
            if (dragPos() < -threshold) { return shiftSlide(-1) }
            else shiftSlide(0);
        })
    });

    function dragPos() {
        return dragEnd - dragStart;
    }

    function shiftSlide(direction) {
        if (carousel.hasClass('transition')) return;
        dragEnd = dragStart;
        $(document).off('mouseup')
        carousel.off('mousemove')
            .addClass('transition')
            .css('transform', 'translateX(' + (direction * slideWidth) + 'px)');
        setTimeout(function () {
            var slides = $('.slide');
            if (direction === 1) {
                $.each(bufferDate, function (indexInArray, valueOfElement) {
                    valueOfElement.setDate(valueOfElement.getDate() - 1)
                });
                slides[0].before(slides[2]);
                var contents = $('.slide').eq(1).find('.meal-content');
                getMeal(bufferDate[1], contents);
                refreshDate();
            } else if (direction === -1) {
                $.each(bufferDate, function (indexInArray, valueOfElement) {
                    valueOfElement.setDate(valueOfElement.getDate() + 1)
                });
                slides[2].after(slides[0]);
                var contents = $('.slide').eq(1).find('.meal-content');
                getMeal(bufferDate[1], contents);
                refreshDate();
            }
            carousel.removeClass('transition')
            carousel.css('transform', 'translateX(0px)');

            // currentDate.setDate(currentDate.getDate() + direction);
            // getMeal(currentDate);
        }, 700)
    }
});

function getMeal(day, target) {
    var code = localStorage.getItem('code');
    var schoolType = schoolTypeToInt(schools.High);

    var tzoffset = day.getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(day - tzoffset)).toISOString().slice(0, 10);

    var year = localISOTime.substring(0, 4);
    var month = localISOTime.substring(5, 7);
    var _day = localISOTime.substring(8, 10);

    if (_day.substring(0, 1) == '0')
        _day = _day.substring(1, 2);


    var url = "http://" + regionToString(codeToRegion(code)) + "/" + "sts_sci_md00_001.do" +
        "?" + "schulCode=" + code + "&" + "schulCrseScCode=" + schoolType +
        "&" + "schulKndScCode=" + "0" + schoolType + "&" + "ay=" + year + "&" + "mm=" + month;

    var parsedDom = getSourceAsDOM(url);
    var tbody = parsedDom.getElementsByTagName('tbody');
    var trows = tbody[0].children;

    var matchMeal = [];
    $.each(trows, function (indexInArray, valueOfElement) {
        $.each(valueOfElement.children, function (_indexInArray, _valueOfElement) {
            var words = _valueOfElement.children[0].innerText.split('\n');
            if (words[0] == _day) {
                matchMeal = words;
            }
        });
    });

    var breakfast = [];
    var lunch = [];
    var dinner = [];

    matchMeal.forEach(element => {
        if (element == breakfastWord) {
            var breakfastIndex = matchMeal.indexOf(element);

            if (matchMeal.includes(lunchWord)) {
                var lunchindex = matchMeal.indexOf(lunchWord);
                for (var i = breakfastIndex + 1; i < lunchindex; i++)
                    breakfast.push(matchMeal[i]);
            } else if (matchMeal.includes(dinnerWord)) {
                var dinnerindex = matchMeal.indexOf(dinnerWord);
                for (var i = breakfastIndex + 1; i < dinnerindex; i++)
                    breakfast.push(matchMeal[i]);
            } else {
                breakfast = matchMeal;
                breakfast.shift();
                breakfast.shift();
            }
        }
        if (element == lunchWord) {
            var lunchindex = matchMeal.indexOf(element);
            if (matchMeal.includes(dinnerWord)) {
                var dinnerindex = matchMeal.indexOf(dinnerWord);
                for (var i = lunchindex + 1; i < dinnerindex; i++)
                    lunch.push(matchMeal[i]);
            } else {
                var lastindex = matchMeal.length - 1;
                for (var i = lunchindex + 1; i < lastindex; i++)
                    lunch.push(matchMeal[i]);
            }
        }
        if (element == dinnerWord) {
            var dinnerindex = matchMeal.indexOf(element);
            var lastindex = matchMeal.length - 1;
            for (var i = dinnerindex + 1; i < lastindex; i++)
                dinner.push(matchMeal[i]);
        }
    });

    target[0].innerText = breakfast.join(' ');
    target[1].innerText = lunch.join(' ');
    target[2].innerText = dinner.join(' ');
}

function refreshDate() {
    month = (currentDate.getMonth() + 1).toString();
    date = currentDate.getDate().toString();
    day = days[currentDate.getDay()];

    monthLabel.html(month);
    dateDayLabel.html(date + ' ' + day);
}

function searchSchool() {
    search.css('display', 'none');
    loaderWheel.css('display', 'inherit');

    $.get('../assets/codes.json', function (data) {
        var result = data.filter(function (element) {
            if (element.name !== undefined)
                return element.name.includes(inputSchoolName.val());
            else
                return false;
        });

        resultContainer.empty();

        var count = '<p class="describe-school-count"><span class="school-count">' + result.length + '</span>개의 학교를 찾았습니다</p>'
        resultContainer.prepend(count);

        var container = '<div class="school-list">';
        result.forEach(function (element) {
            var content = '<div class="school-item">'
                + '<input class="check medium" type="radio">'
                + '<div>'
                + '<p class="school-name" id="' + element.code + '">' + element.name + '</p>'
                + '<p class="region-name">' + element.region + '</p>'
                + '</div>'
                + '</div>';

            container += content;
            console.log(element);
        }, this);

        container += '</div>';

        resultContainer.append(container);
    }, "json");

    search.css('display', 'inherit');
    loaderWheel.css('display', 'none');
}

function codeToRegion(code) {
    var result = 0;
    var c = code[0];

    if (c == 'B')
        result = regions.Seoul;
    else if (c == 'C')
        result = regions.Busan;
    else if (c == 'D')
        result = regions.Daegu;
    else if (c == 'E')
        result = regions.Incheon;
    else if (c == 'F')
        result = regions.Gwangju;
    else if (c == 'G')
        result = regions.Daejeon;
    else if (c == 'H')
        result = regions.Ulsan;
    else if (c == 'I') { }
    else if (c == 'J')
        result = regions.Gyeonggi;
    else if (c == 'K')
        result = regions.Kangwon;
    else if (c == 'L') { }
    else if (c == 'M')
        result = regions.Chungbuk;
    else if (c == 'N')
        result = regions.Chungnam;
    else if (c == 'O') { }
    else if (c == 'P')
        result = regions.Jeonbuk;
    else if (c == 'Q')
        result = regions.Jeonnam;
    else if (c == 'R')
        result = regions.Gyeongbuk;
    else if (c == 'S')
        result = regions.Gyeongnam;
    else if (c == 'T')
        result = regions.Jeju;

    return result;
}

function regionToString(region) {
    var result = "";
    switch (region) {
        case regions.Seoul:
            result = "stu.sen.go.kr";
            break;
        case regions.Incheon:
            result = "stu.ice.go.kr";
            break;
        case regions.Busan:
            result = "stu.pen.go.kr";
            break;
        case regions.Gwangju:
            result = "stu.gen.go.kr";
            break;
        case regions.Daejeon:
            result = "stu.dje.go.kr";
            break;
        case regions.Daegu:
            result = "stu.dge.go.kr";
            break;
        case regions.Sejong:
            result = "stu.sje.go.kr";
            break;
        case regions.Ulsan:
            result = "stu.use.go.kr";
            break;
        case regions.Gyeonggi:
            result = "stu.goe.go.kr";
            break;
        case regions.Kangwon:
            result = "stu.kwe.go.kr";
            break;
        case regions.Chungbuk:
            result = "stu.cbe.go.kr";
            break;
        case regions.Chungnam:
            result = "stu.cne.go.kr";
            break;
        case regions.Gyeongbuk:
            result = "stu.gbe.go.kr";
            break;
        case regions.Gyeongnam:
            result = "stu.gne.go.kr";
            break;
        case regions.Jeonbuk:
            result = "stu.jbe.go.kr";
            break;
        case regions.Jeonnam:
            result = "jne.go.kr";
            break;
        case regions.Jeju:
            result = "stu.jje.go.kr";
            break;
        default:
            break;
    }

    return result;
}

function schoolTypeToInt(schoolType) {
    var result = "";
    switch (schoolType) {
        case schools.Kindergarden:
            result = "1";
            break;
        case schools.Elementary:
            result = "2";
            break;
        case schools.Middle:
            result = "3";
            break;
        case schools.High:
            result = "4";
            break;
    }

    return result;
}

function getSourceAsDOM(url) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    parser = new DOMParser();
    return parser.parseFromString(xmlhttp.responseText, "text/html");
}

