console.log('errorrrrrrr')
let firebaseConfig = {
    apiKey: "AIzaSyAXCO3dKbTacx3mu8rAxSuVc6am60Rx9js",
    authDomain: "contact-aa5f0.firebaseapp.com",
    projectId: "contact-aa5f0",
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//console.log('firebase')
let datab = firebase.firestore();
//console.log(datab)


$('#submit').click(function(event){
    event.preventDefault();
    console.log('i in submit ')
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
   // let gender = document.getElementsByClassName("gender").checked;
    let email = document.getElementById('email').value;
    let texts = document.getElementById('messege').value;
    let gender = $("input[name='radio']:checked").val();
  //  console.log(gender + ' ' + fname + ' ' + lname + ' ' + email + ' ' + texts )

    if(fname == ''){
        alert('Please input your first name')
        document.querySelector('#fname').focus();
    }else if(lname == ''){
        alert('Please input your last name')
        document.querySelector('#lname').focus();
    }else if(gender == null){
        alert('Please check your gender')
  //      document.querySelector("#gender").focus();
    }else if(email == ''){
        alert('Please input your email')
        document.querySelector('#email').focus();
    }else if(!validateEmail(email)){
         alert('somewhere your email mistake');
    }else if(texts == ''){
        alert('Please input your detail. If you want to tell anything, you can put "-" in messege.')
        document.querySelector('#messege').focus();
    
    }else{

        // ------- firebase collection data
        datab.collection("contactPerson").add({
            fname:$('#fname').val(),
            lname:$('#lname').val(),
            gender:Number($("[name='radio']:checked").val()),
            email:$('#email').val(),
            texts:$('#messege').val(),
        })
        .then(function(docRef){
            console.log("Document written with ID: ",docRef.id);
            $('#fname').val()
            $('#lname').val()
            $("[name='radio']:checked").val()
            $('#email').val();
            $('#messege').val();
        })
        .catch(function(error){
            console.log("Error adding document: ", error);
        });
        document.myform.firstname.value = '';
        document.myform.lastname.value = '';
        $("input[name='radio']").prop("checked",false);
        document.myform.email.value = '';
        document.myform.messege.value = '';
       
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

})

$('#reset').click(()=> {
    console.log('reset')
    $('#fname').val('');
    $('#lname').val('');
    $("input[name='radio']").prop("checked",false);
    $('#email').val('');
    $('#message').val('');
})

var i = 0;

datab.collection('contactPerson').orderBy('fname').onSnapshot(doc =>{
    let table = $('tbody')[0]
    var male = 0;
    var female = 0;
    var other = 0;
    
    $('tbody').css("text-align", "center"); 
    $('tbody').css("border-bottom", "1px"); 
    $('tbody').css("border-color","#31312E")
    doc.forEach(item =>{
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secondCell = row.insertCell(1)
        let thirdCell = row.insertCell(2)
        let forthCell = row.insertCell(3)
        let fifthCell = row.insertCell(4)
        let id = item.id;
        
        secondCell.textContent = item.data().lname
        let mail = item.data().email
        let letter =''
        for(let i=0; i<mail.length; i++){
            if(i==0){
                letter += mail.charAt(i);
                forthCell.textContent +=mail.charAt(i)
            }else if(mail.charAt(i)=='@'){
                letter += '@';
                forthCell.textContent +='@'
            }else if(mail.charAt(i)=='.'){
                letter += '.';
                forthCell.textContent +='.'
            }else{
                letter += 'x';
                forthCell.textContent +='x'
            }
        }
       
        thirdCell.textContent = checkGender()
        fifthCell.textContent = item.data().texts
        function checkGender(){
            let str ='';
            switch(item.data().gender){
                case 1:
                    str = 'Male'
                    male++;
                    break;
                case 2:
                    str = 'Female'
                    female++;
                    break;
                case 3:
                    str = 'Other'
                    other++;
                    break;
                default:
                                
            }
                            
            return str;
        }
        let hname =item.data().lname+item.data().fname;
        let name = item.data().fname+item.data().lname;
        row.id = (hname);

        firstCell.innerHTML = '<button type="button" class = "btn btn-info btn-lg" style = "background-color: transparent; border: 0px; font-size: 14px; color:#31312E;" data-toggle="modal" data-target="#'+name+'">' +item.data().fname+ '</button>'+
                            ' <div class="modal fade" id="'+name+'" role="dialog">'+
                                '<div class="modal-dialog">'+
                                    '<!-- Modal content-->'+
                                    '<div class="modal-content">'+
                                        '<div class="modal-header">'+
                                            '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                            '<h4 class="modal-title">'+item.data().fname+'</h4>'+
                                        '</div>'+
                                        '<div class="modal-body">'+
                                            '<p>Name: '+item.data().fname + ' ' + item.data().lname +'</p>'+
                                            '<p>Gender: '+checkGender() +'</p>'+
                                            '<p>Email: '+letter + '</p>'+
                                            '<p>Detail: '+item.data().texts + ' ' + item.data().lname +'</p>'+
                                        '</div>'+
                                        '<div class="modal-footer">'+
                                            '<button type="delete" name="'+name+'" value="delete" style="background-color:firebrick;color:white;"data-dismiss="modal">Delete</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div> '+
                            '</div>'
                        
        //console.log(firstCell.textContent + ' ' + secondCell.textContent + ' ' + thirdCell.textContent + ' ' + forthCell.textContent + ' ' + fifthCell.textContent)
        
        $('button[name = "'+name+'"]').click(() =>{
                datab.collection('contactPerson').doc(id).delete();
                 $('#'+hname).remove();
                 $('#'+name).remove();
                
        })

        
    })

    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart(){
        var data = google.visualization.arrayToDataTable([
            ['Task', 'People per Gender'],
            ['Male', male],
            ['Female', female],
            ['Other', other]
        ]);

        var options = {
            title: 'Gender',
            titleTextStyle: {color: '#31312E', fontSize: 18},
            colors:['#8AB9C2','#DEB79B','#3F313F'] ,
            backgroundColor: 'none',
            pieHole: 0.5,
            chartArea:{left:30,top:30,width:'100%',height:'100%'},
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
    }


})






