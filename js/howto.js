function init(){
    var url = new URL(location.href);
    var name = url.searchParams.get("id");
    loadConfig(name);
}

function loadConfig(name){
    $.ajax({
        url: "how-tos/"+name.toLowerCase()+".json",
        success: function(result){
            console.log(result);
            createHowTo(result);
        }
    }); 
}

function createHowTo(result){
    var html = '<iframe id="howtoiframe" width="100%" src="'+result.link+'" frameBorder="0"></iframe>';
    console.log(html);
    $('#howto').html(html);
    $('#title').html(result.title);
    $('#description').html(result.description);
    $('#date').html(result.date);
    $('#author').html(result.author);    
    resizeIframe();
    $('.sp-circle').remove();
}

function resizeIframe() {
    $('#howtoiframe').height($(window).height());
}

init();