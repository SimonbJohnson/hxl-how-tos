function init(){
    var url = new URL(location.href);
    var name = url.searchParams.get("id");
    loadConfig(name);
}

function loadConfig(name){
    $.ajax({
        url: "how-tos/site_config.json",
        success: function(result){
            console.log(result);
            createFeatured(result);
            createListOfTutorials(result.latest);
        }
    }); 
}

function createFeatured(result){
    result.featured.forEach(function(feature){
        console.log(feature);
        $.ajax({
            url: "how-tos/"+feature+".json",
            success: function(result){
                var html = '<div class="col-md-4"><div class="card"><img class="thumbnail" src="images/thumbnails/'+result.thumbnail+'.jpg" /><h4><a href="howto.html?id='+feature+'">'+result.title+'</a></h4><p>'+result.description+'</p></div></div>'
                $('#featuredtuts').append(html);
            }
        });         
    });
    $('.sp-circle').remove();
}

function createListOfTutorials(data){
    data.forEach(function(tutorial){
        $.ajax({
            url: "how-tos/"+tutorial+".json",
            success: function(result){
                var tags = 'Tags:';
                result.tags.forEach(function(t){
                    tags+=' '+t.toLowerCase()+',';
                });
                var html = '<div class="cardwide row"><div class="col-md-4"><img class="thumbnail" src="images/thumbnails/'+result.thumbnail+'.jpg" /></div><div class="col-md-8"><h4><a href="howto.html?id='+tutorial+'">'+result.title+'</a></h4><p>'+result.description+'</p><p class="subtext">'+tags+'</p></div></div>'
                $('#alltuts').append(html);
            }
        });         
    });
    $('.sp-circle').remove();
}

init();