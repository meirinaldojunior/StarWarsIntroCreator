function toggleLoading(){isLoading?($("#loader").hide(),$("#form-starwars").show()):($("#loader").show(),$("#form-starwars").hide()),isLoading=!isLoading}function validateEmail(t){var e=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return e.test(t)}StarWarsOpening=function(){function t(t){this.el=$(t.el),this.audio=this.el.find("audio").get(0),this.audioDefer=$.Deferred();var e=this;this.audio.oncanplaythrough=function(){e.audioDefer.resolve()},this.start=this.el.find(".start"),this.animation=this.el.find(".animation"),this.reset(),$(this.audio).bind("ended",$.proxy(function(){this.audio.currentTime=0,this.reset();var t=this.opening;$("#f-intro").val(t.intro),$("#f-logo").val(t.logo||"Star\nwars"),$("#f-episode").val(t.episode),$("#f-title").val(t.title),$("#f-text").val(t.text),setTimeout(function(){$("body").removeClass("running")},1e4)},this))}return t.prototype.reset=function(){this.start.show(),$(".pageHide").show(),this.cloned=this.animation.clone(!0),this.animation.remove(),this.animation=this.cloned,$(window).trigger("resize")},t.prototype.resetAudio=function(){this.audio.pause(),this.audio.currentTime=0},t.prototype.play=function(){this.start.hide(),$(".pageHide").hide(),$("#loader").hide(),$("body").removeClass("running"),$("body").addClass("running"),$("body").scrollTop(0),this.audio.play(),this.el.append(this.animation);var t=$(".titles > div",this.animation)[0];if(t.offsetHeight>1977){for(var e,a=t.offsetHeight-1977,o=.04041570438799076,i=20-a*o,n=document.styleSheets,s=0;s<n.length;++s)for(var r=0;r<n[s].cssRules.length;++r){var l=n[s].cssRules[r];"titles"==l.name&&l.type==CSSRule.KEYFRAMES_RULE&&(e=l)}e&&e.appendRule("100% { top: "+i+"% }")}},t}();var StarWars=new StarWarsOpening({el:".starwars"});swal.setDefaults({customClass:"star-wars-alert"});var OpeningKey=null,audio=document.getElementsByTagName("audio")[0],audioIsLoaded=!1,loadData=function(){audioIsLoaded||(audio.load(),audioIsLoaded=!0)};document.body.addEventListener("touchstart",loadData),window.addEventListener("keydown",function(t){var e=document.activeElement.type||"";e.startsWith("text")||[32,37,38,39,40].indexOf(t.keyCode)>-1&&t.preventDefault()},!1);var notPlayed=!0,isLoading=!1,showFooter=!0;toggleLoading(),$("#form-starwars").submit(function(t){t.preventDefault();var e={intro:$("#f-intro").val(),logo:$("#f-logo").val(),episode:$("#f-episode").val(),title:$("#f-title").val(),text:$("#f-text").val()},a=e.logo.split("\n");return a.length>2?void sweetAlert("Oops...","Logo can't have more than 2 lines.","warning"):void $.ajax({url:"https://starwarsopening.firebaseio.com/openings.json",method:"POST",data:JSON.stringify(e),dataType:"json",success:function(t){toggleLoading(),location.hash="!/"+t.name.substring(1)}})}),$(window).on("hashchange",function(){$("#playBut").remove();var t=location.hash.replace("#!/","").split("/")[0];if($("body").removeClass("running"),""!=t)try{var e="https://starwarsopening.firebaseio.com/openings/-"+t+".json";$.ajax({url:e,success:function(e){if(null==e)return void sweetAlert("Oops...","Introduction not found!","error");StarWars.opening=e,OpeningKey=t,$("#videoButton").show();var a=e.intro.replace(/</g,"&lt;");a=a.replace(/>/g,"&gt;"),a=a.replace(/\n/g,"<br>"),StarWars.animation.find("#intro").html(a),StarWars.animation.find("#episode").text(e.episode),StarWars.animation.find("#title").text(e.title);var o=e.text.split("\n"),i=StarWars.animation.find("#text");i.text("");for(var n in o)i.append($("<p>").text(o[n]));$("#logosvg",StarWars.animation).css("width",$(window).width()+"px"),$("#logoimg",StarWars.animation).css("width",$(window).width()+"px");var s=e.logo?e.logo:"star\nwars",r=s.split("\n"),l=r[0],d=r[1]||"";if("star\nwars"!=s.toLowerCase()){var u=$("#logosvg text",StarWars.animation);u[0].textContent=l,u[1].textContent=d;var h=l.length>d.length?l:d,c="0 0 "+200*h.length+" 500";$("#logosvg",StarWars.animation).each(function(){$(this)[0].setAttribute("viewBox",c)}),$("#logosvg",StarWars.animation).show(),$("#logoimg",StarWars.animation).hide()}else $("#logosvg",StarWars.animation).hide(),$("#logoimg",StarWars.animation).show();var p=function(){$.when(StarWars.audioDefer).then(function(){var t=StarWars.audio.buffered.end(StarWars.audio.buffered.length-1);0!=t||audioIsLoaded?(toggleLoading(),notPlayed=!1,StarWars.play()):($("#loader").hide(),playbutton=$('<div class="verticalWrapper"><div class="playAudio"><button id="playBut" class="playButton" style="font-size: 80px">Play</button></div></div>'),$("body").append(playbutton),$("#playBut",playbutton).click(function(){$("#loader").show(),playbutton.remove()}),StarWars.audio.oncanplaythrough=function(){toggleLoading(),notPlayed=!1,StarWars.play()})})};document.hasFocus()?p():$(window).focus(function(){notPlayed&&p()})}})}catch(a){location.hash="",toggleLoading()}else notPlayed?toggleLoading():(StarWars.reset(),StarWars.resetAudio());ga("send","pageview",{page:location.pathname+location.search+location.hash})}),$(document).ready(function(){window.dispatchEvent(new Event("hashchange"))});var calcTime=function(t){var e=50*(t+1),a=Math.floor(e/60),o=Math.floor(a/24),i="";return o>0&&(i+=o+" days"),a%=24,e%=60,a>0&&(i+=" "+a+" hours"),e>0&&(i+=" "+e+" minutes"),i},requestVideo=function(t,e){if(e===!1)return!1;if(!validateEmail(e))return swal.showInputError("You need to type an e-mail!"),!1;var a="https://coruscant.nihey.org/request?code="+OpeningKey+"&email="+e;$.ajax({url:a,type:"GET",crossDomain:!0,success:function(a){var o=a.queue;swal({html:!0,title:'<h2 style="font-family: StarWars;">video request sent</h2>',text:'<p style="text-align: justify">Your video has been queued. Your current position on the queue is <b>'+(o+1)+"</b>, which will take up to <b>"+calcTime(o)+'</b>.<br>The link to download the video will be sent to the e-mail:<br></p><span style="text-align: center; font-weight: bold">'+e+"</span>"+(t?'<p style="margin-top: 15px">But as you donated, we will bump you up on the queue as soon as we confirm your donation.</p>':"")})}})};$("#videoButton").click(function(){$.ajax({url:"https://coruscant.nihey.org/status?code="+OpeningKey,crossDomain:!0,success:function(t){var e=t.queue;t.url?swal({html:!0,title:'<h2 style="font-family: StarWars;">Download</h2>',text:'<p style="text-align: justify">This video has already been generated, click the link below to download.<br><br><a style="color: #ffd54e;" href="'+t.url+'">'+t.url+"</a></p>"}):swal({html:!0,title:'<h2 style="font-family: StarWars;">Donate and Download</h2>',text:'<p style="text-align: justify">The download functionality is experimental. It takes a server to process the video, which costs money.<br>There are <b>'+(e+1)+" videos</b> in the processing queue, it will take <b>"+calcTime(e)+'</b> to be processed.<br>Consider donating at least <b>5 dollars</b> and we will provide your video as soon as possible.</p><iframe src="./atat.html" height="200px"></iframe>',showCancelButton:!0,confirmButtonText:"Yes, donate!",confirmButtonColor:"#807300",cancelButtonText:"No, I'll get in the queue!",closeOnConfirm:!1,closeOnCancel:!1,animation:"slide-from-top"},function(t){var e={html:!0,title:'<h2 style="font-family: StarWars;">Generate video</h2>',text:'<p style="text-align: justify">Type your email bellow and you will receive a message with the URL to download your video when it\'s ready</p>'+(t?['<p style="text-align: justify">',"  Please, use the same e-mail from you PayPal account.","  You'll be able to add as many e-mails as you want to","  <b>this video</b> without having to donate again. Just add","  your other e-mails after the first one, without donating","</p>"].join(""):""),type:"input",showCancelButton:!0,inputPlaceholder:"Your e-mail...",closeOnConfirm:!1,showLoaderOnConfirm:!0};t&&(e.title='<h2 style="font-family: StarWars;">Donate</h2>',e.text='Click on the button bellow:<br><iframe src="./donateButtons.html" height="100"></iframe>'+e.text),swal(e,requestVideo.bind(window,t))})}})});