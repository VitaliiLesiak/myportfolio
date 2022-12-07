function codeTerminal() {
    consoleText(["Hello, I'm"], 'text');
    let i = 0, j = 0
    function consoleText(words, id, colors) {
        if (colors === undefined) colors = ['#fff'];
        var visible = true;
        var con = document.getElementById('console');
        var letterCount = 1;
        var x = 1;

        var waiting = false;
        var target = document.getElementById(id)
        target.setAttribute('style', 'color:' + colors[0])
        window.setInterval(function () {

            if (letterCount === 0 && waiting === false) {
                waiting = true;
                target.innerHTML = words[0].substring(0, letterCount)
                window.setTimeout(function () {
                    var usedColor = colors.shift();
                    colors.push(usedColor);
                    var usedWord = words.shift();
                    words.push(usedWord);
                    x = 1;
                    target.setAttribute('style', 'color:' + colors[0])
                    letterCount += x;
                    waiting = false;
                }, 1000)
            } else if (letterCount === words[0].length + 1 && waiting === false) {
                waiting = true;
            } else if (waiting === false) {
                target.innerHTML = words[0].substring(0, letterCount)
                letterCount += x;
                i++
                j++
                if (i == 9) {
                    consoleText([" Vitalii Lesiak. "], 'texts', ["#e31b6d"]);
                }
                if (i == 26) {
                    consoleText(["I'm a Front-end Developer."], 'textthrid');
                }
            }
        }, 120)
        window.setInterval(function () {
            if (visible === true) {
                con.className = 'console-underscore hidden'
                visible = false;

            } else {
                con.className = 'console-underscore'
                visible = true;
            }
        }, 800)
    }
}
codeTerminal()
$(() => {
    const arr = [
        { name: 'HTML', bgText: '#dd4b25', perc: '90' },
        { name: 'CSS', bgText: '#254bdd', perc: '90' },
        { name: 'SCSS/SASS', bgText: '#254bdd', perc: '70' },
        { name: 'JavaScript', bgText: '#ffe900', perc: '80' },
        { name: 'jQuery', bgText: '#0865a7', perc: '80' },
        { name: 'Git', bgText: '#bd002e', perc: '30' },
        { name: 'React JS', bgText: '#5ed3f3', perc: '35' },
        { name: 'Node.js', bgText: '#5ed3f3', perc: '15' },
        { name: 'Angular', bgText: '#bd002e', perc: '35' }
    ]
    function checkUrl() {
        $('.menuUrl').removeClass('active')
        if ($(window).scrollTop() < $(".intro").innerHeight()-1) {$('.menuUrl:eq(0)').addClass('active')}
        if ($(window).scrollTop() >= $(".intro").innerHeight()-1 && $(window).scrollTop() < $("#portfolio").offset().top - 50) {$('.menuUrl:eq(1)').addClass('active')}
        // ---
        if ($(window).scrollTop() >= $("#portfolio").offset().top-50 && $(window).scrollTop() < $("#contacts").offset().top) {$('.menuUrl:eq(2)').addClass('active')}
        // ---
        // if ($(window).scrollTop() >= $("#portfolio").offset().top-50 && $(window).scrollTop() < $("#blog").offset().top) {$('.menuUrl:eq(2)').addClass('active')}
        // if ($(window).scrollTop() >= $("#blog").offset().top && $(window).scrollTop() < $("#contacts").offset().top) {$('.menuUrl:eq(3)').addClass('active')}
        if ($(window).scrollTop() >= $("#contacts").offset().top) {$('.menuUrl:eq(3)').addClass('active')}
    }
    checkUrl()
    let bool = true
    $(window).on("scroll", function () {
        checkHeadFix()
        checkUrl()
    });
    checkHeadFix()
    function checkHeadFix() {
        if ($(window).scrollTop() >= $(".intro").innerHeight() - 1) {addClasss()} 
            else {removeClasss()}
    }
    function removeClasss() {
        $('header').removeClass('fixedHeader')
        bool = true
    }
    function addClasss() {
        if (bool) $('header').addClass('fixedHeader').hide().slideDown(500)
        bool = false
    }
    $('.header').children().hide().slideDown(500)
    $('.menuUrl').click(function () {
        $('.menuUrl').removeClass('active')
        $(this).addClass('active')
    })
    $('.blockAboutInfoText').hover(
        function () {
            $(this).find('div.iconBlckAbout').addClass('animate__animated animate__bounce').animate({borderRadius: '100%'})
        }, function () {
            $(this).find('div.iconBlckAbout').removeClass('animate__animated animate__bounce').animate({borderRadius: '20%'})
        }
    )
    checkRangeProg()
    function checkRangeProg() {
        for (let item of arr) {
            $('#rangeLearn').append(`<div class="blockRangeLearn ">
            <div class="programLearn">${item.name}</div>
            <div class="programLearnNum">0%</div>
            <div class="rangeBg"></div>
        </div>`)
        }
    }
    let i = 0
    function checkNum() {
        i++
        if (i > arr.length-1) {
            setTimeout(() => {
                for (let i = 0; i < arr.length; i++) {
                    let j = 0
                    setInterval(() => {
                        if (j <= arr[i].perc) {
                            $(`.rangeBg:eq(${i})`).css('width', j + '%')
                            $(`.programLearnNum:eq(${i})`).text(`${j}%`)
                        }
                        j++
                    }, 10);
                }
            }, 500);
        }
    }
    $('.blockRangeLearn').addClass('slide-upBlocks-learn')
    ScrollReveal().reveal('.slide-upBlocks-learn', {
        distance: '150%',
        interval: 200,
        beforeReveal: checkNum,
    });

    var $grid = $('.grid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows',
        getSortData: {
            name: '.name',
            symbol: '.symbol',
            number: '.number parseInt',
            category: '[data-category]',
            weight: function (itemElem) {
                var weight = $(itemElem).find('.weight').text();
                return parseFloat(weight.replace(/[\(\)]/g, ''));
            }
        }
    });

    var filterFns = {
        numberGreaterThan50: function () {
            var number = $(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },
        ium: function () {
            var name = $(this).find('.name').text();
            return name.match(/ium$/);
        }
    };

    $('#filters').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        filterValue = filterFns[filterValue] || filterValue;
        $grid.isotope({ filter: filterValue });
        
    });
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });
    ScrollReveal().reveal('.slide-upBlocks-left', {
        distance: '150%',
        origin: 'left',
        delay: 300,
        duration: 850,
        viewFactor: 0,
    });
    function sectionContacts() {
        $(".contactSection .section__title").addClass('animate__animated animate__bounceInDown animate__delay-1s')
        $(".contactSection .section__text").addClass('animate__animated animate__zoomInUp animate__delay-1s')
        $(".contactBg .formMess div:not(.bgSend)").addClass('animate__animated animate__flipInX animate__delay-1s')
        $(".classAnimated").addClass('animate__animated animate__fadeInRightBig animate__delay-1s')
    }
    // function blogInfo() {
    //     $('#blog .section__header').addClass('animate__animated animate__backInUp animate__delay-1s')
    //     $('#blog .blog').addClass('animate__animated animate__bounceIn animate__delay-1s')
    // }
    // 
    ScrollReveal().reveal('.slide-upBlocks-delay-1', { delay: 200 });
    ScrollReveal().reveal('.slide-upBlocks-delay-2', { delay: 400 });
    ScrollReveal().reveal('.slide-upBlocks-delay-3', { delay: 600 });
    ScrollReveal().reveal('.slide-upBlocks-delay-4', { delay: 800 });
    // ScrollReveal().reveal('#blog', { delay: 800, beforeReveal: blogInfo });
    ScrollReveal().reveal('.slide-upBlocks-opacity', {
        scale: 0.25, rotate: {
            x: 1000,
            y: 50,
            z: 50
        },
        viewFactor: 0,
        delay: 300,
    });
    ScrollReveal().reveal('.contactSection', {
        origin: 'top',
        delay: 600,
        beforeReveal: sectionContacts
    });

    ScrollReveal().reveal('.slide-upBlocks-grid', {
        delay: 400
    });
    // $.ajax({
    //     url: "./blogs.json",
    //     success: function(data) {
    //         let i = 0
    //         for(let item of data) {
    //             i++
    //             if(i < 4) {
    //                 $('#blogsInfo').append(`<div class="col-12 col-sm-6 col-lg-4 p-4">
    //                 <div class="blog">
    //                     <div class="blog__imgs"><img class="blog__img" src="${item.img}" alt=""></div>
    //                     <div class="position-relative infoAllBlog">
    //                         <div class="blog__title">${item.title}</div>
    //                         <div class="blog__date">${item.date}</div>
    //                         <div class="blog__text">${item.text}</div>
    //                         <div class="mt-3"><button class="viewDetailBlog">view details</button></div>
    //                     </div>
    //                 </div>
    //                 </div>`)
    //             }
    //         }
    //         $('.viewDetailBlog').click(function () {
    //             $('body').css('overflow-y', 'hidden')
    //             $(".modalMy__body").text('')
    //             $(".modalMy__body").append(`<div class="centerImg"><img src="${$(this).parents('.blog.animate__animated.animate__bounceIn.animate__delay-1s').find('.blog__img').attr('src')}" class="imgModalMy" alt=""></div><div class="textBody">${$(this).parents('.position-relative.infoAllBlog').find('.blog__text').text()}</div>`)
    //             $(".textHeaderModal").text($(this).parents('.position-relative.infoAllBlog').find('.blog__title').text())
    //             $(".modalMy__footer").text($(this).parents('.position-relative.infoAllBlog').find('.blog__date').text())
    //             $('#modalMy').addClass('active')
    //         })
    //         $('#cursorEnd').click(function () {
    //             $('body').css('overflow-y', 'auto')
    //             $('#modalMy').removeClass('active')
    //         })
    //     },
    //     fail: function() {
    //         console.log("error");
    //     }
    // })
    function checkNameMess() {
        let text = /^[a-zA-z][a-zA-z0-9_-]{3,20}$/
        let bool = text.test($('#nameMess').val())
        if (!bool) {
            $('#nameMess').css('border-bottom-color', 'firebrick')
            return false
        }
        if (bool) {
            $('#nameMess').css('border-bottom-color', 'forestgreen')
            return true
        }
    }
    function checkTextMess() {
        let text = /^[a-zA-z0-9_-]{3,}$/
        let bool = text.test($('#textMess').val())
        if (!bool) {
            $('#textMess').css('border-bottom-color', 'firebrick')
            return false
        }
        if (bool) {
            $('#textMess').css('border-bottom-color', 'forestgreen')
            return true
        }
    }
    
    $('.btnView').click(function () {
        $('.notfounded').addClass('active')
        $('.back').attr('href', $(this)[0].hash)
    })
    $('#nameMess').on('input', function () {checkNameMess()});
    $('#nameMess').click(function () {checkNameMess()});
    $('#textMess').on('input', function () {checkTextMess()});
    $('#textMess').click(function () {checkTextMess()});
    $('.back').click(function () {$('.notfounded').removeClass('active')})
    function checkEmailMess() {
        let text = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        let bool = text.test($('#emailMess').val())
        if (!bool) {
            $('#emailMess').css('border-bottom-color', 'firebrick')
            return false
        }
        if (bool) {
            $('#emailMess').css('border-bottom-color', 'forestgreen')
            return true
        }
    }
    $('#emailMess').on('input', function () {checkEmailMess()});
    $('#emailMess').click(function () {checkEmailMess()});
    $('#sendMessage').click(function () {
        if (checkEmailMess() && checkNameMess() && checkTextMess()) {
            $('#emailMess').val('')
            $('#nameMess').val('')
            $('#textMess').val('')
            $('.formMess input, .formMess textarea').removeAttr('style')
            alertifyMy('success', 'good')
        } else alertifyMy('fail', 'err')
    })
    $("body").click(function (e) {
        let target = $(e.target);
        if (!target.is(".formMess input, .formMess textarea, .sendMessage > *")) $('.formMess input, .formMess textarea').removeAttr('style')
        
    });
    let intID
    let intIDTwo
    function alertifyMy(text, color) {
        clearTimeout(intID)
        clearTimeout(intIDTwo)
        $('#alertify').remove()
        $('body').append('<div id="alertify"></div>')
        $('#alertify').removeClass('animate__animated animate__backOutRight')
        $('#alertify').addClass('animate__animated animate__flipInY')
        if (color === 'err' || color === 'error' || color === 'fail') color = 'rgba(217, 92, 92, 0.95)'
        if (color === 'success' || color === 'good' || color === undefined) color = 'rgba(91, 189, 114, 0.95)'
        if (text === undefined) text = 'Hello'
        $('#alertify').text(text).css({
            display: 'flex',
            backgroundColor: color
        })
        intID = setInterval(() => {
            $('#alertify').removeClass('animate__animated animate__flipInY')
            $('#alertify').addClass('animate__animated animate__backOutRight')
        }, 2000);
        intIDTwo = setInterval(() => {
            $('#alertify').text('').css({
                display: 'none',
                backgroundColor: '#fff'
            })
        }, 3000);
    }
    $('#menuBar').click(function () {
        $('.ulMenu').toggleClass('active')
    })
    $("#blackbackground").click(function() {
        $('body').css('overflow-y', 'auto')
        $('#modalMy').removeClass('active')
    })
})
let map;
let coords = { lat: 49.9357428, lng: 23.5643865 }
map = new google.maps.Map(document.getElementById("mapGoogle"), {
    center: coords,
    zoom: 7,
});
const marker = new google.maps.Marker({
    position: coords,
    map: map,
    icon: "../images/location.png"
});
