$(document).ready(function(){   //when document get ready
    //event handler for li to navigate the ques
    $("#nav > li").click(function(){
        $("#options").empty();
        $("#nav > li").removeClass('active');
        $(this).addClass('active');
        if($(this).hasClass('active')){
            var n = $(this).find("a").attr('href').split('#');
            num1 = n.toString().substr(1);  
            question(num1);
        }
    });
    //event handler for nextt button
    $("#next").click(function(){
        if(quiz[num1-1].type != "text")
            answer[num1-1]=$( "input:checked" ).val();
        else{
            var temp = $("input:text").val().toLowerCase();
            answer[num1-1] = temp;
        }
        if(answer[num1-1]!=null){   
        $("#options").removeClass("redText");
        if(num1<quiz.length){ 
            $("#nav").empty();    
            $("#options").empty();      
            num1++;
            numbering();}
        else{
            result();
        }
    }
    else{
        $("#options").addClass("redText");
    }
    });
    //event handler for previous button
    $("#prev").click(function(){
        if(num1>1){
            $("#nav").empty();    
            $("#options").empty();  
            num1--;
            numbering();}
    });
    //event handler for review button
    $("#review").click(function () {
        reviewed[counter]=num1;
        counter++;
        next();
      })

      //event handler for submit button
    $("#submit").click(function(){
        result();
        })
        //function
    var result = function(){
        for(i = 0; i<quiz.length;i++){
            if(answer[i] == quiz[i].answer)
            points++;}
            $("#dialog").html("<h2>"+points+"</h2>");
            $( "#dialog" ).dialog( "open" );
    }
    //dialog box
    $( "#dialog" ).dialog({autoOpen: false,width: 400,buttons: [
        {text: "Ok",click: function() {$( this ).dialog( "close" );}},
        { text: "Restart",click: function() {$( this ).dialog( "close" );
        window.location.replace("index.html");}}
    ]}); 
    //fuctions
    var numbering = function(){
        for(i=0;i<quiz.length;i++)
            $("#nav").append("<li class=\" inline border margin padding\"><a href=\"#"+quiz[i].n+"\"class=\"whiteText\">"+quiz[i].n+"</a></li>");        
         question(num1);
    }
    var next = function(){
        if(quiz[num1-1].type != "text")
            answer[num1-1]=$( "input:checked" ).val();
        else{
            var temp = $("input:text").val().toLowerCase();
            answer[num1-1] = temp;
        }
        if(num1<quiz.length){ 
            $("#nav").empty();    
            $("#options").empty();      
            num1++;
            numbering();}
        else{
            result();
        }
    }
    var question = function(num){   
        $("#question").html("<br><h3 class=\"margin\"><u>Ques:</u>"+quiz[num1-1].ques+"</h3>");
        option(num);
    };
    var option = function(n){
        if(quiz[n-1].type != "text")
        for(j = 0; j < quiz[n-1].options.length;j++)
            $("#options").append((j+1) +".&nbsp;&nbsp;<input type=\""+  quiz[n-1].type+  "\" name=\"ques\" class=\"paddingSide\" value=\""+ quiz[n-1].options[j]+"\">"+"&nbsp; &nbsp;<h4 class=\"inline\">"+ quiz[n-1].options[j]+"</h4><br>" );
        else
        $("#options").append(".&nbsp;&nbsp;<input type=\""+  quiz[n-1].type+  "\" name=\"ques\" class=\"paddingSide\"><br>" );
    }
    var quiz = [      
        {type:"radio",n:1,ques:"What is an array?",options:["collection of row.","Collection of similar data elements.","Collection of charracters."],answer:"Collection of similar data elements."},
        {type:"radio",n:2,ques:"What is an linklist?",options:["collection of row.","Collection of similar data elements.","Collection of charracters."],answer:"Collection of similar data elements."},
        {type:"radio",n:3,ques:"My name is Tejinder.",options:["true","false"],answer:"true"},
        {type:"radio",n:4,ques:"I am your friend.",options:["true","false"],answer:"false"},
        {type:"text",n:5,ques:"________ is my hobby.",answer:"acting"},
        {type:"text",n:6,ques:"________ is my home country.",answer:"india"}
    ];
    var num1=1,points=0,answer=[],reviewed=[],counter = 0;
    numbering();
});