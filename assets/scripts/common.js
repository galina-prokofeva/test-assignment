if(document.getElementsByClassName('catalogue__item')){
    $('.catalogue__item-image').each(function(){
        $(this).children('a').css('background-image', 'url(' + $(this).find('img').attr('src') + ')' );
        $(this).find('img').css('opacity', '0' );
    });
}







