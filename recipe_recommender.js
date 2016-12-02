var recipeRawList = new Array();
var recipeCount = 0;
var matchingScore;
var recipeList = new Array();
var scoreArray, posArray;

var recipeStream = readTextFile('recipe.txt', '레시피');

//데이터 입력 : 레시피 준비
if(recipeStream != null){
    recipeRawList = recipeStream.split('\n');
    recipeCount = recipeRawList.length;
    matchingScore = new Array(recipeCount).fill(0);

    for(var i=0; i<recipeRawList.length; i++){
        var recipe={
            recipeName: null,
            stuffList: null
        }

        var stuff = recipeRawList[i].split(',');
        recipe.recipeName = stuff[0];
        recipe.stuffList = new Array();

        //마지막 데이터에 이상이 있어서 꼼수씀
        for(var j=1; j<stuff.length-1; j++)
            recipe.stuffList.push(stuff[j]);

        recipeList.push(recipe);
    }


}

//입력받은 음식재료로 점수부여 시작
function startRecommend(stuff){
    matchingScore = new Array(recipeCount).fill(0);
    var str = main(stuff);

    console.log(str[0]);
    for(var i=0; i<str.length; i++){
        score(stuff, str[i]);
    }

    printRecommendRecipe();
}

//레시피 점수부여 부분
function score(selectedStuff, foodName){
    for(var i=0; i<recipeCount; i++){
        var r = recipeList[i];

        for(j=0; j<r.stuffList.length; j++){
            if(r.stuffList[j] == selectedStuff) //내가 선택한 음식이 있나
                matchingScore[i] += 5;
            else if(r.stuffList[j] == foodName) //그래프에서 주는 음식이
                matchingScore[i] += 1;
        }
    }
}

//레시피 출력
function printRecommendRecipe(){

    scoreArray = new Array(3).fill(0);
    posArray = new Array(3).fill(0);

    for(var i=0; i<recipeCount; i++){
        if(matchingScore[i] > scoreArray[0]){
            scoreArray[2] = scoreArray[1];
            scoreArray[1] = scoreArray[0];
            scoreArray[0] = matchingScore[i];

            posArray[2] = posArray[1];
            posArray[1] = posArray[0];
            posArray[0] = i;
        }
    }

    console.log('score: ' + scoreArray);
    console.log('maxPos: ' + posArray);
    console.log('name: ' + recipeList[posArray]);

    document.getElementById("recommendation").style.visibility='visible';

    if(scoreArray[1] >= 5 || scoreArray[2] >= 5){
        document.getElementById('recommend_2').style.display='';
        if(posArray[1] == posArray[2])
            document.getElementById('recommend_3').style.display='none';
        else
            document.getElementById('recommend_3').style.display='';
    }else{
        document.getElementById('recommend_2').style.display='none';
        document.getElementById('recommend_3').style.display='none';
    }


    for(var i=0; i<3; i++){
        document.getElementById('recipe_name_'+(i+1)).innerHTML = recipeList[posArray[i]].recipeName;
        document.getElementById('recipe_search_'+(i+1))
            .setAttribute('onclick', 'window.open("https://search.naver.com/search.naver?query='+recipeList[posArray[i]].recipeName+'");');
        var ul = document.getElementById('stuff_list_'+(i+1));
        ul.innerHTML = '';

        for (var j = 0; j < recipeList[posArray[i]].stuffList.length; j++) {
            var li = document.createElement("li");
            li.setAttribute("class", "list-group-item");
            li.innerHTML = recipeList[posArray[i]].stuffList[j];
            ul.appendChild(li);
        }
    }

}

