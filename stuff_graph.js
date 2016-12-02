var fnum = 30;
var graph = new Array();
var path = new Array();
var result;

function prim(index, n) //Ω√¿€¡° ¿ßƒ°= index
{
    var i=0,vnear=0;
    var min,num=0;

    var nearest = new Array(fnum);
    var distance = new Array(fnum);


    for(var i=0;i<n;i++)//√≥¿Ω Ω√¿€Ω√ Ω√¿€¡°¿ª ±‚¡ÿ¿∏∑Œ √ ±‚»≠
    {
        nearest[i] = index;
        distance[i] = graph[index][i];
        if(i==index)
        {
            distance[i]=-1;
        }

    }



    while( num < n-1 ) {    //n-1∞≥ √§øˆ¡˙∂ß±Ó¡ˆ π›∫π

        min = 99;

        for(i=0;i<n;i++)
        {
            if(distance[i] >= 0 && distance[i] < min)//π›∫π¡§¡°¡¶ø‹&∞°¿Â¿€¿∫∞≈ √£±‚
            {
                min = distance[i];
                vnear = i;
            }
        }

        var e =
        {
            vertex: new Array(2),
            cost: null
        };
        
        e.vertex[0] = nearest[vnear];
        e.vertex[1] = vnear;
        e.cost = distance[vnear];
        path[num] = e; //πÊπÆ«—¡§¡° ∏Ò∑œø° vnearπ¯¬∞ ¡§¡° √ﬂ∞°

        distance[vnear] = -1;//πÊπÆ√≥∏Æ

        for(var i=0;i<n;i++)//distance∏¶ ªı∑ŒøÓ ¡§¡°ø° ¥Î«œø© ¿¸¿«∞™∫∏¥Ÿ ¿€¿∏∏È ∞™¿ª ≥÷æÓ¡‹
        {

            if(graph[i][vnear] < distance[i])
            {
                distance[i] = graph[i][vnear];
                nearest[i] = vnear;

            }
        }
        num++;
    }
}

function selectfood(selected, foodname)
{
    var i=0;
    result = new Array();
    result.push(selected);
    console.log("selected : " + selected);

    while(path[i].cost<=5 && i<=2){
        console.log(i+" " +foodname[path[i].vertex[1]]);
        result.push(foodname[path[i].vertex[1]]);
        i++;
    }
}

function main(stuff){

    var i=0, j,check=0;
    var index;//Ω√¿€¡°¿ßƒ
    var food = "";//¿ΩΩƒ ¿‘∑¬πﬁ¿Ω

    var foodStream = readTextFile("food.txt", "재료 목록");
    var nameStream = readTextFile("name.txt", "재료 이름");

    if(foodStream == null || nameStream == null){
        return;
    }

    var foodname = getStuffList();

    path = new Array(fnum-1); //(edge*)malloc(sizeof(edge)*(fnum-1));// «¡∏≤∞Ê∑Œ ±‚∑œøÎ ±∏¡∂√º «“¥Á
    graph= new Array(fnum);		//¿Ã¬˜ø¯πËø≠ µø¿˚«“¥Á «‡

    for(var i=0;i<fnum;i++)//ø≠
        graph[i]= new Array(fnum);

    var row = foodStream.split('\n');
    for (var i = 0; i < fnum; ++i){
        for (var j = 0; j < fnum; ++j)
        {
            var data = row[i].split(' ');
            graph[i][j] = data[j];//txt∆ƒ¿œ¿« ∞™¿ª 2¬˜ø¯ πËø≠∑Œ ¿˙¿Â
        }
    }




    //¿Á∑·¿‘∑¬
    //cout << "ø¯«œ¥¬ ¿Á∑·∞° π´æ˘¿Œ∞°ø‰?" << endl;
    //cin >> food;
    for (var i = 0;i < fnum;i++)
    {
        if (stuff == foodname[i])
        {
            index = i;
            break;
        }
        check++;

    }
    if (check == fnum)//≥√¿⁄æ∆∞Ìæ»ø° ¿ΩΩƒ¿Ã æ¯¥¬ ∞ÊøÏ
    {
        alert("선택된 재료가 없습니다");
        return 0;
    }

    prim(index,fnum);

    selectfood(stuff, foodname);

    return result;
}