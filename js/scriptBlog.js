$(() => {
    $.ajax({
        url: "./blogs.json",
        success: function(data) {
            for(let item of data) {
                $('#blogsInfo').append(`<div class="col-12 p-4">
                <div class="blog">
                    <div class="blog__imgs"><img class="blog__img" src="${item.img}" alt=""></div>
                    <div class="position-relative infoAllBlog">
                        <div class="blog__title">${item.title}</div>
                        <div class="blog__date">${item.date}</div>
                        <div class="blog__text">${item.text}</div>
                        <div class="mt-4"><button class="viewDetailBlog">view details</button></div>
                    </div>
                </div>
            </div><hr>`)
            }
            $('.viewDetailBlog').click(function () {
                $('body').css('overflow-y', 'hidden')
                $(".modalMy__body").text('')
                $(".modalMy__body").append(`<div class="centerImg"><img src="${$(this).parents(".blog").children(".blog__imgs").find('.blog__img').attr('src')}" class="imgModalMy" alt=""></div><div class="textBody">${$(this).parents('.position-relative.infoAllBlog').find('.blog__text').text()}</div>`)
                $(".textHeaderModal").text($(this).parents('.position-relative.infoAllBlog').find('.blog__title').text())
                $(".modalMy__footer").text($(this).parents('.position-relative.infoAllBlog').find('.blog__date').text())
                $('#modalMy').addClass('active')
            })
            $('#cursorEnd').click(function () {
                $('body').css('overflow-y', 'auto')
                $('#modalMy').removeClass('active')
            })
        },
        fail: function() {
            console.log("error");
        }
    })
    $("#blackbackground").click(function() {
        $('body').css('overflow-y', 'auto')
        $('#modalMy').removeClass('active')
    })
})