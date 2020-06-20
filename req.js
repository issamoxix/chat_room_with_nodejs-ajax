

// Send the request
function send(txt) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        
      }
    };
    xhttp.open("POST", "/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ch="+txt);
}
// response
function res(cFunction) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var k = document.getElementById('ll');
          var kk = k.innerHTML;
          
          // console.log(kk)
          var tty = this.responseText;
          var obj = JSON.parse(tty);
          if(kk==obj.length){
              // console.log('no new Messages');
          }else{
              var  totale  = obj.length-kk;
          for(var i = kk;i<obj.length;i++){
                var para = document.createElement("p");
                var node = document.createTextNode(obj[i]);
                para.appendChild(node);
                var element = document.getElementById("chat");
                var child = document.getElementById("m1");
                element.insertBefore(para,child);
                
          }

        }
          k.innerHTML=obj.length
      }
    };
    var objDiv = document.getElementById("chat");
    objDiv.scrollTop = objDiv.scrollHeight;
    xhttp.open("GET", "/chat", true);
    xhttp.send();
  }
document.getElementById('inpt').addEventListener('keypress',function(e){
    if(e.keyCode==13){
        console.log(this.value)
        send(this.value);
       this.value ="";
       
    }
})
var id;
function start(){
    id = setInterval(function(){res()},500)
}
start()
