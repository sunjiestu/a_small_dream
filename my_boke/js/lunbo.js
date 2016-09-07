var container=document.querySelector("#container");
var buttons=document.querySelector("#buttons").getElementsByTagName("span");
var prev=document.getElementById("prev");
var next=document.getElementById("next");
var list=document.querySelector("#list");
var index=1;
var flag=false;
//封装函数 点击按钮移动
function animate(offset) {
				flag=true;
				var newoffset=list.offsetLeft+offset;
				var time=300;  //位移总时间
				var interval=10;  //位移间隔时间
				var speed=offset/(time/interval);//每次位移量
				function go () {
					if((speed>0 && list.offsetLeft<newoffset) || (speed<0 && list.offsetLeft>newoffset)){
						list.style.left=list.offsetLeft+speed+"px";
						setTimeout(go,interval);
					   }
					else{
						flag=false;
						list.style.left=newoffset+'px';
						if(list.offsetLeft>-600){
							list.style.left=-3000+'px';
							}
						else if(list.offsetLeft<-3000){
								list.style.left=-600+'px';
							}
					}
				}
				go();	
			}
			//实现小圆点点击移动效果
			function showButton() {
				//先清除前一个
				for(var i=0;i<buttons.length;i++){
					if(buttons[i].className=="on"){
						buttons[i].className='';
						break;
					}
				}
				buttons[index-1].className="on";
			}	
			//实现点击小圆点移动图片
			for(var i=0;i<buttons.length;i++){
				buttons[i].onclick=function() {
					if(this.className=="on"){
						return;
					}
					var myindex=parseInt(this.getAttribute("index"));
					var offset=-600*(myindex-index);
					animate(offset);
					index=myindex;
					showButton();
				}
			}
				
			//自动轮播
			function play() {
				timer=setInterval(function () {
					next.onclick();
				},3000);
			}
			play();
			//鼠标移动到上面就清除定时器
			function stop () {
				clearInterval(timer);
			}
			
			//鼠标移动到上面就停止轮播
			container.onmouseover=stop;
			
			//鼠标移动开就开始执行轮播
			container.onmouseout=play;
				
			
			//向左点击
			prev.onclick=function(){
				
				//点击鼠标向左移动小圆点
				if(index==1){
					index=5;
				}else{
					index-=1;
				}
				showButton();
				if(flag==false){
					animate(600);
				}
			}
			//向右点击
			next.onclick=function(){
			    //点击鼠标向右移动小圆点
				if(index==5){
					index=1;
				}else{
					index+=1;
				}
				showButton();
				
				if(flag==false){
					animate(-600)
				}	
			}