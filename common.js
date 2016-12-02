window.onLoad = function(){
    setStuffDropdown();
}

function readTextFile(file, filename)
{
    var rawFile = new XMLHttpRequest();
    var allText = null;
    rawFile.open('GET', file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }else{
                alert(filename+ ' 파일을 불러올 수 없습니다.')
            }
        }
    }
    rawFile.send(null);
    
    return allText;
}

function getStuffList(){
    var stuffStream = readTextFile('name.txt', '재료');
    var stuffList = stuffStream.split(',');
    
    return stuffList;
}

function setStuffDropdown(){

    for(var i=0; i<getStuffList().length; i++){
        var stuff = getStuffList()[i];
        var container = document.getElementById("stuff_group");
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "btn btn-secondary btn-sm");
        btn.setAttribute("onclick", "setSelectedStuff('"+stuff+"')");
        btn.innerHTML=stuff;

        container.appendChild(btn)
    }
}

function setSelectedStuff(stuff){
    startRecommend(stuff);
}