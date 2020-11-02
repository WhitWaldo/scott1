var DA;
var Vue;
var $;

async function getThumbNail(myPost: any) {
    var postURL = 'https://www.tiktok.com/oembed?url='+myPost;
    var result = await $.ajax({
        url: postURL
    });
    return result.thumbnail_url;
}

async function doWork() {
  var res = DA.query.getQueryResult()["rows"]; var postData = [];
  //console.log(JSON.stringify(res,null,4))
  for( var i=0; i < res.length; i++){
    var newPost = {}
    newPost["imgLink"] = await getThumbNail(res[i][6]["value"]);
    //console.log(res[i][6]["value"]);
    newPost["caption"] = res[i][3]["value"];
    newPost["title"] =  res[i][4]["value"];
    newPost["date"] =  res[i][5]["value"];
    newPost["clickThru"] = "DA.navigation.open({ url: '"+res[i][6]["value"]+"', target: '_blank' })";
    newPost["platform"] =  res[i][7]["value"];
    if (res[i][7]["value"] == "insta"){
      newPost["icon"] = "fab fa-instagram";
    }else if(res[i][7]["value"] == "fb"){
      newPost["icon"] = "fab fa-facebook"; 
    } else if(res[i][7]["value"] == "tiktok"){
      newPost["icon"] = "fab fa-tiktok"; 
    }
    newPost["metA"] = res[i][8]["formattedValue"];
    newPost["metB"] = res[i][9]["formattedValue"];
    newPost["metC"] = res[i][10]["formattedValue"];
    newPost["metD"] = res[i][11]["formattedValue"];
    newPost["metE"] = res[i][12]["formattedValue"];
    newPost["metF"] = res[i][13]["formattedValue"];
    
    postData.push(newPost);
    console.log(JSON.stringify(newPost,null,4));
  };
  document.getElementById("container").innerHTML = `
  <div class="post-card" v-for="post in postData" v-bind:onclick="post.clickThru">
    <div class="post-caption">{{post.caption}}</div>
    <img class="creativeFrame" v-bind:src="post.imgLink">
    <div class="lower">
      <div v-bind:class="post.platform"><i v-bind:class="post.icon"></i></div>
      <div>
      <table><tr>
      <div class="post-title">{{post.title}}</div><div class = "post-date">{{post.date}}</div>
      </tr>
      </div>
      <table>
        <tbody><tr>
          <td><span>{{post.metA}}</span> Gross Imp</td>
          <td><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{post.metB}}</span> Likes</td>
        </tr>
        <tr>
          <td><span>{{post.metC}}</span> Comments</td>
          <td><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{post.metD}}</span> Shares</td>
        </tr>
        <tr>
          <td><span>{{post.metE}}</span> Saves</td>
          <td><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{post.metF}}</span> ER</td>
        </tr>
      </tbody></table>
    </div>
  </div>`;
  var display = new Vue({ el: "#container",  data: { postData: postData } });
  document.getElementById("container").style.opacity="1"
}